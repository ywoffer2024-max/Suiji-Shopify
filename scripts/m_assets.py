#!/usr/bin/env python3
"""Generate AI placeholder imagery (gpt-image-2, brand VI style) and attach:
- hero image -> Shopify Files (for theme image_banner)
- set images -> product media for the 3 set products
Saves PNGs to assets-staging/ for reuse.
"""
import base64
import json
import os
import subprocess
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from shopify_admin import graphql

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STAGING = os.path.join(ROOT, "assets-staging")
os.makedirs(STAGING, exist_ok=True)
KEY = open(os.path.join(ROOT, ".image-api-key")).read().strip()

STYLE = (
    "Bright high-key luxury e-commerce jewelry photography. Pale warm-white travertine "
    "stone surface, soft even daylight with one gentle directional accent, shadows soft "
    "and pale gray (never black), airy luminous white negative space. Jewelry in LIGHT "
    "silver-gray matte brushed grade-5 titanium — bright metal, never dark. Photorealistic, "
    "museum-clean, premium online-store look. Strictly NO dark or moody tones, NO black "
    "metal, NO charcoal, NO gunmetal, NO heavy vignette, NO yellow gold, NO warm orange "
    "cast, NO glossy mirror finish, NO people, NO text or logos."
)

JOBS = [
    {
        "file": "suiji-hero-clasp.png",
        "size": "1536x1024",
        "quality": "medium",
        "prompt": (
            "Extreme macro photograph of a precision quick-release titanium clasp mechanism, "
            "a small sculptural charm module locking onto a minimal ring base, mechanical "
            "joint and hinge details visible, dramatic single side light raking across the "
            "brushed metal texture. " + STYLE
        ),
        "target": "hero",
    },
    {
        "file": "set-camellia.png",
        "size": "1024x1536",
        "quality": "medium",
        "prompt": (
            "Elegant flat-lay of a titanium jewelry set on travertine stone: four small "
            "sculptural camellia flower charms in four bloom stages (full bloom, half-open, "
            "closed bud, single petal), arranged in a precise grid beside two minimal earring "
            "bases, one slim pendant chain and one ring base. " + STYLE
        ),
        "target": "set-camellia",
    },
    {
        "file": "set-orbit.png",
        "size": "1024x1536",
        "quality": "medium",
        "prompt": (
            "Elegant flat-lay of a titanium jewelry set on travertine stone: four small "
            "geometric charms — a circle loop, a square block, a triangle, a slim bar — "
            "arranged in a precise grid beside two minimal earring bases, one slim pendant "
            "chain and one ring base, deep titanium gray finish. " + STYLE
        ),
        "target": "set-orbit",
    },
    {
        "file": "set-aurora.png",
        "size": "1024x1536",
        "quality": "medium",
        "prompt": (
            "Elegant flat-lay of a titanium jewelry set on travertine stone: four identical "
            "small geometric flower charms with anodized titanium finishes in iridescent "
            "blue, violet, teal and muted rose, arranged in a precise grid beside two minimal "
            "earring bases, one slim pendant chain and one ring base. Anodized color appears "
            "only on the four charms; everything else stays cool gray. " + STYLE
        ),
        "target": "set-aurora",
    },
]


def generate(job):
    path = os.path.join(STAGING, job["file"])
    if os.path.exists(path) and os.path.getsize(path) > 10000:
        print(f"  cached  {job['file']}")
        return path
    payload = {
        "model": "gpt-image-2",
        "prompt": job["prompt"],
        "size": job["size"],
        "quality": job["quality"],
        "output_format": "png",
        "n": 1,
    }
    cmd = [
        "curl", "-sS", "--http1.1", "--retry", "2", "--retry-delay", "3",
        "--max-time", "300",
        "https://api.openai.com/v1/images/generations",
        "-H", f"Authorization: Bearer {KEY}",
        "-H", "Content-Type: application/json",
        "-d", json.dumps(payload),
    ]
    out = subprocess.run(cmd, capture_output=True)
    if out.returncode != 0:
        raise SystemExit(f"curl failed ({out.returncode}): {out.stderr.decode()[:300]}")
    d = json.loads(out.stdout)
    if "data" not in d:
        raise SystemExit(f"image gen failed: {json.dumps(d)[:400]}")
    open(path, "wb").write(base64.b64decode(d["data"][0]["b64_json"]))
    print(f"  generated {job['file']} ({os.path.getsize(path)//1024} KB)")
    return path


def staged_upload(path, resource):
    name = os.path.basename(path)
    res = graphql(
        """mutation($input: [StagedUploadInput!]!) {
             stagedUploadsCreate(input: $input) {
               stagedTargets { url resourceUrl parameters { name value } }
               userErrors { field message }
             }
           }""",
        {"input": [{
            "resource": resource, "filename": name, "mimeType": "image/png",
            "httpMethod": "POST", "fileSize": str(os.path.getsize(path)),
        }]},
    )["stagedUploadsCreate"]
    if res["userErrors"]:
        raise SystemExit(f"staged upload {name}: {res['userErrors']}")
    t = res["stagedTargets"][0]
    cmd = ["curl", "-sS", "-X", "POST", t["url"], "--max-time", "120"]
    for p in t["parameters"]:
        cmd += ["-F", f"{p['name']}={p['value']}"]
    cmd += ["-F", f"file=@{path}"]
    subprocess.run(cmd, check=True, capture_output=True)
    return t["resourceUrl"]


def file_create(resource_url, name):
    res = graphql(
        """mutation($files: [FileCreateInput!]!) {
             fileCreate(files: $files) {
               files { id fileStatus }
               userErrors { field message }
             }
           }""",
        {"files": [{"originalSource": resource_url, "contentType": "IMAGE", "filename": name}]},
    )["fileCreate"]
    if res["userErrors"]:
        raise SystemExit(f"fileCreate {name}: {res['userErrors']}")
    fid = res["files"][0]["id"]
    for _ in range(30):
        node = graphql(
            'query($id: ID!) { node(id: $id) { ... on MediaImage { fileStatus image { url } } } }',
            {"id": fid},
        )["node"]
        if node["fileStatus"] == "READY" and node.get("image"):
            url = node["image"]["url"].split("?")[0]
            return fid, url.rsplit("/", 1)[-1]
        time.sleep(2)
    raise SystemExit(f"file {name} never became READY")


def product_attach(handle, resource_url, alt):
    nodes = graphql(
        'query($q:String!){ products(first:1, query:$q){ nodes { id mediaCount { count } } } }',
        {"q": f"handle:{handle}"},
    )["products"]["nodes"]
    if not nodes:
        raise SystemExit(f"product {handle} not found")
    if nodes[0]["mediaCount"]["count"] > 0:
        print(f"  ok      {handle} already has media")
        return
    res = graphql(
        """mutation($id: ID!, $media: [CreateMediaInput!]!) {
             productCreateMedia(productId: $id, media: $media) {
               media { id }
               mediaUserErrors { field message }
             }
           }""",
        {"id": nodes[0]["id"], "media": [{
            "mediaContentType": "IMAGE", "originalSource": resource_url, "alt": alt,
        }]},
    )["productCreateMedia"]
    if res["mediaUserErrors"]:
        raise SystemExit(f"media {handle}: {res['mediaUserErrors']}")
    print(f"  attached media -> {handle}")


print("== generating (gpt-image-2) ==")
paths = {j["target"]: (generate(j), j) for j in JOBS}

print("== uploading & attaching ==")
hero_path, _ = paths["hero"]
url = staged_upload(hero_path, "FILE")
_, hero_filename = file_create(url, os.path.basename(hero_path))
print(f"  hero in Files as: {hero_filename}")

for key in ["set-camellia", "set-orbit", "set-aurora"]:
    p, job = paths[key]
    rurl = staged_upload(p, "IMAGE")
    product_attach(key, rurl, "SUIJI set — brushed titanium, side-lit macro (AI placeholder)")

print(f"\nDone. Theme hero reference: shopify://shop_images/{hero_filename}")

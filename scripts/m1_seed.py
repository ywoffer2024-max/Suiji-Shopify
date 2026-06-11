#!/usr/bin/env python3
"""M1 seed: metaobject entries + products + collections + linking.

Idempotent where practical (lookups by handle before create).
Run after m1_metaobjects.py. Images are attached in a later pass.
"""
import json
from shopify_admin import graphql

VENDOR = "SUIJI"

# ---------------------------------------------------------------- data
SETS = {
    "camellia": {
        "title": "CAMELLIA Set",
        "name": "SET 01 — CAMELLIA",
        "name_fr": "SET 01 — CAMÉLIA",
        "price": "189.00",
        "story": "One camellia, four states of bloom. The organic entry to the SUIJI system.",
        "charms": [
            ("full-bloom", "Camellia — Full Bloom", "Camélia — Éclosion", "Titanium"),
            ("half-bloom", "Camellia — Half Bloom", "Camélia — Mi-éclos", "Titanium"),
            ("bud", "Camellia — Bud", "Camélia — Bouton", "Titanium"),
            ("petal", "Camellia — Petal", "Camélia — Pétale", "Titanium"),
        ],
        "material": "Grade 5 titanium, matte brushed",
    },
    "orbit": {
        "title": "ORBIT Set",
        "name": "SET 02 — ORBIT",
        "name_fr": "SET 02 — ORBIT",
        "price": "209.00",
        "story": "Loop, block, tri, bar. Pure structure — the attitude of the system.",
        "charms": [
            ("loop", "Orbit — Loop", "Orbit — Boucle", "Deep titanium"),
            ("block", "Orbit — Block", "Orbit — Bloc", "Deep titanium"),
            ("tri", "Orbit — Tri", "Orbit — Tri", "Deep titanium"),
            ("bar", "Orbit — Bar", "Orbit — Barre", "Deep titanium"),
        ],
        "material": "Grade 5 titanium, matte brushed",
    },
    "aurora": {
        "title": "AURORA Set",
        "name": "SET 03 — AURORA",
        "name_fr": "SET 03 — AURORA",
        "price": "249.00",
        "story": "One form, four anodized hues. The flagship of titanium craft.",
        "charms": [
            ("blue", "Aurora — Blue", "Aurora — Bleu", "Anodized blue"),
            ("violet", "Aurora — Violet", "Aurora — Violet", "Anodized violet"),
            ("teal", "Aurora — Teal", "Aurora — Sarcelle", "Anodized teal"),
            ("rose", "Aurora — Rose", "Aurora — Rose", "Anodized rose"),
        ],
        "material": "Grade 5 titanium, anodized",
    },
}

BASE_KINDS = [
    ("earring-1", "Earring Base I", "Base boucle d'oreille I", "earring", "45.00"),
    ("earring-2", "Earring Base II", "Base boucle d'oreille II", "earring", "45.00"),
    ("pendant", "Pendant Base", "Base pendentif", "necklace", "55.00"),
    ("ring", "Ring Base", "Base bague", "ring", "59.00"),
]

CATEGORY_COLLECTIONS = [
    ("sets", "Sets", "TYPE", "Set"),
    ("charms", "Charms", "TYPE", "Charm"),
    ("bases", "Bases", "TYPE", "Base"),
    ("earrings", "Earrings", "TYPE", "Earrings"),
    ("rings", "Rings", "TYPE", "Rings"),
    ("necklaces", "Necklaces", "TYPE", "Necklaces"),
    ("pendants", "Pendants", "TYPE", "Pendants"),
    ("brooches", "Brooches", "TYPE", "Brooches"),
    ("bracelets", "Bracelets", "TYPE", "Bracelets"),
    ("beads", "Beads", "TYPE", "Beads"),
    ("multi-rings", "Multi-rings", "TYPE", "Multi-rings"),
    ("interchangeable-collection", "Interchangeable Collection", "TAG", "interchangeable"),
    ("new-arrivals", "New Arrivals", "TAG", "new"),
    ("gift", "Gift", "TAG", "gift"),
]

# ---------------------------------------------------------------- helpers
M_UPSERT = """
mutation($h: MetaobjectHandleInput!, $m: MetaobjectUpsertInput!) {
  metaobjectUpsert(handle: $h, metaobject: $m) {
    metaobject { id handle }
    userErrors { field message code }
  }
}"""


def upsert(mtype, handle, fields):
    res = graphql(
        M_UPSERT,
        {
            "h": {"type": mtype, "handle": handle},
            "m": {"fields": [{"key": k, "value": v} for k, v in fields.items() if v is not None]},
        },
    )["metaobjectUpsert"]
    if res["userErrors"]:
        raise SystemExit(f"upsert {mtype}/{handle}: {res['userErrors']}")
    return res["metaobject"]["id"]


def find_product(handle):
    d = graphql(
        'query($q:String!){ products(first:1, query:$q){ nodes { id handle } } }',
        {"q": f"handle:{handle}"},
    )["products"]["nodes"]
    return d[0]["id"] if d and d[0]["handle"] == handle else None


M_PRODUCT_SET = """
mutation($input: ProductSetInput!) {
  productSet(input: $input) {
    product { id handle }
    userErrors { field message code }
  }
}"""


def ensure_product(handle, title, ptype, price, status, tags, description, sizes=None):
    pid = find_product(handle)
    if pid:
        print(f"  ok      product {handle}")
        return pid
    if sizes:
        options = [{"name": "Ring size", "position": 1, "values": [{"name": s} for s in sizes]}]
        variants = [
            {
                "optionValues": [{"optionName": "Ring size", "name": s}],
                "price": price,
                "sku": f"SUIJI-{handle.upper().replace('-', '')[:14]}-{s}",
            }
            for s in sizes
        ]
    else:
        options = [{"name": "Title", "position": 1, "values": [{"name": "Default Title"}]}]
        variants = [
            {
                "optionValues": [{"optionName": "Title", "name": "Default Title"}],
                "price": price,
                "sku": f"SUIJI-{handle.upper().replace('-', '')[:18]}",
            }
        ]
    res = graphql(
        M_PRODUCT_SET,
        {
            "input": {
                "title": title,
                "handle": handle,
                "vendor": VENDOR,
                "productType": ptype,
                "status": status,
                "tags": tags,
                "descriptionHtml": description,
                "productOptions": options,
                "variants": variants,
            }
        },
    )["productSet"]
    if res["userErrors"]:
        raise SystemExit(f"product {handle}: {res['userErrors']}")
    print(f"  created product {handle} ({status})")
    return res["product"]["id"]


def ensure_collection(handle, title, kind, condition):
    d = graphql(
        'query($q:String!){ collections(first:1, query:$q){ nodes { id handle } } }',
        {"q": f"handle:{handle}"},
    )["collections"]["nodes"]
    if d and d[0]["handle"] == handle:
        print(f"  ok      collection {handle}")
        return d[0]["id"]
    inp = {"title": title, "handle": handle}
    if kind == "TYPE":
        inp["ruleSet"] = {
            "appliedDisjunctively": False,
            "rules": [{"column": "TYPE", "relation": "EQUALS", "condition": condition}],
        }
    elif kind == "TAG":
        inp["ruleSet"] = {
            "appliedDisjunctively": False,
            "rules": [{"column": "TAG", "relation": "EQUALS", "condition": condition}],
        }
    res = graphql(
        """mutation($input: CollectionInput!) {
             collectionCreate(input: $input) {
               collection { id handle }
               userErrors { field message }
             }
           }""",
        {"input": inp},
    )["collectionCreate"]
    if res["userErrors"]:
        raise SystemExit(f"collection {handle}: {res['userErrors']}")
    print(f"  created collection {handle}")
    return res["collection"]["id"]


def publish(gid, publication_ids):
    res = graphql(
        """mutation($id: ID!, $input: [PublicationInput!]!) {
             publishablePublish(id: $id, input: $input) {
               userErrors { field message }
             }
           }""",
        {"id": gid, "input": [{"publicationId": p} for p in publication_ids]},
    )["publishablePublish"]
    if res["userErrors"]:
        print(f"  ⚠ publish {gid}: {res['userErrors']}")


# ---------------------------------------------------------------- run
print("== publications ==")
pubs = graphql("{ publications(first: 10) { nodes { id name } } }")["publications"]["nodes"]
online_store = [p["id"] for p in pubs if "online store" in p["name"].lower()]
print(f"  online store publication: {online_store or 'NOT FOUND — ' + str(pubs)}")

print("== products: 3 sets (ACTIVE) ==")
set_products = {}
for key, s in SETS.items():
    desc = (
        f"<p>{s['story']}</p>"
        "<p>In the set: 4 interchangeable charms, 2 earring bases, 1 pendant base, "
        "1 ring base — 24 ways to wear. Every charm locks onto any SUIJI base "
        "with the quick-release titanium clasp.</p>"
    )
    set_products[key] = ensure_product(
        f"set-{key}", s["title"], "Set", s["price"], "ACTIVE",
        ["interchangeable", "new", "gift", "set"], desc, sizes=["52", "54", "56"],
    )

print("== products: charm & base singles (DRAFT) ==")
charm_products, base_products = {}, {}
for key, s in SETS.items():
    for slug, name, _fr, _color in s["charms"]:
        h = f"charm-{key}-{slug}"
        charm_products[h] = ensure_product(
            h, f"{name} Charm", "Charm", "49.00", "DRAFT",
            ["interchangeable"], f"<p>{s['material']}. Locks onto any SUIJI base.</p>",
        )
    for slug, bname, _bfr, _form, bprice in BASE_KINDS:
        h = f"base-{key}-{slug}"
        base_products[h] = ensure_product(
            h, f"{s['title'].split(' ')[0].title()} {bname}", "Base", bprice, "DRAFT",
            ["interchangeable"], "<p>Grade 5 titanium base with quick-release clasp.</p>",
        )

print("== metaobjects: charms & bases (pass 1, no cross-links) ==")
charm_ids, base_ids = {}, {}
for key, s in SETS.items():
    for slug, name, fr, color in s["charms"]:
        h = f"{key}-{slug}"
        charm_ids[h] = upsert("charm", h, {
            "name": name, "name_fr": fr, "material": s["material"], "color": color,
            "product_ref": charm_products[f"charm-{key}-{slug}"],
        })
    for slug, bname, bfr, form, _p in BASE_KINDS:
        h = f"{key}-{slug}"
        base_ids[h] = upsert("base", h, {
            "name": f"{s['name'].split(' ')[-1]} {bname}", "name_fr": bfr, "form": form,
            "anchor_x": "0.5", "anchor_y": "0.42", "anchor_scale": "0.32",
            "product_ref": base_products[f"base-{key}-{slug}"],
        })
print(f"  charms: {len(charm_ids)}  bases: {len(base_ids)}")

print("== metaobjects: jewelry_set entries ==")
set_ids = {}
for key, s in SETS.items():
    set_ids[key] = upsert("jewelry_set", key, {
        "name": s["name"], "name_fr": s["name_fr"], "theme_story": s["story"],
        "charms": json.dumps([charm_ids[f"{key}-{c[0]}"] for c in s["charms"]]),
        "bases": json.dumps([base_ids[f"{key}-{b[0]}"] for b in BASE_KINDS]),
        "combo_count": "24",
        "product_ref": set_products[key],
    })
    print(f"  set {key}: {set_ids[key]}")

print("== compatibility matrix (universal: every charm ↔ every base) ==")
all_charms = json.dumps(list(charm_ids.values()))
all_bases = json.dumps(list(base_ids.values()))
for key, s in SETS.items():
    for slug, *_ in s["charms"]:
        upsert("charm", f"{key}-{slug}", {
            "compatible_bases": all_bases, "set_ref": set_ids[key],
        })
    for slug, *_ in BASE_KINDS:
        upsert("base", f"{key}-{slug}", {"compatible_charms": all_charms})
print("  linked 12×12")

print("== vote_item samples (draft) ==")
for h, n, d in [
    ("brooch-module", "Brooch Base Module", "A brooch base that accepts every existing charm."),
    ("pearl-charm", "Baroque Pearl Charm", "A baroque pearl charm for the system."),
]:
    upsert("vote_item", h, {"name": n, "description": d, "status": "draft"})
print("  2 candidates seeded")

print("== collections ==")
coll_ids = {}
for handle, title, kind, cond in CATEGORY_COLLECTIONS:
    coll_ids[handle] = ensure_collection(handle, title, kind, cond)
ensure_collection("best-sellers", "Best Sellers", "MANUAL", None)

print("== publishing to Online Store ==")
if online_store:
    for gid in list(set_products.values()):
        publish(gid, online_store)
    for gid in coll_ids.values():
        publish(gid, online_store)
    publish(ensure_collection("best-sellers", "Best Sellers", "MANUAL", None), online_store)
    print("  3 set products + collections published")

print("\nM1 seed complete.")

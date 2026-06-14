#!/usr/bin/env python3
"""Export all store CONTENT (pages, products, menus, metaobjects, discounts)
into readable files so a reviewer (or another AI) can see everything the
theme files alone don't contain. Writes into /tmp/suiji-review/content."""
import os, sys, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from shopify_admin import graphql

OUT = "/tmp/suiji-review/content"
for d in ["pages", "products", "navigation", "data"]:
    os.makedirs(f"{OUT}/{d}", exist_ok=True)

def fr_translations(gid):
    d = graphql('query($id: ID!) { translatableResource(resourceId: $id) { translations(locale: "fr") { key value } } }',
                {"id": gid})["translatableResource"]
    return {t["key"]: t["value"] for t in (d["translations"] if d else [])}

# ---------- pages ----------
pages = graphql('''{ pages(first: 50) { nodes { id title handle body isPublished templateSuffix } } }''')["pages"]["nodes"]
index = []
for p in pages:
    fr = fr_translations(p["id"])
    tmpl = f"page.{p['templateSuffix']}" if p["templateSuffix"] else "page (default)"
    header = f"<!-- PAGE: {p['title']} | url: /pages/{p['handle']} | template: {tmpl} | published: {p['isPublished']} -->\n"
    open(f"{OUT}/pages/{p['handle']}.html", "w").write(header + (p["body"] or ""))
    if fr.get("body_html") or fr.get("title"):
        fh = f"<!-- PAGE (FR): {fr.get('title', p['title'])} | url: /fr/pages/{p['handle']} -->\n"
        open(f"{OUT}/pages/{p['handle']}.fr.html", "w").write(fh + (fr.get("body_html") or "(no FR body)"))
    index.append(f"/pages/{p['handle']}  →  {p['title']}  [{tmpl}]{'  +FR' if fr.get('body_html') else ''}")
print(f"pages: {len(pages)}")

# ---------- products (sets, full) ----------
prods = graphql('''{ products(first: 50) { nodes {
    id title handle status productType descriptionHtml
    variants(first: 30) { nodes { title price sku } }
  } } }''')["products"]["nodes"]
for p in prods:
    if p["productType"] != "Set":
        continue
    fr = fr_translations(p["id"])
    lines = [f"# {p['title']}  ({p['status']})", f"handle: /products/{p['handle']}", "",
             "## Variants (Material × Ring size)"]
    for v in p["variants"]["nodes"]:
        lines.append(f"  - {v['title']}  €{v['price']}  [{v['sku']}]")
    lines += ["", "## Description (EN)", p["descriptionHtml"] or ""]
    if fr.get("body_html"):
        lines += ["", "## Description (FR)", fr["body_html"]]
    open(f"{OUT}/products/{p['handle']}.md", "w").write("\n".join(lines))
print(f"set products: {sum(1 for p in prods if p['productType']=='Set')} (full) / {len(prods)} total")

# ---------- navigation ----------
menus = graphql('''{ menus(first: 20) { nodes { handle title items { title url items { title url } } } } }''')["menus"]["nodes"]
nav = []
for m in menus:
    nav.append(f"\n### {m['title']}  (handle: {m['handle']})")
    for it in m["items"]:
        nav.append(f"  - {it['title']}  →  {it['url']}")
        for sub in it.get("items", []):
            nav.append(f"      - {sub['title']}  →  {sub['url']}")
open(f"{OUT}/navigation/menus.txt", "w").write("ALL NAVIGATION MENUS (the jumps/links — these live in the store DB, not the theme)\n" + "\n".join(nav))
print(f"menus: {len(menus)}")

# ---------- metaobjects ----------
data = {}
for t in ["charm", "base", "jewelry_set", "vote_item"]:
    nodes = graphql('query($t:String!){ metaobjects(type:$t, first:50){ nodes { handle fields { key value } } } }',
                    {"t": t})["metaobjects"]["nodes"]
    data[t] = [{"handle": n["handle"], **{f["key"]: f["value"] for f in n["fields"]}} for n in nodes]
open(f"{OUT}/data/metaobjects.json", "w").write(json.dumps(data, indent=2, ensure_ascii=False))
print("metaobjects:", {k: len(v) for k, v in data.items()})

# ---------- discounts ----------
disc = graphql('{ codeDiscountNodes(first: 20) { nodes { codeDiscount { __typename ... on DiscountCodeBasic { title codes(first:3){ nodes { code } } } } } } }')["codeDiscountNodes"]["nodes"]
dl = []
for n in disc:
    cd = n["codeDiscount"]
    if cd.get("title"):
        codes = ", ".join(c["code"] for c in cd.get("codes", {}).get("nodes", []))
        dl.append(f"{cd['title']}  [code: {codes}]")
open(f"{OUT}/discounts.txt", "w").write("DISCOUNTS\n" + "\n".join(dl))

# ---------- index ----------
open(f"{OUT}/_SITEMAP.txt", "w").write("ALL PAGES (content lives in store DB, exported here):\n  " + "\n  ".join(index))
print("done")

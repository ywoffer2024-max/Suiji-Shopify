#!/usr/bin/env python3
"""M1: create the four SUIJI metaobject definitions (PRD §7.1).

charm / base / jewelry_set / vote_item — merchant-editable in admin,
public-readable from the storefront (theme Liquid + game JSON).
Circular references are resolved in two passes:
  pass 1: charm, base, vote_item (no cross-refs), jewelry_set (refs charm+base)
  pass 2: add charm.set_ref + charm.compatible_bases, base.compatible_charms
Idempotent: existing definitions are detected and only missing fields added.
"""
import json
from shopify_admin import graphql

Q_BY_TYPE = """
query($type: String!) {
  metaobjectDefinitionByType(type: $type) {
    id type
    fieldDefinitions { key }
  }
}"""

M_CREATE = """
mutation($def: MetaobjectDefinitionCreateInput!) {
  metaobjectDefinitionCreate(definition: $def) {
    metaobjectDefinition { id type }
    userErrors { field message code }
  }
}"""

M_UPDATE = """
mutation($id: ID!, $def: MetaobjectDefinitionUpdateInput!) {
  metaobjectDefinitionUpdate(id: $id, definition: $def) {
    metaobjectDefinition { id type fieldDefinitions { key } }
    userErrors { field message code }
  }
}"""


def field(key, name, ftype, required=False, validations=None):
    f = {"key": key, "name": name, "type": ftype, "required": required}
    if validations:
        f["validations"] = validations
    return f


def ref_validation(def_id):
    return [{"name": "metaobject_definition_id", "value": def_id}]


def choices(opts):
    return [{"name": "choices", "value": json.dumps(opts)}]


def get_def(mtype):
    return graphql(Q_BY_TYPE, {"type": mtype})["metaobjectDefinitionByType"]


def ensure_definition(mtype, name, fields):
    """Create definition if missing; otherwise add any missing fields."""
    existing = get_def(mtype)
    if existing is None:
        res = graphql(
            M_CREATE,
            {
                "def": {
                    "type": mtype,
                    "name": name,
                    "displayNameKey": "name",
                    "access": {"storefront": "PUBLIC_READ"},
                    "fieldDefinitions": fields,
                }
            },
        )["metaobjectDefinitionCreate"]
        if res["userErrors"]:
            raise SystemExit(f"{mtype} create errors: {res['userErrors']}")
        print(f"created  {mtype:12s} {res['metaobjectDefinition']['id']}")
        return res["metaobjectDefinition"]["id"]
    have = {f["key"] for f in existing["fieldDefinitions"]}
    missing = [f for f in fields if f["key"] not in have]
    if missing:
        res = graphql(
            M_UPDATE,
            {"id": existing["id"], "def": {"fieldDefinitions": [{"create": f} for f in missing]}},
        )["metaobjectDefinitionUpdate"]
        if res["userErrors"]:
            raise SystemExit(f"{mtype} update errors: {res['userErrors']}")
        print(f"updated  {mtype:12s} +{[f['key'] for f in missing]}")
    else:
        print(f"ok       {mtype:12s} (all fields present)")
    return existing["id"]


# ---- pass 1: standalone cores ----
charm_id = ensure_definition(
    "charm",
    "Charm 花饰",
    [
        field("name", "Name", "single_line_text_field", required=True),
        field("name_fr", "Name (FR)", "single_line_text_field"),
        field("material", "Material", "single_line_text_field"),
        field("color", "Color", "single_line_text_field"),
        field("image_main", "Main image", "file_reference"),
        field("image_overlay_png", "Overlay PNG (game)", "file_reference"),
        field("product_ref", "Linked product", "product_reference"),
    ],
)

base_id = ensure_definition(
    "base",
    "Base 底座",
    [
        field("name", "Name", "single_line_text_field", required=True),
        field("name_fr", "Name (FR)", "single_line_text_field"),
        field(
            "form",
            "Form",
            "single_line_text_field",
            required=True,
            validations=choices(["ring", "necklace", "earring", "brooch"]),
        ),
        field("image_empty", "Empty-base image", "file_reference"),
        field("anchor_x", "Anchor X (0-1)", "number_decimal"),
        field("anchor_y", "Anchor Y (0-1)", "number_decimal"),
        field("anchor_scale", "Anchor scale", "number_decimal"),
        field("product_ref", "Linked product", "product_reference"),
    ],
)

vote_id = ensure_definition(
    "vote_item",
    "Vote item 测品候选",
    [
        field("name", "Name", "single_line_text_field", required=True),
        field("image", "Image", "file_reference"),
        field("description", "Description", "multi_line_text_field"),
        field(
            "status",
            "Status",
            "single_line_text_field",
            required=True,
            validations=choices(["draft", "open", "closed", "in_production"]),
        ),
        field("result_note", "Result note", "single_line_text_field"),
    ],
)

set_id = ensure_definition(
    "jewelry_set",
    "Jewelry set 套装",
    [
        field("name", "Name", "single_line_text_field", required=True),
        field("name_fr", "Name (FR)", "single_line_text_field"),
        field("theme_story", "Theme story", "multi_line_text_field"),
        field("charms", "Charms", "list.metaobject_reference", validations=ref_validation(charm_id)),
        field("bases", "Bases", "list.metaobject_reference", validations=ref_validation(base_id)),
        field("hero_image", "Hero image", "file_reference"),
        field("combo_count", "Combo count", "number_integer"),
        field("product_ref", "Linked product", "product_reference"),
    ],
)

# ---- pass 2: circular reference fields ----
ensure_definition(
    "charm",
    "Charm 花饰",
    [
        field("set_ref", "Belongs to set", "metaobject_reference", validations=ref_validation(set_id)),
        field(
            "compatible_bases",
            "Compatible bases",
            "list.metaobject_reference",
            validations=ref_validation(base_id),
        ),
    ],
)

ensure_definition(
    "base",
    "Base 底座",
    [
        field(
            "compatible_charms",
            "Compatible charms",
            "list.metaobject_reference",
            validations=ref_validation(charm_id),
        ),
    ],
)

print("\nAll definitions ready:")
for t in ["charm", "base", "jewelry_set", "vote_item"]:
    d = get_def(t)
    print(f"  {t:12s} {d['id']}  fields={[f['key'] for f in d['fieldDefinitions']]}")

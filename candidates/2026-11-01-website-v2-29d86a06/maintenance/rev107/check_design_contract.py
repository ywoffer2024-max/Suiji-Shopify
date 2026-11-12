"""Verify the reviewed SUIJI design token values and shared commerce wiring."""
from hashlib import sha256
import json
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[2]
THEME = ROOT / "theme"


def read(path):
    return (THEME / path).read_text(encoding="utf-8")


def json_with_header(path):
    return json.loads(re.sub(r"^\s*/\*.*?\*/", "", read(path), count=1, flags=re.S))


def check_contract():
    doc = (ROOT / "DESIGN.md").read_text(encoding="utf-8")
    blocks = re.findall(r"```json design-lock\n(.*?)\n```", doc, re.S)
    if len(blocks) != 1:
        return ["DESIGN.md must contain exactly one design lock"]

    lock = json.loads(blocks[0])
    errors = []
    expected_heading = f"v{lock['version']}"
    if expected_heading not in doc.splitlines()[0]:
        errors.append("DESIGN.md heading and lock version differ")

    for entry in (lock["stylesheet"], lock["shell"], *lock["fonts"], *lock["components"]):
        path = ROOT / entry["path"]
        if not path.is_file() or sha256(path.read_bytes()).hexdigest() != entry["sha256"]:
            errors.append(f"Reviewed bytes differ for {entry['path']}")

    css = read("assets/suiji-r107.css")
    for name, value in lock["root_tokens"].items():
        found = re.findall(rf"{re.escape(name)}\s*:\s*([^;}}]+)", css)
        if found != [value]:
            errors.append(f"{name} must be declared once at {value}. Found {found!r}")

    layout = read("layout/theme.liquid")
    for snippet in ("header", "footer"):
        if layout.count(f"render 'suiji-r107-{snippet}'") != 2:
            errors.append(f"Both storefront branches must use the shared {snippet}")

    header = read("snippets/suiji-r107-header.liquid")
    if header.count('id="cart-icon-bubble"') != 2:
        errors.append("Each language needs one native cart update target")
    if header.count("unless settings.suiji_enable_orders") != 2:
        errors.append("The preview announcement must follow the order setting in both locales")

    product = read("sections/main-product.liquid")
    required = (
        "render 'suiji-purchase-state'", "data-suiji-purchase-state",
        "data-suiji-purchase-control", "SuijiPurchaseStatus-", "aria-atomic=\"true\"",
        "show_badges: false", "suiji_primary_purchase: true",
    )
    for marker in required:
        if marker not in product:
            errors.append(f"Missing native product contract marker {marker}")
    calls = re.findall(r"render 'suiji-native-(?:pairing|product-panels)'", product)
    if calls != ["render 'suiji-native-pairing'", "render 'suiji-native-product-panels'"] * 2:
        errors.append("Pairing must precede native details on both product render paths")

    finish = read("snippets/suiji-finish-option.liquid")
    if 'type="radio"' not in finish or "value.selected" not in finish or "value.swatch" not in finish:
        errors.append("Finish controls must preserve native radio state and merchant swatches")
    if "class=\"disabled\"" in finish or "line-through" in finish:
        errors.append("Finish labels must remain readable in every state")

    settings = json_with_header("config/settings_schema.json")
    orders = [value for group in settings for value in group.get("settings", [])
              if value.get("id") == "suiji_enable_orders"]
    if len(orders) != 1 or orders[0].get("default") is not False:
        errors.append("The shared launch setting must default to the current preview mode")

    for rel in ("sections/main-cart-footer.liquid", "snippets/cart-drawer.liquid",
                "snippets/card-product.liquid", "snippets/buy-buttons.liquid"):
        if "settings.suiji_enable_orders" not in read(rel):
            errors.append(f"Native purchase affordances lack the preview guard in {rel}")

    for rel in ("en.default.json", "fr.json"):
        keys = json_with_header(f"locales/{rel}")["suiji_pdp"]
        for key in ("preview_status", "preview_price", "finish_option", "finish_unavailable",
                    "option_error", "pairing_title", "gallery_counter"):
            if not keys.get(key):
                errors.append(f"Missing {key} in {rel}")

    if lock.get("qa_widths") != [320, 360, 390, 768, 1024, 1280, 1440] or lock.get("locales") != ["en", "fr"]:
        errors.append("QA widths and locales no longer match the release matrix")
    return errors


if __name__ == "__main__":
    issues = check_contract()
    if issues:
        print("\n".join(issues), file=sys.stderr)
        raise SystemExit(1)
    print("SUIJI design contract passed")

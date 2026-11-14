"""Verify the SUIJI theme lock and, when supplied, the approved design preview."""
import argparse
from base64 import b64decode
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


def check_approved_preview(path, reference):
    if not path.is_file():
        return [f"Approved preview file not found: {path}"]
    data = path.read_bytes()
    if sha256(data).hexdigest() != reference["sha256"]:
        return [f"Approved preview bytes differ: {path}"]

    html = data.decode("utf-8")
    style = re.search(r"<style>(.*?)</style>", html, re.S)
    if not style:
        return ["Approved preview is missing its embedded stylesheet"]
    css = style[1]
    mark = reference["header_mark"]
    errors = []
    image = re.search(
        r'<a class="brand" href="#home" aria-label="SUIJI">\s*'
        r'<img src="data:image/png;base64,([A-Za-z0-9+/=]+)"',
        html,
    )
    if not image or sha256(b64decode(image[1])).hexdigest() != mark["sha256"]:
        errors.append("The preview header must use the approved transparent square mark")

    sizes = re.findall(r"\.brand img\s*\{\s*width:\s*(\d+)px;\s*height:\s*(\d+)px;", css)
    expected_sizes = [(str(mark[key]), str(mark[key])) for key in ("desktop_size_px", "mobile_size_px")]
    if sizes != expected_sizes:
        errors.append("The preview header mark dimensions differ from the design lock")
    gaps = re.findall(r"\.brand\s*\{[^{}]*?\bgap:\s*(\d+)px;", css)
    if gaps != [str(mark["gap_px"])]:
        errors.append("The preview header mark and wordmark gap differs from the design lock")

    ratios = re.findall(r"\.catalog-image\s*\{\s*aspect-ratio:\s*(\d+/\d+)\s*;", css)
    if ratios != [reference["catalogue_image_ratio"]]:
        errors.append("The preview catalogue image ratio differs from the design lock")
    return errors


def check_contract(approved_preview=None, workspace_copy=None):
    document = (ROOT / "DESIGN.md").read_bytes()
    doc = document.decode("utf-8")
    blocks = re.findall(r"```json design-lock\n(.*?)\n```", doc, re.S)
    if len(blocks) != 1:
        return ["DESIGN.md must contain exactly one design lock"]

    lock = json.loads(blocks[0])
    errors = []
    expected_heading = f"v{lock['version']}"
    if expected_heading not in doc.splitlines()[0]:
        errors.append("DESIGN.md heading and lock version differ")

    reference = lock["approved_preview"]
    reviewed_files = (
        lock["stylesheet"], lock["shell"], *lock["fonts"], *lock["components"],
        reference["header_mark"],
    )
    for entry in reviewed_files:
        path = ROOT / entry["path"]
        if not path.is_file() or sha256(path.read_bytes()).hexdigest() != entry["sha256"]:
            errors.append(f"Reviewed bytes differ for {entry['path']}")

    if approved_preview is not None:
        errors.extend(check_approved_preview(approved_preview, reference))
    if workspace_copy is not None and (
        not workspace_copy.is_file() or workspace_copy.read_bytes() != document
    ):
        errors.append(f"Workspace DESIGN.md differs from the repository copy: {workspace_copy}")

    css_path = ROOT / lock["stylesheet"]["path"]
    css = css_path.read_text(encoding="utf-8")
    for name, value in lock["root_tokens"].items():
        found = re.findall(rf"{re.escape(name)}\s*:\s*([^;}}]+)", css)
        if found != [value]:
            errors.append(f"{name} must be declared once at {value}. Found {found!r}")

    layout = read("layout/theme.liquid")
    if layout.count(f"'{css_path.name}' | asset_url | stylesheet_tag") != 1:
        errors.append("The storefront must load the reviewed shared stylesheet")
    for snippet in ("header", "footer"):
        if layout.count(f"render 'suiji-r107-{snippet}'") != 2:
            errors.append(f"Both storefront branches must use the shared {snippet}")

    header = read("snippets/suiji-r107-header.liquid")
    wordmark = read("snippets/suiji-r107-wordmark.liquid")
    mark_filename = Path(reference["header_mark"]["path"]).name
    if header.count("render 'suiji-r107-wordmark'") != 4 or f"'{mark_filename}' | asset_url" not in wordmark:
        errors.append("Both locales must use the approved square wordmark in the header and drawer")
    if header.count('id="cart-icon-bubble"') != 2:
        errors.append("Each language needs one native cart update target")
    if header.count("render 'suiji-free-shipping', placement: 'announcement'") != 1 or "r-preview-strip" in header:
        errors.append("The shared header announcement must show only the eligible delivery offer")

    home = read("snippets/suiji-r107-home.liquid")
    if home.count("render 'suiji-r107-home-hero'") != 2:
        errors.append("Both locales must use the shared homepage composition")

    collection = read("sections/main-collection-product-grid.liquid")
    if "media_aspect_ratio: 'portrait'" not in collection:
        errors.append("Native catalogue cards must use the portrait product frame")

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
    if "data-suiji-thumbnail-rail" not in read("snippets/product-media-gallery.liquid"):
        errors.append("The native product gallery must expose the responsive thumbnail rail")

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
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--approved-preview", type=Path, help="Path to the saved approved index.html")
    parser.add_argument("--workspace-copy", type=Path, help="Path to the synchronized workspace DESIGN.md")
    args = parser.parse_args()
    issues = check_contract(args.approved_preview, args.workspace_copy)
    if issues:
        print("\n".join(issues), file=sys.stderr)
        raise SystemExit(1)
    print("SUIJI design contract passed")

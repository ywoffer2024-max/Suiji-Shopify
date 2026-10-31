# SUIJI full-site candidate — 31 October 2026

This is a versioned implementation candidate, not a claim of publication. The existing live theme was separately preserved in the `codex/backup-live-before-v40-20261031-0338` branch.

The theme preserves the approved pure-white / ice-blue palette, Newsreader / Manrope, five navigation entries and six sets. About retains the restored earlier page and the original Chunyu Wen portrait. Home returns to an image-led editorial rhythm.

## Product architecture

`catalogue/products.json` is the editable source for 54 demonstration product presentations and 321 selectable configurations. It preserves the supplied component counts, connection modes and metalwork/stone facts. It is not a manufacturing approval or the total of production-ready SKUs.

Run `python3 maintenance/build_storefront.py --theme theme --check` to verify that templates, public translations, index and individual detail files still match the source. Omit `--check` to regenerate. The generator does not publish to Shopify or change prices, stock, visibility or backend identities. Maintain the existing native Product/Variant mappings when commercially ready.

Core details and ordinary product links are server-rendered. Selection controls load a slim index and the needed individual detail files. Failed requests preserve the readable content and can retry. The loader accepts the preceding full-catalogue schema during deployment. Videos use `preload=none`; gallery items load on demand. Keep dimension metadata, responsive images and explicit media provenance as the collection grows.

Product views remain an explicitly labelled interactive demonstration with illustrative prices; they are noindex/follow. They do not create an order or take payment. Native commercial Product publication requires confirmed production assets, commercial terms and the existing writer's gates.

## Journal

`journal/en` and `journal/fr` contain the 25 bilingual topic bodies prepared for native Shopify Articles. Twenty migrate existing query articles; five update existing Article identities. Use English as source and French as translation. Resolve actual IDs before writes and preserve existing handles/authorship/dates. The native publication plan and private operational receipts are deliberately not exported here.

The theme uses a publish-aware bridge: the existing query page remains available until its native Article is actually published. Native article data supplies the current title, content, date, canonical and locale. The bodies contain practical decision tables/checklists and FAQs. Internal research/evidence notes are kept outside public article content.

## Validation at this snapshot

Seven loader/catalogue checks passed, covering duplicate requests, legacy compatibility, retries, identity rejection, bounded parallel requests and all54/321 mappings. The generator has zero differences against this theme. Official ThemeCheck reports zero code/active English-French errors; other bundled inactive languages still have missing-translation findings. Actual publication readback and final browser regression are tracked separately; this snapshot does not claim those checks are complete.

Only website source and intended public editorial bodies are included. No credentials, customer/order records or unpublished full brand presentation are exported.

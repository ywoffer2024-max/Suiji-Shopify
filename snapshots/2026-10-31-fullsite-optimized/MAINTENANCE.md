# Maintaining the SUIJI storefront

The theme uses Shopify Liquid for initial content and small shared JavaScript modules for the interactive demonstration. The catalogue source is `catalogue/products.json`. Keep stable product keys and reuse the merchant's existing Product and Variant identities; these preview keys do not create native Shopify products.

Run the generator from the snapshot root:

```sh
python3 maintenance/build_storefront.py --theme theme
python3 maintenance/build_storefront.py --theme theme --check
```

The second command must report zero differences. There is no fixed 54-product ceiling. Every new record needs English and French titles and descriptions, actual options and SKU identities, component role, material facts, sale unit, included parts, and explicit connection information. A missing or unconfirmed fact must not become an affirmative compatibility claim. Featured companion SKU identifiers must exist among that product's variants.

Shopify adds a generated-editor comment banner to JSON templates. The check compares their complete parsed objects, including every section setting, rather than demanding identical comment formatting. Other generated files retain exact-content comparison. An actual source snapshot keeps Shopify's returned template bytes and records that provenance separately.

The build writes a small discovery index, one detail asset per product, fixed alternate collection templates, translated initial product content and ordinary links. Product controls fetch only the selected detail; the bag loads only its own details with bounded concurrency. Do not restore a full variant catalogue download on every collection or product page. Keep collection pagination and deferred image loading as the catalogue grows.

Use Shopify-hosted image sources with intrinsic dimensions, responsive widths and useful localized alt text. Keep the first meaningful image eager and other media deferred. Campaign concepts and illustrative product views remain labelled. Supply genuine additional views before adding them to a gallery. Video uses controls, `playsinline` and `preload="none"`; do not introduce automatic downloads for a grid of videos.

For this release's six compressed campaign files, use the exact theme `asset_url`. Applying `asset_img_url` sizing to these WebP filename strings returned Shopify's No image GIF even though HTTP loading and `naturalWidth` succeeded. Image-picker objects continue to use responsive `image_url` widths. Check the actual `currentSrc` and a screenshot, not only a successful load. The public CDN can negotiate another image encoding, so stored-file byte reduction is not a measured network speedup.

Publish a section schema before JSON templates that refer to a new setting in it. Shopify can accept an upload while discarding a setting it does not recognize. Read back the JSON setting itself after publication, as well as the file status. Then publish assets, helpers and entrypoints in dependency order. Compare the actual current file hash before each replacement; restore the exact prior payload to roll back a modified file.

Journal content uses native Shopify Articles with English source and French translations. Reuse a known handle/ID before creating an article. Preserve actual authors and publication dates. Compare the complete public text, headings, links, summary and SEO fields in each language. The compatibility route keeps an old query page usable until its native Article is actually available; it is not a claimed server-side redirect.

Public product presentations remain explicitly labelled demonstrations with illustrative prices, a session bag and local demo completion. They do not submit orders or take payments. Their `noindex,follow` status remains until real product identities, imagery, manufacturing facts, prices, inventory and commercial settings are approved and verified. Do not publish a purchasable zero-price product as a substitute.

Regression checks cover real option/SKU selection, exact companion additions, ring sizing, supplied parts, image dialogs, language persistence, bag quantity/removal, gift notes and demo completion. Use 360, 390, 768, 1024, 1280 and 1440 viewport widths for affected templates. Initial HTML checks do not replace interaction checks or certify physical devices, Safari, Core Web Vitals, search ranking or commercial checkout.

Keep the existing Google & YouTube GA4 integration as the single installation source. A page view is not evidence of ecommerce measurement. Demonstration actions must not send `purchase`, and free text, email and address values must not enter analytics. Real order tracking and Search Console submission have their own verified commercial/resource gates.

Native Article handle matching must account for Shopify Liquid’s blog/handle form. Normalize with `article.handle | split: '/' | last` before comparing an Admin short handle. Explicit native `global.title_tag` remains first; scoped complete-title fallbacks must be verified in actual title/OpenGraph/Twitter output. Keep failed attempts as history rather than marking them successful.

For same-document category navigation, update the list only for known category hashes, close the existing Dawn header drawer through its native method, preserve focus-trap cleanup and aria-expanded, and leave sizing-guide anchors alone. Test actual menu clicks, including the current category; a direct full-page reload cannot verify this behaviour. Wait for the native drawer close animation before reopening in automation.

All25native topics are publicly readable, but the final current sitemap read includes only the old five in both languages. Preserve this discovery limitation until a later actual platform read changes it; do not invent a cache cause, assume indexing, or keep requesting identical sitemaps. A200page, an entry in sitemap and a Google-indexed result are separate evidence.

Journal work follows one consumer need and one main intent. Give a direct answer with practical checks, comparisons/conditions, units, parts and sources, followed by one useful next step. Keep evidence cards outside public content. English and French should be written naturally. Do not transfer historical category-keyword volume to long article headlines, add synonym/country doorway pages, or promise AI-search inclusion.

The supplementary Journal Atom sitemaps are /blogs/journal.atom and /en/blogs/journal.atom. Google accepts Atom1.0 as a sitemap format. The new robots.txt.liquid keeps an exact snapshot of the current managed output plus only these2Sitemap lines; no crawler permission rule changes were made. This snapshot does not automatically adopt future Shopify managed-rule changes. Compare actual rule output before any future customization; do not blindly replace it with robots.default_groups, which Shopify documents can differ from managed output. Rollback of this task-created template restores managed generation; retain all archived payloads. Native XML completeness and search-engine indexing remain separate checks.

Contact email maintenance: edit the native Contact Page body and its French translation separately; keep one mailto:contact@suijijewelry.com link. Shopify contact-form delivery follows the configured Sender email and is a separate configuration/verification task; changing the visible address alone does not reroute the form. Never put mailbox credentials in this repository.

Material display and system maintenance: preserve the original circular assets and existing circle-size rules. The Core-Lock section renders suiji-modular-system and optional suiji-wear-media; blank media slots must not create empty players. Use the catalogue core_lock_compatibility=direct field together with role=charm for the returning-base link, not only a category or a titanium tag. The visible compatibility filter can be cleared. This source version still has a known translated-metadata ampersand encoding defect; normalize before a single final HTML escape in the next exact release.

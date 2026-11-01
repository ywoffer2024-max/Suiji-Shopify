# SUIJI website — frozen v2.1 cart chrome candidate

## Cart chrome delta v2.1

This increment updates the shared cart chrome in `theme/layout/theme.liquid`, `theme/snippets/suiji-r107-header.liquid` and `theme/assets/suiji-r107.css`. It preserves the native Dawn cart form, items/footer sections, scripts, globals, rem sizing and `cart-icon-bubble` target. The remaining theme files retain the verified v2 base.

The producer fixture using the unchanged native cart scripts passed quantity 1-to-2, counter/total/live-feedback refresh and removal-to-empty checks. Actual Shopify preview and release verification remain with the designated publisher. Shopify Files URL settings are a separate late binding, retained by that publisher.


This candidate uses the reviewed website v2 source, retaining the previous vetted 855-path public scope. The complete internal source archive and internal build inputs are intentionally excluded from this public repository.

`theme/` is the complete 799-file Shopify theme candidate. `content/journal/` contains 25 existing article identities in English and French, with Rowan bylines and original publication dates. Update native identities and translations rather than creating duplicate articles. `content/page-candidates.json` contains 25 complete English/French Page content candidates, with native identities and language bindings to be verified by the designated Shopify publisher.

`downloads/` contains the public English/French creator guides. Their actual Shopify Files URLs must be obtained and bound to `suiji_creator_guide_en_url` and `suiji_creator_guide_fr_url`; do not guess a CDN URL.

The previous v1 candidate and original live-site backup are historical. Do not restore an earlier author value: the current approved article author is Rowan. Do not overwrite original publication dates. The original live backup remains on `codex/backup-before-prd-20261101-root-20c4ed80` at commit `f1e62a5317f9eeb4b68651922662b5078389e438`.

This Git archive is not a production publication receipt. Native preview, CMS/translation identity checks, Files links, forms and any release conditions must be verified by the designated Shopify publisher before switching the live theme. Existing product IDs, SKU/option values, prices, inventory, customer information, native cart and checkout must be preserved. A 54-row presentation catalogue is not proof of 54 released purchasable products.

Local design and shopping previews do not activate AI generation, server-side private designs, membership charges, voting, royalties or manufacturing. Do not expose private customer prompts or drafts in public search or public Pages. Native contact/customer forms are compiled into this candidate; actual form actions, validation and email/account readiness still require native checks. No test or mass email is authorised by this archive.

# SUIJI website — frozen v3.2 heading scope candidate

## Heading scope revision v3.2

This reviewed hotfix changes only `theme/layout/theme.liquid` in the 799-file theme. R107-rendered content receives `r107-root` instead of the legacy `suiji-mvp-root`, so existing legacy selectors no longer override the Newsreader 400 display headings. Native cart and legacy product branches keep their original scope. No stylesheet, script, font asset, CMS content, Journal, catalogue or native settings change is included.

DESIGN.md v6.1.2 locks the reviewed shell and requires computed typography checks against real Shopify CSS. Standards and Spec reviews passed. The producer's 64 controlled EN/FR checks simulated the exact body-class change in the actual Shopify CSS environment; these are pre-implementation checks, not proof that the server hotfix is live. Native application and actual computed-font verification remain with the sole publisher. The private checker and complete build prerequisites remain excluded from this public snapshot.


## Ring selection revision v3.1

This reviewed increment updates the shared CSS/JS, Bases and 54 product-detail templates. The guide presents 41–65 mm with only the existing 54/57 mm preview choices enabled. Ring companions preserve their exact existing SKUs, OV-SM-SQ-G and OV-HA-AQ-S, through links and lazy quick configuration; their controls retain the parent ring selection. These are preview choices, not inventory, presale, order or payment claims.

The producer's affected 36 layout cases and two EN/FR exact-companion preview-bag flows passed. Native release verification remains separate. The public Page projection changes only the English/French Bases bodies, preserving the other 24 records including v3 About and mechanism. The 321-configuration catalogue source, Journal and native Dawn sources remain unchanged. DESIGN.md is updated to v6.1.1; the private checker/compiler/renderer and complete build prerequisites remain in the private source archive.


## Brand and About revision v3

The reviewed increment updates the shared stylesheet plus the About, home and mechanism templates. The public Page projection changes only the English/French bodies of About and the mechanism page, preserving the other 23 Page records. [DESIGN.md](DESIGN.md) is the frozen public design contract; its bytes and stylesheet/font lock match the reviewed source.

**This public snapshot is not a complete executable build environment.** The complete private source retains the internal IR/module plan, `pages/en/about.html`, `pages/fr/about.html`, shared renderer/compiler and `maintenance/rev107/check_design_contract.py`. The checker and its build prerequisites are intentionally kept together in that private archive. Build and guard execution require that complete source; this public snapshot contains the full Shopify theme candidate and curated public content for review and native deployment verification.


## Cart chrome delta v2.1

This increment updates the shared cart chrome in `theme/layout/theme.liquid`, `theme/snippets/suiji-r107-header.liquid` and `theme/assets/suiji-r107.css`. It preserves the native Dawn cart form, items/footer sections, scripts, globals, rem sizing and `cart-icon-bubble` target. The remaining theme files retain the verified v2 base.

The producer fixture using the unchanged native cart scripts passed quantity 1-to-2, counter/total/live-feedback refresh and removal-to-empty checks. Actual Shopify preview and release verification remain with the designated publisher. Shopify Files URL settings are a separate late binding, retained by that publisher.


This candidate uses the reviewed website v2 source, retaining the previous vetted 855-path public scope. The complete internal source archive and internal build inputs are intentionally excluded from this public repository.

`theme/` is the complete 799-file Shopify theme candidate. `content/journal/` contains 25 existing article identities in English and French, with Rowan bylines and original publication dates. Update native identities and translations rather than creating duplicate articles. `content/page-candidates.json` contains 25 complete English/French Page content candidates, with native identities and language bindings to be verified by the designated Shopify publisher.

`downloads/` contains the public English/French creator guides. Their actual Shopify Files URLs must be obtained and bound to `suiji_creator_guide_en_url` and `suiji_creator_guide_fr_url`; do not guess a CDN URL.

The previous v1 candidate and original live-site backup are historical. Do not restore an earlier author value: the current approved article author is Rowan. Do not overwrite original publication dates. The original live backup remains on `codex/backup-before-prd-20261101-root-20c4ed80` at commit `f1e62a5317f9eeb4b68651922662b5078389e438`.

This Git archive is not a production publication receipt. Native preview, CMS/translation identity checks, Files links, forms and any release conditions must be verified by the designated Shopify publisher before switching the live theme. Existing product IDs, SKU/option values, prices, inventory, customer information, native cart and checkout must be preserved. A 54-row presentation catalogue is not proof of 54 released purchasable products.

Local design and shopping previews do not activate AI generation, server-side private designs, membership charges, voting, royalties or manufacturing. Do not expose private customer prompts or drafts in public search or public Pages. Native contact/customer forms are compiled into this candidate; actual form actions, validation and email/account readiness still require native checks. No test or mass email is authorised by this archive.

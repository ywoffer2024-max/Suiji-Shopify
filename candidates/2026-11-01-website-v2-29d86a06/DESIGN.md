# SUIJI Design System · v6.2.0

Updated 12 November 2026. This visual and interaction contract covers the English and French storefront, including native Shopify pages. Deployment evidence belongs in the release archive.

## 1. Authority and change control

1. The latest direct human instruction takes priority, followed by this contract, then the existing component implementation. Reference websites and skills inform a change; they do not replace SUIJI's tokens or introduce a new visual direction.
2. Keep the established white/ice-blue palette, Newsreader/Manrope pairing, image-led layout and restrained rectangular controls. Copy, translations and new catalogue records must use the same components. Do not restyle a page because its text or imagery changed.
3. Values below are required. A `clamp()` is a fixed responsive formula, not permission to select another number. Do not add page-specific font families, arbitrary sizes, new accent colors, shadows, radii or breakpoints.
4. A deliberate design change must update the shared CSS, this document and its machine-readable lock in the same change, state the affected components, and repeat their EN/FR desktop/mobile checks. Never update only the lock to silence a failure. A copy-only change must leave the CSS and font hashes unchanged.
5. The maintained storefront lives in the release branch's theme directory. Native and editorial pages share the shell, colors, typography and media rules. Where a generator owns a template, apply durable changes to its source when that generator is next used. The release DESIGN.md and the workspace copy must match at freeze.
6. There is one visual implementation per component across EN/FR. Translation may wrap naturally; it must not select a different font, size, button treatment or page layout.

### Visual direction

- Use an editorial jewelry composition with a white canvas, a restrained serif heading, readable captions, fine dividers, and the jewelry as the largest visual focus. Ice blue serves a distinct instructional or editorial band, the preview notice and the footer. Main actions use charcoal. Blue ink serves links, focus and selection.
- Prefer one prominent action within each decision area. Supporting actions use text links, quiet outlines or named icons. Use circles for actual swatches, approved category images and functional icons. Commerce inputs, buttons and image frames have square corners. Avoid tinted card shells around routine controls, pill-shaped tabs and decorative badges. Use spacing before adding another border.
- Put product choice, size help and purchase state before descriptive tabs. Show material, size, weight, wearing scale and compatibility wherever verified. A preview piece gets honest viewing guidance. Cards, galleries and editorial photography have separate roles and use the matching approved asset.


## 2. Brand voice and factual boundaries

SUIJI is handmade jewelry shaped by personal choices. The story begins with Chunyu's childhood search for gemstones, a bespoke fine-jewelry practice begun in 2014, and customer requests to wear a favorite design in different ways. The mission is for everyone to take part in designing jewelry that feels their own and continues to be worn as life changes.

- Use **Core-Lock & Modular System**, **Bases / Bases**, and **Charms / Ornements** consistently. A base and a charm are distinct components. Compatibility and included parts are separate facts; one charm occupies one position at a time.
- Tell the founder story in first person inside “A note from Chunyu”; use the brand's “we” elsewhere. Use the latest approved EN/FR founder text and V40, not the superseded Brand Masters. Education is visual communication at Tsinghua, followed by brand management at INSEEC.
- French spring engineers contributed to later spring, mechanics and operating-pressure refinement. Public engineering copy focuses on successive prototypes, component fit, movement and hand finishing. Omit actual patent identifiers and publication links from storefront copy. Use iteration or test counts only when the user supplies verified numbers; do not invent them.
- Titanium alloy is used for components designed to contact skin. Other materials depend on design/process, with lightness and wearing feel as priorities. Preserve specific TC4 and component facts; a silver-colored finish is not silver material. Do not promise that nobody can have an allergic reaction.
- Sustainability means continued use, compatible changes, care and discussing repair. Do not invent recycled-content percentages, carbon savings, zero-waste claims or environmental certification.
- Personal design is the brand vision. The public Studio remains a clearly described preview until its backend exists; do not imply a live AI production or ordering service.
- Product finish display names are **Classic Gold / Or classique**, **Silver / Argent**, **SUIJI Blue / Bleu SUIJI**. **Natural Titanium / Titane naturel** is reserved for a real corresponding option. Preserve internal option values, variant IDs and SKUs; never manufacture a new choice by renaming another one.
- Journal authors are **Rowan**. Preserve native article identities, full approved EN/FR bodies, titles and publication dates.

## 3. Color, fonts and reading roles

| Token | Locked value | Use |
|---|---|---|
| Paper | `#FFFFFF` | Page, header and product-image canvas |
| `--r-ice` | `#EAF1F5` | Deliberate modules and footer |
| `--r-ink` | `#202226` | Primary text and primary action |
| `--r-muted` | `#626466` | Supporting text |
| `--r-accent` | `#315A73` | Focus and selected-state emphasis |
| `--r-line` | `#D5DFE5` | Decorative separators |
| `--r-control-border` | `#7C8992` | Essential control and option outlines |
| `--r-gutter` | `clamp(20px,4.2vw,72px)` | Shared content edge |
| `--r-serif` | `Newsreader,Georgia,serif` | Display headings |
| `--r-sans` | `Manrope,Arial,sans-serif` | Reading text, labels and controls |
| `--r-story-size` / `--r-story-leading` | `16px` / `1.8` | About chapter prose at every width |
| `--r-touch-target` | `44px` | Shared tappable controls |
| `--r-finish-target` / `--r-finish-gap` | `48px` / `8px` | Finish and size target and finish row spacing |
| `--r-purchase-target` | `52px` | Main purchase control |
| `--r-thumbnail` / `--r-thumbnail-phone` | `64px` / `56px` | Gallery thumbnails |
| `--r-gallery-phone-max` | `38svh` | Mobile product image stage maximum |

White is the default. Do not make an entire page ice blue to group unrelated sections. Product colors come from images and truthful options, never CSS recoloring. Use the two existing self-hosted WOFF2 files with `font-display:swap`; add no external font service. Newsreader is 400. Manrope is at least 400 for reading and utility text.

| Role | Desktop rule | At 749px and below |
|---|---|---|
| Common H1 | Newsreader 400, `clamp(42px,5vw,72px)`, line-height `1.02` | Same formula |
| Compact page H1 | `clamp(40px,4.3vw,60px)` | `40px` |
| Homepage H1 | `clamp(48px,6vw,88px)` | `clamp(42px,11vw,53px)` |
| Product H1 | `clamp(40px,4vw,58px)`; `40px` at 750–989px | `clamp(34px,9.5vw,42px)`, maximum `15ch` |
| Studio workspace tool H1 | Manrope 500, `28px/1.25` | Same; this tool-header exception does not apply to marketing or article pages |
| Common H2 | Newsreader 400, `clamp(30px,3vw,46px)`, `1.12` | Same formula unless named below |
| About chapter H2 | `clamp(30px,3vw,44px)` | `32px` |
| General H3 | Manrope 500, `20px/1.35` | Same |
| General interface text | Manrope 400, `15px/1.65` | Same; input exception below |
| Page introduction | `17px/1.6`, maximum `64ch` | `15px/1.6` |
| About prose | `16px/1.8`, maximum `72ch` | Same |
| Journal article prose | `16px/1.85` | Same |
| Journal article H1 | `clamp(40px,4.6vw,64px)/1.06`, maximum `23ch` | `42px/1.06` |
| Journal article H2 | `34px/1.16` | `30px/1.16` |
| Product descriptive prose | `16px/1.7` | Same |
| Product price/status line | Newsreader `25px/1.4` | Same |
| Complete-the-look heading | Newsreader 400, `24px/1.2` | `25px/1.2` |
| Caption (`.r-caption`) | `12px/1.6` | Same |
| Founder role | `12px/1.5` | Same |

Long paragraphs must not exceed `72ch`; do not justify, line-clamp or shrink them to fit. A caption is not a substitute for body copy. Input/select/textarea text is at least `16px` on mobile. Headings may wrap; desktop navigation labels may not. The existing compact native country select is an explicit `11px` desktop exception and moves into the mobile drawer below 1280px. Do not extend that exception to body copy or other controls.

## 4. Layout and responsive boundaries

| Range | Header | Product page | Catalogue | Footer |
|---|---|---|---|---|
| 1280px and above | Inline available-group navigation; height `88px` | Two columns `1.15fr / 1fr` | Four columns | Five columns |
| 990–1279px | Drawer; height `76px` | Same two columns | Four columns | Three columns |
| 750–989px | Drawer; height `76px` | Two columns, gap `32px` | Three columns | Three columns |
| 749px and below | Drawer; height `66px` | Single column, gallery then purchase content | Two columns | Two columns; Client care spans the last row |

Other bounded queries are 1280–1399px for compact inline navigation, below 600px for one-column design comparisons, below 360px for header spacing, coarse-pointer hit areas and reduced motion. Do not invent a new device breakpoint for an individual page.

- Header inline padding: `clamp(20px,3vw,56px)`; mobile `20px`, below 360px `16px`. Header icons have `44 × 44px` targets. The separate chevron has a `36px` fine-pointer target and `44px` coarse-pointer target.
- Main sections: `54px` vertical padding and the shared gutter; mobile `36px`. Introduction: `58px` top / `46px` bottom and maximum `1180px`; mobile `36px / 32px`.
- Catalogue grid gaps: `38px 24px`, then `32px 20px` at intermediate widths, then `28px 14px` on mobile. Use the shared card; do not create bespoke card proportions for each page.
- Product columns: gap `clamp(40px,6vw,100px)`, top `20px`, bottom `64px`; 750–989px gap `32px`; mobile top `10px` and gallery bottom gap `28px`. Neither gallery nor purchase column is sticky.
- About chapters: ordinary chapter columns remain .8fr / 1.2fr, gap60px and existing page edges. The designer note is the explicit6November2026 exception: one continuous personal letter at68ch, using16px/1.8 throughout. A compact header pairs the unchanged, uncropped original portrait (maximum220px, natural height) with the note heading and founder role; gap40px, aligned to the center of that header. All narrative paragraphs follow beneath at the same leading edge and measure, in their original order. No opening paragraphs may be split beside the photo, no later continuation may move to a second reading origin. Header-to-story gap32px. At749px and below the header stacks, portrait maximum180px centered, gap24px and story gap28px; heading32px and prose stays16px. Preserve all ten source paragraphs including the founder role; no sticky photo, floating text, folding, truncation or omission. The other About sections share the chapter grid and reading rhythm. The current approved story controls the section count and order.
- Controls remain rectangular. Do not add pill-shaped buttons/cards, decorative rounded containers or new ambient shadows. Circles are reserved for the two system entrances, category imagery and finish swatches.
- Focus ring: `2px` accent with `4px` offset. Preserve visible hover, selected, disabled, invalid, pending and success states. A status change must be readable without relying on color alone.

## 5. Shared component contracts

### Navigation and footer

Use the same SUIJI header and footer across home, catalogue, editorial, product, search, cart and policy routes. Provide Core-Lock & Modular System, Shop All, Sets, Gifts and About SUIJI with the current French labels and working destinations. Sets can lead to an informational view while the collection awaits reviewed product photos. Keep the shopping bag, search and language switch at consistent entry points. Keep the full Core-Lock label on one line on inline navigation, one underline, and one adjacent SVG chevron. Shop All uses image-backed disclosures; Sets does so only when it is available. Keep a clickable parent link, separately operated disclosure, fine-pointer hover, click, keyboard access, outside-click close, Escape and focus return. Mobile subcategories open into a right-side panel with Back and Close; do not reintroduce nested accordion stacks.

The footer order is **Shop → How it works → About SUIJI → Create with us → Client care**, followed by legal/privacy controls. Desktop gap `28px`; intermediate `32px 36px`; mobile `32px 24px`. Headings `14px`, links `13px` desktop / `14px` mobile, minimum link targets `36px` / `44px`. Legal text `12px`. Do not add a sixth catch-all column or repeat account/design-rights links across groups.

### Product, complete the look and size guide

Start with the shared breadcrumb and gallery, then the localized product name and price or preview/availability state. Follow with applicable finish and size, size help, sale unit where needed, and the primary action. Complete the look follows the main choice and precedes product details and service notes. Each step has a single visual priority. Use the same publicly approved product identity across cards and detail pages. Market formatting and actual variant pricing come from Shopify.

#### Finish and sizing controls

- Use native radio buttons for displayed finishes. The default visual is a 26px color sample with a Manrope 13px label below. The control is 78px wide and at least 48px high. Use an 8px row gap, 12px column gap and natural wrapping. Prefer Shopify's real swatch data. Known SUIJI finishes may use the approved color samples. Use a readable text choice when a sample is unavailable.
- The selected radio has a thin outer ring and a check, with a 2px focus outline and 4px offset for keyboard interaction. Keep labels readable in all states. Use separate plain status text for a sold-out finish or a missing configuration. Reserve visual strike-through for price comparison where appropriate.
- Real sizes are visible in a button group. Keep the size guide adjacent. Its international reference and calculator are informational. Actual size options and availability come from the existing Shopify variants. For the documented ring families, the known active sizes are 54/57 mm. Preserve the 41–65 mm comparison range and display unverified equivalents as an em dash.
- The guide uses two measurement methods, an Enter-submittable calculator and live result/error text. Table overflow stays in its labeled region. Guide input and action are 48px and aligned. Quick dialogs use up to 880px and the size guide up to 1120px. Use a 12px mobile inset, an internal scroll area up to 92dvh, Escape and focus return.

#### Purchase states

| State | Visible treatment |
|---|---|
| Collection preview | Browsable options and details, one quiet “Collection preview” label, reference price only when a real amount exists. |
| Available | Current price and one charcoal primary Add to cart control, with quantity if appropriate. |
| Sold out | One clearly labeled status with browsable media and existing alternatives. |
| Missing configuration | Plain localized status and available choices. |
| Request beyond standard options | Contextual final-sale notice before the relevant inquiry or confirmation, with full terms linked. |

The theme's ordering setting is shared by the header, native product, card quick add, cart and cart drawer. The site's current preview mode is the default until the approved launch configuration enables ordering. Show purchasing controls only for the available state. A pending option request suspends checkout affordances, and an error names the available recovery. Price and availability use accessible status regions. A valid variant selection updates the selected options, gallery, URL, price and status in one response.

#### Media and compatible pieces

Product pages use an image-led two-column layout at 750px and above, with single-column layout on phones. At 360 × 800 and 390 × 844, after dismissing any first-visit consent message, the product title and price or state should appear in the initial viewport. Primary imagery uses a white, dimensioned stage and its original silhouette. The mobile stage caps at 38svh. Thumbnail controls are 64px desktop and 56px mobile. Show the active media, its view count and a zoom action. Zoom uses the original approved view.

A different framing can be approved for a specific image role. The verified 8-Link Collar front role uses a 1.18 display scale, leaving the underlying approved file and zoom unchanged. Keep the complete jewelry silhouette in the initial gallery and preserve visible links and clasps.

**Complete the look** lives in the purchase column, before the detail tabs. A curated pairing has a verified compatibility relationship, approved image and live variant or equivalent preview destination. R01's two current oval examples render side by side. Link to the exact companion choice and use a minimum 44px target. Use a compact scroll rail for longer approved groups. Show prices sourced from the linked variant when applicable.

The mechanism entrance keeps the two circular image entrances: `200px` diameter and `50px` gap on desktop, `140px` diameter and `26px` gap on mobile. Labels use Newsreader `26px/1.4`, reduced to `24px` on mobile. Keep the Bases and Charms destinations.

### About and Journal

Journal article layout uses a maximum `760px` reading column plus a `180–260px` aside, `60px` gap; at 750–989px the aside is `200px` and gap `32px`; at 749px both stack and the aside is no longer sticky.

About uses the latest approved EN/FR story. Preserve the existing designer portrait and continuous letter treatment. Keep a short contextual final-sale link inside the relevant reading column and the full policy at the applicable custom decision. The final editorial action links to its actual destination. A stock or campaign image may anchor one editorial section per page. Subsequent sections use a different approved image or a text-led band.

Journal solves a concrete consumer problem with an early usable answer, practical steps/comparisons, clear conditions/units, sources, related reading and one main next action. Keep the six need directions and all approved full EN/FR articles. Evidence/research cards stay internal. Article title, author and dates come from native Shopify data. Tables scroll within their own labeled region; document overflow is a failure.

Journal uses the existing breadcrumb component for Home / The Journal / current article, with matching BreadcrumbList data. Native excerpts remain in list/SEO fields; detail pages preserve their approved body introduction without prepending the same summary again. Related reading uses up to two fixed, same-topic registry links, excluding the current article; when only one other approved guide exists in the topic, show that one rather than add an unrelated link; it does not depend on a random App. Keep one BlogPosting with the actual author and timezone-qualified publication date. A visible reviewed date and dateModified require the same explicitly recorded suiji.content_reviewed_at date/date_time field; otherwise omit both. Article handle comparisons first normalize blog/handle to the short handle. The scoped max-image-preview:large metadata permits larger existing images; it does not promise Discover or justify unrelated pictures. Native Journal tag archives repeat the full guide list, so they use noindex,follow; normal Journal and Article eligibility stays unchanged. This v6.1.9 addition changes shared Journal markup and these scoped shell metadata conditions; visual tokens, fonts and CSS remain unchanged.

Social sharing images follow the same final2 whitelist. The shared social-image helper maps only known current page/product/category contexts to their approved1200px final2 file. Pages without an exact mapping, including image-free Journal articles, use the existing SUIJI logo as neutral brand identification in social metadata; it is not an article feature image or a product photograph. Its actual512×511 dimensions and summary Twitter card are declared. Use an explicit brand image because live pages with an omitted image gained an additional old-image tag after the theme scripts. Verify the corrected live output rather than infer the injection mechanism. Never fall back to a legacy Page/settings image, mutate those native settings, or introduce unrelated imagery. This v6.1.9 fix changes metadata only; layout, CSS, fonts and visible content stay unchanged.

### Native cart, forms and local previews

Native pages and R107 pages share the storefront shell. Native sections keep the existing Shopify rem scale and section updates. The cart uses one `#cart-icon-bubble` update target with its existing quantity and accessible label. App embeds and native forms retain their active settings. The preview bag is browser-local and clearly labeled. Contact and newsletter submit only to their configured Shopify services and show actual success or failure. Native account endpoints stay in use.

### Custom-work final-sale notice

Use the single custom-order-policy.json EN/FR source for all custom-design, personalisation or agreed product modifications beyond standard options. Labels are “Custom work · Final sale” and “Sur-mesure · Vente définitive”; scope is change-of-mind returns/exchanges, with statutory faulty/non-conforming goods rights expressly preserved. Listed standard colours/finishes/sizes do not become custom merely by selection. Place the notice before custom enquiry/review actions, in relevant PDP details, Contact, Studio, FAQ, Shipping/returns, relevant About and custom-design Journal content and the shared footer; preserve the written-quote confirmation point. Do not add a prechecked acknowledgement or mark every standard SKU final sale. Shared notice: white background, decorative top rule, margin24px, vertical padding20px, body14px/1.6, label600, detail link13px with44px target. Render-only notices may be appended to relevant custom-design Articles without altering their native bodies, authors or dates. Future custom-work Articles use the custom-work tag. No unrelated native-policy rewrite.

## 6. Media, routing and architecture

White-image rules: retain original foreground geometry, color, engravings, openings and fine edges; background must be #ffffff outside a source-appropriate antialiased boundary. A technical mask pass is not visual acceptance: inspect holes, pale walls, pearls, small links and detached components. Preserve original full-resolution files; serve dimensioned600/1200px WebP derivatives with lazy loading outside the first view. A grey hole or damaged wall blocks that candidate; repair the local mask, never recolor the product to hide the defect. Editorial composition images require composition captions and must not imply a complete sales BOM. Render all final2 white-background photos with contain inside their existing image boxes, including the About banner and split sections; never crop away parts of the product to fit a former campaign image slot.

Availability-driven navigation uses the latest approved category and media list. Category entrances remain navigable where there is a working collection or explanatory landing. Hold unreviewed products and media at their own visibility level. Keep the same category names and links in both menus.

Shared UI states: use --r-control-border (#7c8992, minimum3:1 against white) for essential form and option outlines. --r-line remains a decorative separator. Preserve existing readable ink/muted/focus colors. Filter controls open one native modal dialog, constrain keyboard focus, scroll the panel on small screens, lock background scroll, and return focus to the trigger on every close path including Escape. Design comparison uses the shared heading font; below600px it is one readable column and long text wraps.

Local selections are named Saved selection / Sélection enregistrée and stay separate from the native shopping bag and its actual quantity. Provide a persistent return link in navigation and the empty native cart; never copy local counts into the native cart badge. Tabs and isolated quick-add controls have minimum44px target boxes. The native cart uses a narrow typography/style bridge under its existing suiji-mvp-root/data-family marker, without r-site inheritance or changes to Dawn IDs, counts or checkout.

Empty selections show one exploration action and hide order/review summaries. Preserve unavailable historic selections and saved design text on the current device; explain unavailable pieces or changed references instead of deleting records or implying a transfer to the native cart. Article CTA links to hidden products lead to an available educational/catalogue route; original Article bodies, dates and authors stay unchanged.

Shopping preview: the final action goes to the existing Contact page with the current local selection prefilled, and sends nothing automatically. Do not link to an unsaved Page or imply that an order/payment exists. Search indexes the visible catalogue's documented EN/FR names, roles, materials and option labels; all query words must match. No-result states offer clear, browse and Contact actions. Do not infer a mineral from appearance.


The photo-publication.json registry is the only source for public product visibility and jewelry imagery. Only final 2.zip white-background derivatives may appear in product galleries, category/navigation cards, editorial figures, search, workspace examples or the preview bag. The existing Chunyu portrait, brand Logo and functional icons are explicit human-approved exceptions. Never use another product or a generic series picture to fill a missing product image. Missing-picture products retain their source records but are absent from lists, search, menus, recommendations and bag additions; old direct links show a readable unavailable state without an image or selection form. Match alt text and captions to visible components; a complete charm assembly must not illustrate a bare base SKU.


- Use one shared renderer and generated template per family, not a hand-built page per SKU. Preserve URLs, identities, native locale roots and query-selected configuration. Bind native internal URLs through `routes.root_url`; do not hardcode an assumed `/fr` root.
- Reserve image dimensions. Give the first homepage or product gallery image eager loading and high priority. Use the existing 600px and 1200px WebP files for the same approved source. Match responsive source sizes to the hero and gallery layout. Keep the full-size URL and update both source attributes when the gallery selection changes. The zoom dialog uses the selected 1200px image. Keep below-fold galleries and cards lazy and the public catalogue allowlist scoped.
- Future video uses a poster, controls, `preload=none` and intent-based playback. No grid autoplay, fake play button, new carousel library or heavyweight framework merely to add media.
- AI campaign placeholders remain distinguished from real product geometry, founder portraits and documentary workshop images. Never invent a hidden product angle, manufacturing proof or source identity.
- Production-scale filtering/pagination belongs to a backend catalogue source; do not solve growth by expanding an unbounded client-side data dump. Keep public config an explicit fact allowlist.
- Keep page hierarchy, canonical/alternate metadata and native Article schema consistent with the content actually rendered. The legacy News index points to the Journal in the active market. Its historical articles retain their own canonicals. A sitemap result or deployed source is not evidence of Google indexation.

## 7. Verification and release

Run `python3 maintenance/rev107/check_design_contract.py` from the release directory before preparing a Shopify patch. The checker verifies the design token values, reviewed source bytes, state wiring and required template boundaries. Run Shopify Theme Check on the resulting theme and compare changed-file errors with the same baseline.

For a layout or shared-style change, verify actual browser widths **320, 360, 390, 768, 1024, 1280 and 1440px** in EN and FR, plus the changed component's breakpoint edges. Assert the actual viewport dimensions in the saved evidence; a mislabeled screenshot is not a pass. Assert actual Newsreader400 H1/display and Manrope body on the native storefront (native cart keeps its existing exception). Check long translated strings, navigation, focus, form/error states, product configuration, guide, complete-the-look and cart behavior as applicable. At 200% zoom verify usable reflow and access to controls. No page overflow or hidden primary action is acceptable.

Publication requires the actual native theme/Page/translation readback and the sole Store writer's publish receipt. Record physical-device, Safari, zoom, video, delivery, payments or performance tests as unverified when they were not performed. Keep test evidence and live theme IDs outside this normative document. Keep the template matrix in release evidence, including home, catalogue and filter, preview and native product, search, cart, About, Core-Lock, Journal, contact, help and empty/error states. Validate normal text at 4.5:1 and required control boundaries and focus at 3:1. Do not label physical device or payment behavior as verified based on fixture tests.

### Local versions and phone controls

A local version keeps its text and identity when an example is retired. Display the unavailable reference as text and let the visitor choose a current example before saving or preparing a new review. Comparing two versions keeps both briefs readable. Loading a different version clears the previous in-memory upload so that a reference cannot carry over by mistake.

Before deleting a version, name it and ask for confirmation. Cancel leaves the record and focus in place. Escape cancels an in-progress rename. An on-page making-review draft must report whether the browser actually saved it, and offer copying as the recovery path when local storage is unavailable.

Use named groups of native toggle buttons for Studio input modes and design-example stages. Each button exposes its pressed state and responds to Tab, Enter and Space. Editable version names, saved quantities and catalogue sorting controls use at least 16px text and a 44px height on small or coarse-pointer screens. Catalogue sorting uses an explicit 44px height at these widths to preserve the touch target in Safari while retaining the native select. Secondary controls use the essential control border. Scrollable overlays contain scrolling within their own panel.

## Reference patterns

- Product-led hierarchy, factual dimensions and service access are informed by [Tiffany HardWear](https://www.tiffany.com/jewelry/necklaces-pendants/tiffany-hardwear-small-link-necklace-60964882/) and [Boucheron Quatre](https://www.boucheron.com/us/quatre-classique-small-ring-classique-jrg00290.html).
- Modularity and wearable scale are informed by [Marla Aaron's jewelry guide](https://marlaaaron.com/en-ca/pages/guide-to-our-jewelry) and [Jenny Bird's Florence earrings](https://jenny-bird.com/products/florence-earrings-gold).
- The restrained component vocabulary and editorial spacing draw on the public third-party [Cartier DESIGN.md](https://www.shadcn.io/design/cartier), [Aesop DESIGN.md](https://www.shadcn.io/design/aesop/raw) and [REI Cedar's spacing guidance](https://cedar.rei.com/guidelines/spacing).
- Product option behavior and image loading follow [Shopify variant guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants), [Shopify theme performance guidance](https://shopify.dev/docs/storefronts/themes/best-practices/performance) and [Baymard product page research](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux).
- Follow [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for reflow, focus, contrast, name and state and live messages. SUIJI uses the above 44/48px control targets as its own design minimums.

## Machine-readable design lock

This lock pins the reviewed visual implementation. Any mismatch stops compilation until the intended change, document and affected-page verification are reconciled. Font and CSS hashes are not a substitute for browser QA.

```json design-lock
{
  "version": "6.2.0",
  "stylesheet": {
    "path": "theme/assets/suiji-r107.css",
    "sha256": "e5ca4de3c489afb13d7f5c3cbb139a654fd560b47c19ba8c206523fecc8feda0"
  },
  "shell": {
    "path": "theme/layout/theme.liquid",
    "sha256": "425d3e7a0e023481cec2de6ce40cecb39c3ca3846e5141be8af3b14a23efbad9"
  },
  "fonts": [
    {
      "path": "theme/assets/suiji-newsreader-latin-regular.woff2",
      "sha256": "e71a3bea5993009ab159b89d52d88ba515efd57e8d9324a94c681bfc72c9ac0f"
    },
    {
      "path": "theme/assets/suiji-manrope-latin-variable.woff2",
      "sha256": "8bd97e6bbbc1f602a8f791530eed1064c9a357d5731bbc76e3fc587fb068728f"
    }
  ],
  "root_tokens": {
    "--r-ink": "#202226",
    "--r-muted": "#626466",
    "--r-ice": "#eaf1f5",
    "--r-line": "#d5dfe5",
    "--r-accent": "#315a73",
    "--r-gutter": "clamp(20px,4.2vw,72px)",
    "--r-serif": "Newsreader,Georgia,serif",
    "--r-sans": "Manrope,Arial,sans-serif",
    "--r-story-size": "16px",
    "--r-story-leading": "1.8",
    "--r-control-border": "#7c8992",
    "--r-touch-target": "44px",
    "--r-finish-target": "48px",
    "--r-finish-gap": "8px",
    "--r-purchase-target": "52px",
    "--r-thumbnail": "64px",
    "--r-thumbnail-phone": "56px",
    "--r-gallery-phone-max": "38svh"
  },
  "qa_widths": [
    320,
    360,
    390,
    768,
    1024,
    1280,
    1440
  ],
  "locales": [
    "en",
    "fr"
  ],
  "footer_groups": 5,
  "designer_layout": "single-column-letter",
  "designer_measure": "68ch",
  "designer_portrait_max_width_px": 220,
  "designer_mobile_portrait_max_width_px": 180,
  "designer_portrait_src": "suiji-designer-chunyu-wen-v40.jpeg",
  "ring_mm_range": [
    41,
    65
  ],
  "ring_enabled_mm": [
    54,
    57
  ],
  "components": [
    {
      "path": "theme/assets/suiji-native-pdp.css",
      "sha256": "8fdbe3fd0ae9950d89dffb47ded16811180cf00efd264eafd4f8ceca326d0943"
    },
    {
      "path": "theme/assets/product-info.js",
      "sha256": "580dd071261e0c4389bb167267bcc5044b2c315f46d2bb744fb786cd6f527efd"
    },
    {
      "path": "theme/assets/media-gallery.js",
      "sha256": "9bb3d821b5f44bddbfdf1a6d288dbd99db3acc1d4d407000c32d4a3827c4894a"
    },
    {
      "path": "theme/snippets/suiji-finish-option.liquid",
      "sha256": "5ede5cc689ab036d67cfacf85fcb93739c3a429c250816a8ee6f3cf445b51d2f"
    },
    {
      "path": "theme/snippets/suiji-purchase-state.liquid",
      "sha256": "f5b8e0b5126ed97753bb5a842c3df29ac49ee26262e6c4b8924386de0dfc85fd"
    },
    {
      "path": "theme/sections/main-product.liquid",
      "sha256": "8c3d78aa4d19fe91b2b4b4f6d129028814c20824fb747a9e7a61089ad44756ea"
    },
    {
      "path": "theme/snippets/product-variant-picker.liquid",
      "sha256": "721a8f75d4cdc0dba4bfde941cf2d122f7c72cc8d7ca409821ca7d46dd3279bb"
    },
    {
      "path": "theme/snippets/product-variant-options.liquid",
      "sha256": "3594dd73cfa0b987c51b2e50dabf0529f5ac8ccadc0f8d3a8a3f9624ad2682e1"
    },
    {
      "path": "theme/snippets/product-thumbnail.liquid",
      "sha256": "d0319448aec80d75f4cf4170944f7b4c18005dfde10862abada5a6712165eb1a"
    },
    {
      "path": "theme/snippets/product-media-gallery.liquid",
      "sha256": "294f8d48a57894d71d71a58cc060fc00ca87484f9aec5389520903bb1fee14bd"
    },
    {
      "path": "theme/snippets/buy-buttons.liquid",
      "sha256": "4d339a58088bce21338727bb20a3d0676e717397bee60be639849ed41aa255c1"
    },
    {
      "path": "theme/snippets/card-product.liquid",
      "sha256": "b8ae0e72e767ab7f2f7468284335ceae5ae4f6ba2c3f405619880f9074b1c39e"
    },
    {
      "path": "theme/snippets/cart-drawer.liquid",
      "sha256": "51545e9f89785a9ee3211a0d85c9b9279fed3ba00ba71727776e28d76893fa10"
    },
    {
      "path": "theme/sections/main-cart-footer.liquid",
      "sha256": "2d3c15dce7e3c9ec2308abda0cfa763b1c932ee23a513158f2bb15593e9647bb"
    }
  ]
}
```

# SUIJI Design System · v6.1.9

Updated 6 November 2026. Scope: the English and French rev107 storefront. This is the visual and interaction contract, not a deployment report. Publication receipts, QA results and historical versions belong in the release archive.

## 1. Authority and change control

1. The latest direct human instruction takes priority, followed by this contract, then the existing component implementation. Reference websites and skills inform a change; they do not replace SUIJI's tokens or introduce a new visual direction.
2. Keep the established white/ice-blue palette, Newsreader/Manrope pairing, image-led layout and restrained rectangular controls. Copy, translations and new catalogue records must use the same components. Do not restyle a page because its text or imagery changed.
3. Values below are required. A `clamp()` is a fixed responsive formula, not permission to select another number. Do not add page-specific font families, arbitrary sizes, new accent colors, shadows, radii or breakpoints.
4. A deliberate design change must update the shared CSS, this document and its machine-readable lock in the same change, state the affected components, and repeat their EN/FR desktop/mobile checks. Never update only the lock to silence a failure. A copy-only change must leave the CSS and font hashes unchanged.
5. `maintenance/rev107/site.py` is the shared renderer; `build_theme.py` compiles it to Liquid. Generated snippets must not be hand-styled or edited as a second implementation. The root workspace DESIGN.md and the release's DESIGN.md must be byte-identical at freeze.
6. There is one visual implementation per component across EN/FR. Translation may wrap naturally; it must not select a different font, size, button treatment or page layout.

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

White is the default. Do not make an entire page ice blue to group unrelated sections. Product colors come from images and truthful options, never CSS recoloring. Use the two existing self-hosted WOFF2 files with `font-display:swap`; add no external font service. Newsreader is 400. Manrope is at least 400 for reading and utility text.

| Role | Desktop rule | At 749px and below |
|---|---|---|
| Common H1 | Newsreader 400, `clamp(42px,5vw,72px)`, line-height `1.02` | Same formula |
| Compact page H1 | `clamp(40px,4.3vw,60px)` | `40px` |
| Homepage H1 | `clamp(48px,6vw,88px)` | `53px` |
| Product H1 | `clamp(40px,4vw,58px)`; `40px` at 750–989px | `42px`, maximum `15ch` |
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
- About chapters: ordinary chapter columns remain .8fr / 1.2fr, gap60px and existing page edges. The designer note is the explicit6November2026 exception: one continuous personal letter at68ch, using16px/1.8 throughout. A compact header pairs the unchanged, uncropped original portrait (maximum220px, natural height) with the note heading and founder role; gap40px, aligned to the center of that header. All narrative paragraphs follow beneath at the same leading edge and measure, in their original order. No opening paragraphs may be split beside the photo, no later continuation may move to a second reading origin. Header-to-story gap32px. At749px and below the header stacks, portrait maximum180px centered, gap24px and story gap28px; heading32px and prose stays16px. Preserve all ten source paragraphs including the founder role; no sticky photo, floating text, folding, truncation or omission. The other seven About chapters retain their existing layout and spacing.
- Controls remain rectangular. Do not add pill-shaped buttons/cards, decorative rounded containers or new ambient shadows. Circles are reserved for the two system entrances, category imagery and finish swatches.
- Focus ring: `2px` accent with `4px` offset. Preserve visible hover, selected, disabled, invalid, pending and success states. A status change must be readable without relying on color alone.

## 5. Shared component contracts

### Navigation and footer

The header has **Core-Lock & Modular System**, **Shop All**, **Gifts** and **About SUIJI**, with their existing French labels. Sets returns as the optional fifth group only when the photo registry contains a complete photographed set. Keep the full Core-Lock label on one line on inline navigation, one underline, and one adjacent SVG chevron. Shop All uses image-backed disclosures; Sets does so only when it is available. Keep a clickable parent link, separately operated disclosure, fine-pointer hover, click, keyboard access, outside-click close, Escape and focus return. Mobile subcategories open into a right-side panel with Back and Close; do not reintroduce nested accordion stacks.

The footer order is **Shop → How it works → About SUIJI → Create with us → Client care**, followed by legal/privacy controls. Desktop gap `28px`; intermediate `32px 36px`; mobile `32px 24px`. Headings `14px`, links `13px` desktop / `14px` mobile, minimum link targets `36px` / `44px`. Legal text `12px`. Do not add a sixth catch-all column or repeat account/design-rights links across groups.

### Product, complete the look and size guide

Keep image-led product columns, breadcrumb, reference, title, sale unit, material, applicable options, size guide, quantity and primary action in the shared order. Show only applicable choices; do not replace simple swatches with many dropdowns. Do not invent prices, stock, included components, compatibility or finish photographs.

Product galleries use one primary image followed by a horizontal thumbnail strip and a visible view counter. Thumbnail buttons are 64px on desktop and 56px on mobile; keyboard Left/Right/Home/End changes the current view. Enlarge always uses the selected view. Mobile primary imagery is capped at 42svh so multiple images do not postpone the title. Where a catalogue option stores nine clasp/button combinations, show two named groups of three colors and map them back to the unchanged compound value; no new SKU or stock claim.

**Complete the look is inside the purchase column, after the product action/tags/contact link, before the full-width product details.** Ring product pages must show exactly two controlled front-view oval companions: **OV-SM-AQ-G** (Smooth/F01) and **OV-HA-AQ-B** (Textured/F02). Image/name links and lazy quick forms preserve that exact existing SKU; quick-form defaults must not inherit the parent ring SKU. The ring pair uses two equal columns at every width. Other product pages retain their compact three-card desktop strip; mobile is a scroll-snap rail with `46%` cards, `12px` gap and visible continuation. Keep image, name and honest price state. The plus target is `44 × 44px` at every width. The plus action lazily opens that companion's configuration; it must not duplicate or change the main form's selected options. Do not move this back into an oversized full-page block.

Quantity and purchase button are `52px` high; the row is `80px / 1fr` with `14px` gap, aligned to the bottom. A ring's guide opens a dialog and also exists on the standalone Bases & sizing page. Ring-size selectors show existing **54 / 57mm** options first. The remaining 23 sizes in **41–65mm** stay inside a labeled “Other sizes” details control, disabled and crossed out. The complete international table stays in the size guide. This is not a stock or presale claim. The guide table uses the same 41–65mm range and preserves unverified regional equivalents as an em dash. Keep two measurement methods, an Enter-submittable calculator, live result/error, approximate international table, and highlights for 54 / 57. Table overflow stays inside its labeled region. Guide input and action are `48px` high and align; do not reproduce the previously misaligned input/button row. Quick configuration dialog maximum width is `880px`; the size guide is `1120px`; mobile horizontal inset `12px`, maximum height `92dvh`, with internal scroll and focus return.

The mechanism entrance keeps the two circular image entrances: `200px` diameter and `50px` gap on desktop, `140px` diameter and `26px` gap on mobile. Labels use Newsreader `26px/1.4`, reduced to `24px` on mobile. Keep the Bases and Charms destinations.

### About and Journal

Journal article layout uses a maximum `760px` reading column plus a `180–260px` aside, `60px` gap; at 750–989px the aside is `200px` and gap `32px`; at 749px both stack and the aside is no longer sticky.

About retains exactly eight chapters in this order: introduction; meaning of SUIJI; why structure; Core-Lock/system/engineering; Chunyu's first-person story and original portrait; the studio; materials/continued use; mission. Keep the campaign image slot with an approved final2 composition, the founder portrait in chapter five and the other chapter layouts. Only the designer chapter uses the compact portrait identity plus continuous letter exception specified above; preserve the full paragraph order in EN/FR. Engineering refinement copy is shared with the mechanism page, not separately paraphrased into inconsistent claims.

Journal solves a concrete consumer problem with an early usable answer, practical steps/comparisons, clear conditions/units, sources, related reading and one main next action. Keep the six need directions and all approved full EN/FR articles. Evidence/research cards stay internal. Article title, author and dates come from native Shopify data. Tables scroll within their own labeled region; document overflow is a failure.

Journal uses the existing breadcrumb component for Home / The Journal / current article, with matching BreadcrumbList data. Native excerpts remain in list/SEO fields; detail pages preserve their approved body introduction without prepending the same summary again. Related reading uses up to two fixed, same-topic registry links, excluding the current article; when only one other approved guide exists in the topic, show that one rather than add an unrelated link; it does not depend on a random App. Keep one BlogPosting with the actual author and timezone-qualified publication date. A visible reviewed date and dateModified require the same explicitly recorded suiji.content_reviewed_at date/date_time field; otherwise omit both. Article handle comparisons first normalize blog/handle to the short handle. The scoped max-image-preview:large metadata permits larger existing images; it does not promise Discover or justify unrelated pictures. Native Journal tag archives repeat the full guide list, so they use noindex,follow; normal Journal and Article eligibility stays unchanged. This v6.1.9 addition changes shared Journal markup and these scoped shell metadata conditions; visual tokens, fonts and CSS remain unchanged.

Social sharing images follow the same final2 whitelist. The shared social-image helper maps only known current page/product/category contexts to their approved1200px final2 file. Pages without an exact mapping, including image-free Journal articles, use the existing SUIJI logo as neutral brand identification in social metadata; it is not an article feature image or a product photograph. Its actual512×511 dimensions and summary Twitter card are declared. Use an explicit brand image because live pages with an omitted image gained an additional old-image tag after the theme scripts. Verify the corrected live output rather than infer the injection mechanism. Never fall back to a legacy Page/settings image, mutate those native settings, or introduce unrelated imagery. This v6.1.9 fix changes metadata only; layout, CSS, fonts and visible content stay unchanged.

### Native cart, forms and local previews

R107-rendered content must use body class `r107-root` and must not also inherit `suiji-mvp-root`. The legacy `.suiji-mvp-root :is(h1,…,.h1)` selector has greater specificity than the shared display rule and changes Newsreader400 into the old heading family500. Keep this scope boundary in the shared Liquid shell; do not solve it with page-by-page font overrides. Native cart and legacy native product pages stay in their existing branch. Verify computed font family and weight against real Shopify CSS, not only the local preview or loaded-font list.

The native Shopify cart uses the shared header/footer **while retaining Dawn's `10px` root/rem system, forms, line items, totals, scripts and section updates**. Its main wrapper must **not** acquire `.r-site`. Keep exactly one `#cart-icon-bubble` update target, its native SVG wrapper, badge and screen-reader text. Do not replace native commerce with the browser-local preview bag.

The shopping preview is a separate, clearly labeled browser-local flow with no order/payment creation. Real contact uses Shopify's native `contact` form; newsletter uses `customer`, an unchecked required marketing-consent checkbox, and actual server success/error states. Do not display a fake sent/subscribed result. PDF buttons require a real configured URL or an honest unavailable state. Account endpoints remain native.

### Custom-work final-sale notice

Use the single custom-order-policy.json EN/FR source for all custom-design, personalisation or agreed product modifications beyond standard options. Labels are “Custom work · Final sale” and “Sur-mesure · Vente définitive”; scope is change-of-mind returns/exchanges, with statutory faulty/non-conforming goods rights expressly preserved. Listed standard colours/finishes/sizes do not become custom merely by selection. Place the notice before custom enquiry/review actions, in relevant PDP details, Contact, Studio, FAQ, Shipping/returns, About mission, relevant custom-design Journal guides and the shared footer; preserve the written-quote confirmation point. Do not add a prechecked acknowledgement or mark every standard SKU final sale. Shared notice: white background, decorative top rule, margin24px, vertical padding20px, body14px/1.6, label600, detail link13px with44px target. Render-only notices may be appended to relevant custom-design Articles without altering their native bodies, authors or dates. Future custom-work Articles use the custom-work tag. No unrelated native-policy rewrite.

## 6. Media, routing and architecture

White-image rules: retain original foreground geometry, color, engravings, openings and fine edges; background must be #ffffff outside a source-appropriate antialiased boundary. A technical mask pass is not visual acceptance: inspect holes, pale walls, pearls, small links and detached components. Preserve original full-resolution files; serve dimensioned600/1200px WebP derivatives with lazy loading outside the first view. A grey hole or damaged wall blocks that candidate; repair the local mask, never recolor the product to hide the defect. Editorial composition images require composition captions and must not imply a complete sales BOM. Render all final2 white-background photos with contain inside their existing image boxes, including the About banner and split sections; never crop away parts of the product to fit a former campaign image slot.

Availability-driven navigation: this release has four header groups (Core-Lock, Shop All, Gifts, About), and the currently photographed categories. Empty Sets/Bracelets/Accessories product entrances are hidden, while the educational combination route stays available. Category components follow the actual visible catalogue, never restore fixed placeholder cards. Both locale branches must use the same product allowlist.

Shared UI states: use --r-control-border (#7c8992, minimum3:1 against white) for essential form and option outlines. --r-line remains a decorative separator. Preserve existing readable ink/muted/focus colors. Filter controls open one native modal dialog, constrain keyboard focus, scroll the panel on small screens, lock background scroll, and return focus to the trigger on every close path including Escape. Design comparison uses the shared heading font; below600px it is one readable column and long text wraps.

Local selections are named Saved selection / Sélection enregistrée and stay separate from the native shopping bag and its actual quantity. Provide a persistent return link in navigation and the empty native cart; never copy local counts into the native cart badge. Tabs and isolated quick-add controls have minimum44px target boxes. The native cart uses a narrow typography/style bridge under its existing suiji-mvp-root/data-family marker, without r-site inheritance or changes to Dawn IDs, counts or checkout.

Empty selections show one exploration action and hide order/review summaries. Preserve unavailable historic selections and saved design text on the current device; explain unavailable pieces or changed references instead of deleting records or implying a transfer to the native cart. Article CTA links to hidden products lead to an available educational/catalogue route; original Article bodies, dates and authors stay unchanged.

Shopping preview: the final action goes to the existing Contact page with the current local selection prefilled, and sends nothing automatically. Do not link to an unsaved Page or imply that an order/payment exists. Search indexes the visible catalogue's documented EN/FR names, roles, materials and option labels; all query words must match. No-result states offer clear, browse and Contact actions. Do not infer a mineral from appearance.


The photo-publication.json registry is the only source for public product visibility and jewelry imagery. Only final 2.zip white-background derivatives may appear in product galleries, category/navigation cards, editorial figures, search, workspace examples or the preview bag. The existing Chunyu portrait, brand Logo and functional icons are explicit human-approved exceptions. Never use another product or a generic series picture to fill a missing product image. Missing-picture products retain their source records but are absent from lists, search, menus, recommendations and bag additions; old direct links show a readable unavailable state without an image or selection form. Match alt text and captions to visible components; a complete charm assembly must not illustrate a bare base SKU.


- Use one shared renderer and generated template per family, not a hand-built page per SKU. Preserve URLs, identities, native locale roots and query-selected configuration. Bind native internal URLs through `routes.root_url`; do not hardcode an assumed `/fr` root.
- Reserve image dimensions. The first visible main image is eager/high priority; below-fold galleries/cards are lazy. Use existing optimized WebP and CDN derivatives. Do not ship every product gallery or a full private catalogue/IR to the browser.
- Future video uses a poster, controls, `preload=none` and intent-based playback. No grid autoplay, fake play button, new carousel library or heavyweight framework merely to add media.
- AI campaign placeholders remain distinguished from real product geometry, founder portraits and documentary workshop images. Never invent a hidden product angle, manufacturing proof or source identity.
- Production-scale filtering/pagination belongs to a backend catalogue source; do not solve growth by expanding an unbounded client-side data dump. Keep public config an explicit fact allowlist.
- Keep page hierarchy, canonical/alternate metadata and native Article schema consistent with the content actually rendered. A sitemap result or deployed source is not evidence of Google indexation.

## 7. Verification and release

Run `python3 maintenance/rev107/check_design_contract.py` before compilation. It checks the locked stylesheet/font/shell bytes, rejects page-specific style blocks or inline layout overrides (only factual swatch variables are allowed), and checks essential template contracts; it does not claim computed layout or usability. `build_theme.py` also enforces this check. Run portable generation checks and changed-file Theme Check after compilation.

For a layout or shared-style change, verify actual browser widths **360, 390, 768, 1024, 1280 and 1440px** in EN and FR, plus the changed component's breakpoint edges. Assert the actual viewport dimensions in the saved evidence; a mislabeled screenshot is not a pass. Assert actual Newsreader400 H1/display and Manrope body on the native storefront (native cart keeps its existing exception). Check long translated strings, navigation, focus, form/error states, product configuration, guide, complete-the-look and cart behavior as applicable. At 200% zoom verify usable reflow and access to controls. No page overflow or hidden primary action is acceptable.

Publication requires the actual native theme/Page/translation readback and the sole Store writer's publish receipt. Record physical-device, Safari, zoom, video, delivery, payments or performance tests as unverified when they were not performed. Keep test evidence and live theme IDs outside this normative document. A release must not silently change this contract or copy its historical operational numbers into new claims.

## Machine-readable design lock

This lock pins the reviewed visual implementation. Any mismatch stops compilation until the intended change, document and affected-page verification are reconciled. Font and CSS hashes are not a substitute for browser QA.

```json design-lock
{
  "version": "6.1.9",
  "stylesheet": {
    "path": "theme/assets/suiji-r107.css",
    "sha256": "ef03d6ccf8fef4c9dfec3243765241958f741db1e4c29a4226f2aefad0e4ccb6"
  },
  "shell": {
    "path": "theme/layout/theme.liquid",
    "sha256": "4bd2a00e9f9e00de89681ba00558e3e6777650537952d5597112c832e1c24603"
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
    "--r-control-border": "#7c8992"
  },
  "qa_widths": [
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
  "header_groups": 4,
  "footer_groups": 5,
  "about_chapters": 8,
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
  "ring_companion_skus": [
    "OV-SM-AQ-G",
    "OV-HA-AQ-B"
  ]
}
```

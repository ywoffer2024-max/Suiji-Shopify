# SUIJI Design System · v6.3.2

Updated 13 November 2026. This contract applies to the English and French Shopify storefront, including native pages, merchant-managed content, forms and app embeds. The v6.3.0 visual direction is approved for subsequent storefront work. This revision applies the approved direction to catalogue discovery, navigation and product imagery. The implementation lock identifies the Shopify theme source. Deployment evidence belongs in the release archive.

## 1. Authority and change control

1. The latest direct human instruction takes priority, followed by this contract, then the existing component implementation. Reference websites and skills inform a change; they do not replace SUIJI's tokens or introduce a new visual direction.
2. Keep the established white/ice-blue palette, Newsreader/Manrope pairing, image-led layout and restrained rectangular controls. Copy, translations and new catalogue records must use the same components. Do not restyle a page because its text or imagery changed.
3. Values below are required. A `clamp()` is a fixed responsive formula, not permission to select another number. Do not add page-specific font families, arbitrary sizes, new accent colors, shadows, radii or breakpoints.
4. Update the applicable shared component, this document and its machine-readable lock together when an intentional change revises a design rule. State the affected components and verify them on desktop and mobile in English and French. A copy-only change leaves the CSS and font hashes unchanged. Update a locked template's hash only after reviewing its intended change.
5. The maintained Shopify repository's release DESIGN.md is the source of truth. The workspace DESIGN.md is its byte-identical working copy. Native and editorial pages share the shell, colors, typography and media rules. When a generator owns a template, apply durable changes in its source.
6. There is one visual implementation per component across EN/FR. Translation may wrap naturally; it must not select a different font, size, button treatment or page layout.

### Visual direction

- Let approved imagery carry SUIJI's identity. Show the sculptural metal silhouette first, then use a verified view of the Core-Lock connection or an approved worn view to explain what makes the piece distinctive. One lead image or image group owns the main visual emphasis. Keep accompanying typography and controls secondary to the jewelry on shopping surfaces.
- Use white for the header, product photography, shopping controls, long reading and footer. Reserve ice blue for Core-Lock and material explanations, other instructional sections, and the preview notice. The Core-Lock landing page can use its existing charcoal introduction with white text and white image fields. Deep blue serves links, focus and selection on light surfaces. Titanium, gemstones and the photographic light carry the campaign color.
- Give each decision area one primary action. Use plain links or named icons for supporting actions and quiet outlines when the control needs a visible boundary. Use circles for swatches, approved category imagery and functional icons. Keep shopping controls and image frames square, and group related elements with spacing before adding a divider.
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
| `--r-ice` | `#EAF1F5` | Core-Lock and material explanations, instruction and preview notices |
| `--r-ink` | `#202226` | Primary text and action on light surfaces, background of the Core-Lock introduction |
| `--r-muted` | `#626466` | Supporting text |
| `--r-accent` | `#315A73` | Links, focus and selected-state emphasis |
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

Keep product-image fields visually neutral, including pale silver pieces against their light source background. Use the essential control outline on white and ice blue where a visible boundary is required. The two surfaces differ by only 1.14:1, so the surface tint cannot carry a control boundary or a selected state by itself. Use a readable label, underline, outline or check as appropriate.

| Role | Desktop rule | At 749px and below |
|---|---|---|
| Common H1 | Newsreader 400, `clamp(42px,5vw,72px)`, line-height `1.02` | Same formula |
| Compact page H1 | `clamp(40px,4.3vw,60px)` | `40px` |
| Homepage H1 | `clamp(39px,4.55vw,65px)` | `clamp(34px,8vw,47px)` |
| Product H1 | `clamp(40px,4vw,56px)` | `clamp(34px,8.9vw,42px)` with natural wrapping |
| Studio workspace tool H1 | Manrope 500, `28px/1.25` | Same; this tool-header exception does not apply to marketing or article pages |
| Common H2 | Newsreader 400, `clamp(30px,3vw,46px)`, `1.12` | Same formula unless named below |
| About chapter H2 | `clamp(30px,3vw,44px)` | `32px` |
| General H3 | Manrope 500, `20px/1.35` | Same |
| General interface text | Manrope 400, `15px/1.65` | Same; input exception below |
| Filter, budget and sort group labels | Manrope 500, `15px/1.65` | Same, with natural wrapping |
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

Reserve display typography for page titles, editorial chapters and the existing product names and prices. Use the utility role for filtering, budgets and sort controls even when the group label is a semantic heading. Give French titles and labels the room to wrap at the same type size, including on cards and buttons.

Use surface changes to mark the transition from a collection story to shopping. Keep filters, sort, price and product images on a calm neutral field. The header and catalogue use the same color roles across locales. Use white text and a white focus outline on the charcoal Core-Lock introduction. Keep the same underlying product image and lighting as its gallery.

## 4. Layout and responsive boundaries

| Range | Header | Product page | Catalogue | Footer |
|---|---|---|---|---|
| 1280px and above | Inline available-group navigation; height `88px` | Two columns with the gallery wider than the purchase panel | Four columns | Five columns |
| 990–1279px | Drawer; height `76px` | Same two columns | Four columns | Three columns |
| 750–989px | Drawer; height `76px` | Two columns, gap `32px` | Three columns | Three columns |
| 749px and below | Drawer; height `66px` | Single column, gallery then purchase content | Two columns | Two columns; Client care spans the last row |

Other bounded queries are 1280–1399px for compact inline navigation, below 600px for one-column design comparisons, below 360px for header spacing, coarse-pointer hit areas and reduced motion. Do not invent a new device breakpoint for an individual page.

- Header inline padding: `clamp(20px,3vw,56px)`; mobile `20px`, below 360px `16px`. Header icons have `44 × 44px` targets. The separate chevron has a `36px` fine-pointer target and `44px` coarse-pointer target.
- Main sections: `54px` vertical padding and the shared gutter; mobile `36px`. Introduction: `58px` top / `46px` bottom and maximum `1180px`; mobile `36px / 32px`.
- Catalogue grid gaps: `38px 24px`, then `32px 20px` at intermediate widths, then `28px 14px` on mobile. Use the shared card; do not create bespoke card proportions for each page.
- Product columns: gap `clamp(40px,6vw,100px)`, top `20px`, bottom `64px`; 750–989px gap `32px`; mobile top `10px` and gallery bottom gap `28px`. Neither gallery nor purchase column is sticky.
- About chapters use `0.8fr / 1.2fr` columns, a `60px` gap and the existing page edges. The founder note has a compact header with the original uncropped portrait at natural height, up to `220px` wide. Center the heading and founder role vertically beside it with a `40px` gap. All ten approved source paragraphs including the founder role stay in their approved order. The letter begins `32px` below the header and has one continuous reading column at `68ch` and `16px/1.8`.
- At 749px and below, stack the founder-note header with a centered portrait up to `180px`, a `24px` gap, a `32px` heading and a `28px` gap to the letter. Keep the same body size, full text and uninterrupted reading order. The current approved About story controls the section count and order.
- Controls remain rectangular. Do not add pill-shaped buttons/cards, decorative rounded containers or new ambient shadows. Circles are reserved for the two system entrances, category imagery and finish swatches.
- Focus ring: `2px` accent with `4px` offset. Preserve visible hover, selected, disabled, invalid, pending and success states. A status change must be readable without relying on color alone.

### First-screen hierarchy and spacing

| Surface | First-screen composition |
|---|---|
| Home and editorial pages | Use one lead image or group. On the homepage, follow the photography with a short headline and a primary collection link. Keep each caption close to its own image. |
| Shop All, categories, Sets, budget and search results | Use the compact page H1, an optional short introduction and one compact row or group for applicable controls. Align the title, controls and grid to the same page edges. The product grid follows that group directly. |
| Product detail | Give the approved lead view its own stage and keep the product name, price or state, applicable choices and primary action in the established order. Keep the size guide next to sizing and Complete the look next to the main decision. |
| Help and account | Lead with the answer or task. Use the shared reading column, form controls and localized feedback. |

At `1440 × 900` and `390 × 844`, a populated browse result shows a recognizable first product image, its name and either its price or its preview state in the initial viewport after any consent prompt is dismissed. Keep the visual heading for a filter or budget group at utility size, and use section-scale padding between different subjects. Apply the established smaller gaps inside a single group of headings, controls or card details. At other supported widths, allow navigation and French labels to wrap where the component permits while preserving the reading order, visible controls and touch targets.

## 5. Shared component contracts

### Navigation and footer

Use the same SUIJI header and footer across home, catalogue, editorial, product, search, cart and policy routes. Provide Core-Lock & Modular System, Shop All, Sets, Gifts and About SUIJI with the current French labels and working destinations. Keep the shopping bag, search and language switch at consistent entry points. Keep the full Core-Lock label on one line on inline navigation with one underline and one adjacent SVG chevron.

The shared header uses the existing transparent square mark followed by the SUIJI wordmark in one horizontal home link. Use `theme/assets/suiji-logo-mark-180.png` at **25 × 25 px from 750 px** and **24 × 24 px at 749 px and below**, with a **10 px gap** and vertical center alignment. Give the home link a 44 px minimum touch height and an accessible SUIJI name. The dark mark sits directly on the white header. Reserve the black circular badge for circular avatars.

The Shop All / Tous les bijoux disclosure contains six category links in this order across desktop and mobile in both languages. The links are Necklaces, Earrings, Rings, Charms, Bracelets & bangles, and Accessories. Show an approved photograph of a representative item when the category has one. A category awaiting an approved photograph uses its text link in the same slot. Use the same crop and source on desktop and mobile. The top-level Sets / Ensembles link opens the set collection directly. Keep a clickable parent link, separately operated disclosure, fine-pointer hover, click, keyboard access, outside-click close, Escape and focus return. Mobile subcategories open into a right-side panel with Back and Close.

The Core-Lock parent links to its explanation page. Its desktop disclosure and mobile panel use the same two picture links, **Bases / Bases** and **Charms / Ornements**, in that order. The mechanism page reuses those links. The Bases page shows four image-led families for rings, earrings, necklaces and bracelets. Explain where an attachment sits for each family and refer to the exact piece for compatibility and included parts. A temporary wrist-category illustration has a visible bilingual category label and belongs to the guide only.

Gifts / Cadeaux provides a Shop by price / Par budget group in the desktop menu, mobile panel and Gifts page. Use three plain links in ascending order for budgets under €100, €500 and €1,000. Each result uses current positive Shopify prices and a strict upper limit. In a populated result, put the current budget in the page title and show the other budgets and the route back to all gifts as compact utility links near the grid. Use the shared catalogue cards and price formatting. The Gifts landing page keeps the first product cards immediately below its compact budget links.

The footer order is **Shop → How it works → About SUIJI → Create with us → Client care**, followed by legal/privacy controls. Desktop gap `28px`; intermediate `32px 36px`; mobile `32px 24px`. Headings `14px`, links `13px` desktop / `14px` mobile, minimum link targets `36px` / `44px`. Legal text `12px`. Keep each group focused on destinations shoppers need. Let secondary story, account and creator links live on their relevant landing pages.

### Homepage photography

- Lead with one editorial image group. The desktop composition pairs an approved view of jewelry assembled and separated with an approved Core-Lock or material close-up. On mobile, show the lead composition at a size that preserves each component's silhouette. Keep the current image source and its component labels accurate when artwork changes.
- Follow the images with a short headline, a concise description and one primary collection link. The headline and link are visible at `1440 × 900` and `1280 × 720` in both languages. Keep assembly, compatibility and included pieces clear in the Core-Lock explanation below.

### Catalogue cards and set previews

- Use the shared **4:5** white image frame for product cards on desktop and mobile. Keep the whole silhouette inside it and use the same frame proportions across the row.
- Keep image edges and the leading edges of names and prices aligned across a row. Place the verified variant price just below its own name and keep the preview or availability note separate. Give a longer localized name the space it needs before placing the next card. Keep the name and price visible independently of hover.
- Review the actual jewelry silhouette inside the frame at desktop and mobile sizes. Keep the full outline and make the intended detail legible, especially for small charms and accessories shown beside larger pieces. Where the source has excess exterior white margin, use approved display framing for that view. Preserve the original file, zoom source, aspect ratio and any size reference. Apparent size across unrelated card images carries no product dimension claim.
- On shared commerce cards, use 78% of the measured ring cover scale and centering offsets. The current ring silhouettes occupy about 56% of the image field width. Apply the same framing on desktop and mobile.
- A public product card opens the exact native product detail with its shown variant selected. A single activation works on mouse, keyboard and touch. Use the same destination in search, recommendations, gifts, homepage cards and category grids. Products enter these shopping surfaces when their image, native identity and positive Shopify price are confirmed.
- Keep the approved packshot as the default. When an approved wearing illustration is available for that exact SKU and finish, reveal it on fine-pointer hover or keyboard focus and add it after the packshots in that variant’s gallery. Label the gallery view as a wearing illustration. For a variant awaiting its own approved wearing illustration, keep its packshot on hover and focus.
- Record the native handle, SKU, approved view and display framing together. Frames trim exterior whitespace and keep the full jewelry silhouette. Responsive image sizes account for the effective display scale, so framing still uses sufficient source resolution. The Core-Lock menu illustrates the base types and shows a separate verified charm example. Withdrawn imagery stays outside public cards, navigation, gallery payloads and recommendations until the replacement is approved.
- Set previews use the authorized component photos and identify them as selected components. Use the shared desktop column counts. At 590px and below, keep one set per row so that the separate components remain legible. Keep the images, set name and verified price together. The set page lists exact included parts, quantities and supported ways to wear them from the approved set record. A component image represents only the piece it depicts. Use a verified assembled image when showing an assembled set.

### Product, complete the look and size guide

Start with the shared breadcrumb and gallery, then the localized product name and price or preview/availability state. Follow with applicable finish and size, size help, sale unit where needed, and the primary action. Complete the look follows the main choice and precedes product details and service notes. Each step has a single visual priority. Use the same publicly approved product identity across cards and detail pages. Market formatting and actual variant pricing come from Shopify.

On desktop, place the thumbnail rail to the left of the main image. On mobile, place thumbnails below the image. The first product image, product name and price or availability state must fit in the initial `390 × 844` viewport. The first image shows the whole piece, and additional images show distinct details such as the clasp, band or interior. An approved same-product worn image can follow the first image to show scale. Changing finish or size updates the image to the corresponding approved variant media.

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

**Complete the look** lives in the purchase column, before the detail tabs. Bases link to compatible charms and charms link to compatible bases. Show up to two verified companions with their exact native variant, approved image and Shopify price. Where a compatible product is awaiting publication or price confirmation, link to the matching Core-Lock guide. Use a minimum 44px target.

The mechanism entrance uses two circular image links with a `200px` diameter and `50px` gap on desktop, and up to `140px` diameter with a `26px` gap on mobile. The editorial hero pairs a leading text column with the links at 990px and above, then stacks the links below the introduction. Keep both links inside the content edge at narrow widths. Labels use Newsreader `26px/1.4`, reduced to `24px` on mobile. The introduction names the three parts in order: the base you wear, the clasp that connects, and the charm you choose. One charm can move between bases with the matching connection. State compatibility and contents separately. Keep the established fit guide and operating instructions accessible.

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

White-background photos retain the original geometry, color, engravings, openings and fine edges. The background is `#FFFFFF` outside the antialiased boundary. Inspect holes, pale walls, pearls, small links and detached components after masking. Repair local masking faults while preserving product color. Preserve full-resolution sources and use dimensioned 600px and 1200px WebP derivatives where the photo registry supplies them. Editorial composition captions identify what is shown. Use `contain` and keep the complete jewelry silhouette inside its frame, including in the About banner and split sections.

| Image role | View and information |
|---|---|
| Category tile and product card | Use an approved final display angle. For a single-product card, reuse an angle present in that product's final gallery and show the same subject and finish as the listing. |
| Product gallery | Lead with the approved front or three-quarter view that best identifies the piece. Use additional views to show a different fact such as the mechanism, profile, texture or wearing scale, when approved imagery exists. |
| Set preview | Use the set's approved component views, with the component label adjacent to the images. Keep the full outlines and preserve the connection between the image and the exact set record. |
| Editorial or instructions | Use an approved worn view, a verified assembly or a labeled detail as appropriate to the subject. Put fit, dimensions and compatibility in readable text where verified. |

Availability-driven navigation uses the latest approved category and media list. Category entrances remain navigable where there is a working collection or explanatory landing. Hold unreviewed products and media at their own visibility level. Keep the same category names and links in both menus.

Shared UI states: use --r-control-border (#7c8992, minimum3:1 against white) for essential form and option outlines. --r-line remains a decorative separator. Preserve existing readable ink/muted/focus colors. Filter controls open one native modal dialog, constrain keyboard focus, scroll the panel on small screens, lock background scroll, and return focus to the trigger on every close path including Escape. Design comparison uses the shared heading font; below600px it is one readable column and long text wraps.

Local selections are named Saved selection / Sélection enregistrée and stay separate from the native shopping bag and its actual quantity. Provide a persistent return link in navigation and the empty native cart; never copy local counts into the native cart badge. Tabs and isolated quick-add controls have minimum44px target boxes. The native cart uses a narrow typography/style bridge under its existing suiji-mvp-root/data-family marker, without r-site inheritance or changes to Dawn IDs, counts or checkout.

Empty selections show one exploration action and hide order/review summaries. Preserve unavailable historic selections and saved design text on the current device; explain unavailable pieces or changed references instead of deleting records or implying a transfer to the native cart. Article CTA links to hidden products lead to an available educational/catalogue route; original Article bodies, dates and authors stay unchanged.

Shopping preview: the final action goes to the existing Contact page with the current local selection prefilled, and sends nothing automatically. Do not link to an unsaved Page or imply that an order/payment exists. Search indexes the visible catalogue's documented EN/FR names, roles, materials and option labels; all query words must match. No-result states offer clear, browse and Contact actions. Do not infer a mineral from appearance.


Use the `photo-publication.json` registry for public single-product visibility and approved `final 2.zip` derivatives. The specifically authorized Shopify set previews use their approved set records and component media. The existing Chunyu portrait, brand logo and functional icons are approved exceptions to the product-image source. Match captions and alt text to the components actually visible. A bare-base listing depicts the base on its own. Products awaiting their own approved imagery retain their source records and stay out of listings, search, menus, recommendations and bag additions. Show only the readable unavailable state on their old direct links.


- Use one shared renderer and generated template per family, not a hand-built page per SKU. Preserve URLs, identities, native locale roots and query-selected configuration. Bind native internal URLs through `routes.root_url`; do not hardcode an assumed `/fr` root.
- Reserve image dimensions. Give the first homepage or product gallery image eager loading and high priority. Use the existing 600px and 1200px WebP files for the same approved source. Match responsive source sizes to the hero and gallery layout. Keep the full-size URL and update both source attributes when the gallery selection changes. The zoom dialog uses the selected 1200px image. Keep below-fold galleries and cards lazy and the public catalogue allowlist scoped.
- Future video uses a poster, controls, `preload=none` and intent-based playback. No grid autoplay, fake play button, new carousel library or heavyweight framework merely to add media.
- AI campaign placeholders remain distinguished from real product geometry, founder portraits and documentary workshop images. Never invent a hidden product angle, manufacturing proof or source identity.
- Production-scale filtering/pagination belongs to a backend catalogue source; do not solve growth by expanding an unbounded client-side data dump. Keep public config an explicit fact allowlist.
- Keep page hierarchy, canonical/alternate metadata and native Article schema consistent with the content actually rendered. The legacy News index points to the Journal in the active market. Its historical articles retain their own canonicals. A sitemap result or deployed source is not evidence of Google indexation.

## 7. Verification and release

Run `python3 maintenance/rev107/check_design_contract.py` from the release directory before preparing a Shopify patch. The checker verifies the design token values, reviewed source bytes, state wiring and required template boundaries. Run Shopify Theme Check on the resulting theme and compare changed-file errors with the same baseline.

To verify the saved design and synchronized documentation, add `--approved-preview /path/to/index.html --workspace-copy /path/to/DESIGN.md` to the same command. The checker verifies the approved preview bytes, square-mark asset and dimensions, the card image ratio and byte equality of the two documents. Visual acceptance still requires the browser matrix below.

For a layout or shared-style change, verify actual browser widths **320, 360, 390, 768, 1024, 1280 and 1440px** in EN and FR, plus the changed component's breakpoint edges. Assert the actual viewport dimensions in the saved evidence; a mislabeled screenshot is not a pass. Assert actual Newsreader400 H1/display and Manrope body on the native storefront (native cart keeps its existing exception). Check long translated strings, navigation, focus, form/error states, product configuration, guide, complete-the-look and cart behavior as applicable. At 200% zoom verify usable reflow and access to controls. No page overflow or hidden primary action is acceptable.

For a storefront-visible design change, compare before and after on the affected surface at the same viewport and state. Inspect the first visual focus, the largest empty gap, the actual jewelry silhouette and the first name/price or action at the two first-screen sizes above. On image grids, include the longest French title and representative small and large pieces when present. Content, product-data and image-only changes use the same contract and verify the affected presentation and linked destination.

Publication requires the actual native theme/Page/translation readback and the sole Store writer's publish receipt. Record physical-device, Safari, zoom, video, delivery, payments or performance tests as unverified when they were not performed. Keep test evidence and live theme IDs outside this normative document. Keep the template matrix in release evidence, including home, catalogue and filter, preview and native product, search, cart, About, Core-Lock, Journal, contact, help and empty/error states. Validate normal text at 4.5:1 and required control boundaries and focus at 3:1. Do not label physical device or payment behavior as verified based on fixture tests.

### Local versions and phone controls

A local version keeps its text and identity when an example is retired. Display the unavailable reference as text and let the visitor choose a current example before saving or preparing a new review. Comparing two versions keeps both briefs readable. Loading a different version clears the previous in-memory upload so that a reference cannot carry over by mistake.

Before deleting a version, name it and ask for confirmation. Cancel leaves the record and focus in place. Escape cancels an in-progress rename. An on-page making-review draft must report whether the browser actually saved it, and offer copying as the recovery path when local storage is unavailable.

Use named groups of native toggle buttons for Studio input modes and design-example stages. Each button exposes its pressed state and responds to Tab, Enter and Space. Editable version names, saved quantities and catalogue sorting controls use at least 16px text and a 44px height on small or coarse-pointer screens. Catalogue sorting uses an explicit 44px height at these widths to preserve the touch target in Safari while retaining the native select. Secondary controls use the essential control border. Scrollable overlays contain scrolling within their own panel.

## Reference patterns

- Product-led hierarchy, factual dimensions and service access are informed by [Tiffany HardWear](https://www.tiffany.com/jewelry/necklaces-pendants/tiffany-hardwear-small-link-necklace-60964882/) and [Boucheron Quatre](https://www.boucheron.com/us/quatre-classique-small-ring-classique-jrg00290.html).
- The approved image hierarchy draws on [JENNY BIRD's editorial homepage](https://jenny-bird.com/), [earring catalogue](https://jenny-bird.com/collections/earrings) and [Boston Square Ring gallery](https://jenny-bird.com/products/boston-square-ring-gold). The modular terminology is informed by [Marla Aaron's jewelry guide](https://marlaaaron.com/en-ca/pages/guide-to-our-jewelry).
- The restrained component vocabulary and editorial spacing draw on the public third-party [Cartier DESIGN.md](https://www.shadcn.io/design/cartier), [Aesop DESIGN.md](https://www.shadcn.io/design/aesop/raw) and [REI Cedar's spacing guidance](https://cedar.rei.com/guidelines/spacing).
- Product option behavior and image loading follow [Shopify variant guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants), [Shopify theme performance guidance](https://shopify.dev/docs/storefronts/themes/best-practices/performance) and [Baymard product page research](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux).
- Follow [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for reflow, focus, contrast, name and state and live messages. SUIJI uses the above 44/48px control targets as its own design minimums.

## Machine-readable design lock

The approved preview pins the v6.3.0 design. The stylesheet, shell, fonts and component hashes pin the last verified theme implementation. Update the affected component, its reviewed hashes and browser evidence together when implementing the approved direction. A preview review is evidence for the design version.

```json design-lock
{
  "version": "6.3.2",
  "implementation_version": "6.3.2",
  "approved_preview": {
    "sha256": "6e28e3e61d6effec39fd36c7c8777d09bb5e85471d3b7c794ccb75b0277cdc92",
    "header_mark": {
      "path": "theme/assets/suiji-logo-mark-180.png",
      "sha256": "ba584826be88c04148cf144f7c2bb7bc0074cfec3cd2e1b35246d852665b4679",
      "desktop_size_px": 25,
      "mobile_size_px": 24,
      "gap_px": 10
    },
    "catalogue_image_ratio": "4/5"
  },
  "stylesheet": {
    "path": "theme/assets/suiji-r107.css",
    "sha256": "00e385b7404f15d826dec3a4d9bf267c0ca5da58a5c368c807c8c0605425a40a"
  },
  "shell": {
    "path": "theme/layout/theme.liquid",
    "sha256": "2f24e0e9ba65781d1fadfe8aaef904257486a6656920ec2a2cdd616bd609eb06"
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
      "sha256": "83cf90d83202a7a2d23eb32d679d0ddede80557df41486367f91f700bb7fca1f"
    },
    {
      "path": "theme/assets/product-info.js",
      "sha256": "580dd071261e0c4389bb167267bcc5044b2c315f46d2bb744fb786cd6f527efd"
    },
    {
      "path": "theme/assets/media-gallery.js",
      "sha256": "43fcc73d3714a50138e4b7e51bf7620f5e1e5ba2ba9d30d29eaf48f7a600dc87"
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
      "sha256": "0e6a1393fde7dcfd6441c31a477814ea826dad18d71979d2db24db44d6ef4657"
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
      "sha256": "36321c60aca29bcdef8ba886b206bb2ce8faa1ff3a093571b69bac5b14671d45"
    },
    {
      "path": "theme/snippets/product-media-gallery.liquid",
      "sha256": "e98e787d199b913ab580a94f81eed0607635534134761077ec54fb7395fbe20f"
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
    },
    {
      "path": "theme/assets/global.js",
      "sha256": "d05356923b4183c55bd9d175f05c893f78bf7faa229f5f125b387e43862288ab"
    },
    {
      "path": "theme/sections/main-collection-product-grid.liquid",
      "sha256": "75e8c8cebe7d7a9683f59d15cfd1840f0c1faa6288f24b095016e8527782ad05"
    },
    {
      "path": "theme/snippets/suiji-r107-header.liquid",
      "sha256": "598b433953f8946d70862856ebc3ee39ca46e529c86f3a7ff8e2237152c4bc28"
    },
    {
      "path": "theme/snippets/suiji-r107-home.liquid",
      "sha256": "72ed3e78ac101111b39f5e370a122f63a25cb3afdde84f38cfcdecb251cd5ce7"
    },
    {
      "path": "theme/snippets/suiji-r107-wordmark.liquid",
      "sha256": "61af079b2205e6d50c121d9ebfe1312b851ee1580f73fedf7057694f0ee70c1a"
    },
    {
      "path": "theme/snippets/suiji-r107-home-hero.liquid",
      "sha256": "bfc2a2708be16612935180b7e466c6800d6a0e72e0cadb085c8af5c969714967"
    },
    {
      "path": "theme/snippets/suiji-storefront-card.liquid",
      "sha256": "fd738f54d98393f2689d9dd1ee33a2af7da178e0fec97ba5ad93f603f1a3f9cb"
    },
    {
      "path": "theme/snippets/suiji-storefront-cover.liquid",
      "sha256": "6ccd13ea0843ef0d4b2ba851d2c871c0f207e9c3f5c9f3132e946f85a0f2d5c4"
    },
    {
      "path": "theme/snippets/suiji-storefront-cover-image.liquid",
      "sha256": "58144180bf8485160dad50ef4311e48fffd460b974c8ee649be229e40df6098f"
    },
    {
      "path": "theme/snippets/suiji-shop-all-photo.liquid",
      "sha256": "cb06f7155dbb0cef1e11085d6702f3adb131c7187a73c0aafc641fba32ebfbe3"
    },
    {
      "path": "theme/snippets/suiji-core-system-links.liquid",
      "sha256": "af6acaa2f0929d8c2a2366fc0305e1ab6ea2a83cf66903e06516aa606723fe6e"
    },
    {
      "path": "theme/snippets/suiji-shop-mega-menu.liquid",
      "sha256": "a087e80fdc2447378ac9cb9297fa6d26d2fce0b29572c40d5194ece38aa8b0a2"
    },
    {
      "path": "theme/snippets/suiji-gifts-menu.liquid",
      "sha256": "1e459bb0559365898c69e5ab140f9e9293d2dcd5db7dc64bc4315b3a7d5113c7"
    },
    {
      "path": "theme/snippets/suiji-r107-gifts.liquid",
      "sha256": "42f07a1f5dafd3ce62d098eb4ce30ead67a8e66eb94ec16020cd3b91a308c1e9"
    },
    {
      "path": "theme/snippets/suiji-r107-footer.liquid",
      "sha256": "44b1085d674652c4e39846a627172eb6787f8f1e1618bb5bb50e3dea3a5513c6"
    },
    {
      "path": "theme/snippets/suiji-native-pairing.liquid",
      "sha256": "398e6ab6c77722e10dab65f192499af9898bf5d62858b65c4e44948da755619f"
    },
    {
      "path": "theme/snippets/suiji-reviewed-variant-media-ids.liquid",
      "sha256": "ae026d4fd8106b5b3cb7f24725075fcdf237b776ee0f56684b64d2c11ca01e6a"
    }
  ]
}
```

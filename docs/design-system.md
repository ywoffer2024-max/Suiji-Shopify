# SUIJI 随己 · 网站设计系统 (Web Design System)

> 本文件是 **SUIJI 官网（Shopify / Dawn 主题）的视觉宪法**。
> 它把品牌 VI（《SUIJI 随己：品牌视觉与产品设计指南》）翻译成**网页可落地**的设计令牌、组件规范与 Dawn 主题配置值。
> VI 是为「产品 / 生产 / 营销」写的；本文件是为「网站」写的。两者冲突时，以 VI 的**品牌精神**为准、以本文件的**网页执行**为准。
>
> 关联文件：`docs/brand-vi-reference.md`（VI 纯文字版，便于检索）。
> 适用范围：首页、集合页、产品页、内容页、邮件/弹窗等所有店面物料。

---

## 0. 一句话定位（贯穿全站的北极星）

- **品类**：当代结构美学首饰（Contemporary Structural Jewelry）——**不是**轻奢、**不是**配件、**不是** DIY。
- **信条**：**Fluidity in Form, Strength in Structure**（形之流动，构之坚定）。
- **差异**：别人卖款式，我们卖**结构**；别人追潮流，我们建**秩序**。
- **机制即卖点**：一枚花饰，10 秒快拆，戒指 / 吊坠 / 耳环之间自由切换——**"万象，皆由你"**。
- **网页第一目标**：让访客在首屏 5 秒内理解「**一件 → 多形态**」这一可转换机制，并感到「现代艺术馆」般的冷峻精密感。

> 检验任何页面/组件的唯一问题：**它是否在帮 Emma 在清晨 7:40 完成一次"状态切换 (State Transition)"？** 否则删掉。

---

## 1. 设计原则（VI 三原则 → 网页）

| VI 产品原则 | 网页设计原则 | 落地动作 |
|---|---|---|
| 形式追随功能 | **信息追随任务** | 每个 section 只服务一个用户决策；删掉装饰性区块 |
| 少即是多 | **留白即奢侈** | 大面积负空间（留白），低密度排布，一屏一焦点 |
| 让结构可见 | **让结构成为视觉资产** | 用细发丝线 (hairline)、网格、转轴/搭扣微距图强调"构件"；不用花纹、不用渐变装饰 |

**全局禁忌（网页版"反向咒语"）**：
高光镜面 / 亮面电镀 / 土豪金；圆润可爱风；荧光色、高饱和霓虹、少女粉；投影堆叠、玻璃拟态、卡通插画、强渐变背景；"DIY / 小五金 / 平替 / 配件 / 高性价比"类文案。

---

## 2. 色彩系统 (Color)

### 2.1 品牌色板（来自 VI 第 7.2 节）

| 名称 | HEX | 角色 |
|---|---|---|
| 钛本色 Titanium | `#A0A0A0` | 主色调 / 发丝线、分割线、次级图标 |
| 深钛灰 Deep Titanium | `#6B6B6B` | 结构强调色 / 次级文字、结构色块 |
| 梅子色 Plum | `#6B3A5A` | **情感点缀（唯一暖色）**：情感区块、收藏/心愿、营销高亮 |
| 混凝土灰 Concrete | `#8C8C8C` | 背景中性色 / 说明文字、占位（**勿作大块底色配白字**，对比不足） |
| 哑光白 Matte White | `#F5F5F0` | 主画布底色 / 留白、文字背景 |

可选（欧洲线特别物料）：钛蓝 `#4A6B8A`、极光蓝 `#AFDCEF`、缎面金 satin gold（VI 未给值，**暂定** `#B7A179` 哑光低饱和，**待确认**——务必避开"土豪金亮面"）。

### 2.2 网页功能性补色（VI 未定义，为可读性新增）

VI 色板全是中灰，直接做正文会**对比度不足（不达 WCAG AA）**。为此引入一支冷调近黑作为**文字/界面墨色**，取自 VI 模特穿搭中的「深炭灰 Charcoal」，保持冷调家族一致：

| 名称 | HEX | 用途 | 理由 |
|---|---|---|---|
| 墨钛黑 Ink | `#1C1D21` | 正文、标题、主按钮、图标 | 冷调近黑，于 `#F5F5F0` 上对比 ≈16:1（AAA） |
| 画布白 Canvas | `#F5F5F0` | 主背景 | = 哑光白 |
| 纯白 Pure White | `#FFFFFF` | 卡片/抬升层 | 与画布白形成无投影的"层次差" |

### 2.3 Dawn 配色方案映射（直接写入主题）

Dawn 用 5 个 color scheme 驱动全站。建议如下（含每个槽位 HEX）：

| Scheme | 用途 | background | text | button | button_label | secondary_button_label |
|---|---|---|---|---|---|---|
| **scheme-1** 画布（主） | 多数页面、产品网格背景 | `#F5F5F0` | `#1C1D21` | `#1C1D21` | `#F5F5F0` | `#1C1D21` |
| **scheme-2** 卡片/抬升 | 产品卡、浅色子区块 | `#FFFFFF` | `#1C1D21` | `#1C1D21` | `#FFFFFF` | `#1C1D21` |
| **scheme-3** 美术馆（深） | 首屏 Banner、整幅编辑图、页脚 | `#20232B` | `#F5F5F0` | `#F5F5F0` | `#20232B` | `#F5F5F0` |
| **scheme-4** 梅子（情感） | 品牌故事 / NFC「数字日记」/ 订阅 | `#6B3A5A` | `#F5F5F0` | `#F5F5F0` | `#6B3A5A` | `#F5F5F0` |
| **scheme-5** 钛构（强调带） | 材质/结构说明带（**仅大字**） | `#6B6B6B` | `#F5F5F0` | `#F5F5F0` | `#6B6B6B` | `#F5F5F0` |

所有 scheme 的 `background_gradient` 留空（品牌禁渐变），`shadow` 用 `#1C1D21`。

### 2.4 用色纪律

- **主 CTA（加入购物车 / Shop）= 墨钛黑**，不是梅子色——下单是"结构性功能动作"，保持中性精密。
- **梅子色只用于情感触点**：心愿/收藏、情感故事区、邮件订阅、促销徽章；全站占比 < 5%。
- 中灰（钛本色/混凝土灰）**只做线、字、图标**，不做"大块底色 + 白字"（对比不足）。
- 深色区块（scheme-3/4/5）正文一律用 `#F5F5F0`，禁止纯白晃眼。
- 可达性：正文最低 4.5:1，大字 3:1；scheme-5 仅用于标题/大字（≈5:1）。

---

## 3. 字体系统 (Typography)

### 3.1 VI 意图 → 网页双字体角色

VI 规定两套字体：**系统名词/标题 = 几何无衬线（精准、工业秩序、大间距）**；**品牌故事/正文 = 法式衬线（Vogue 般人文温度）**。网页沿用此二分：

| 角色 | VI 指定 | 网页推荐（Shopify 字库） | 备选 / 回退 |
|---|---|---|---|
| 标题 / 系统名词 / 导航 / 价格 / 按钮 | Optima · Futura · Helvetica Neue Extended | **Archivo**（略带 expanded 的工业感无衬线） | Jost（Futura 风）→ 系统无衬线 |
| 正文 / 品牌故事 / 引语 | Cormorant Garamond · Didot | **Cormorant Garamond**（法式衬线） | EB Garamond → Georgia |

> Dawn 仅有 2 个字体槽：`type_header_font` = Archivo；`type_body_font` = Cormorant Garamond。
> **网页适配判断**：电商正文（价格、导航、按钮、表单）用衬线会伤可读性。故用一小段自定义 CSS，把**导航、按钮、价格、表单**改回 Archivo（= "系统名词"应是无衬线），**仅正文/故事散文保留 Cormorant 衬线**。这正好还原 VI 的"系统名词 vs 品牌故事"分工。
> 上线前在主题编辑器字体选择器**确认字体名是否可选**；若 Archivo 不可选，用 Jost。

### 3.2 字阶 (Type Scale, 桌面 / 移动)

| Token | 字体 | 字号 桌面/移动 | 字重 | 行高 | 字距 Tracking |
|---|---|---|---|---|---|
| Display / H0 | Archivo | 64 / 40 px | 600 | 1.05 | +0.01em |
| H1 | Archivo | 44 / 30 px | 600 | 1.1 | +0.01em |
| H2 | Archivo | 32 / 24 px | 600 | 1.15 | +0.01em |
| H3 | Archivo | 22 / 19 px | 500 | 1.2 | +0.02em |
| Eyebrow / 标签 | Archivo | 12 / 12 px | 600 | 1.2 | **+0.16em，大写** |
| 导航 / 按钮 | Archivo | 14 / 14 px | 500 | 1 | +0.08em，大写 |
| 正文 Body | Cormorant Garamond | 18 / 17 px | 500 | 1.7 | 0 |
| 引语 Quote | Cormorant Garamond | 26 / 22 px | 500 *italic* | 1.5 | 0 |
| 说明 Caption | Archivo | 12 / 12 px | 400 | 1.4 | +0.02em |
| 价格 Price | Archivo | 16 / 16 px | 600 | 1 | +0.02em（tabular 数字） |

要点：
- **大间距（tracking）是品牌签名**——eyebrow/导航/按钮大写 + 宽字距，传达"工业秩序"。
- Cormorant 偏细，正文基准放大到 **17–18px、行高 1.7**，保证屏幕可读。
- Dawn `heading_scale = 100`、`body_scale = 110`（正文略放大以适配衬线）。

### 3.3 多语言

店面主语言英文（€ 定价、欧洲线），品牌名保留中文「随己」。中文字符 Cormorant 无字形，正文 CSS 回退到 `"Noto Serif SC", serif`；标题中文回退 `"Noto Sans SC", sans-serif`。Logo 处「SUIJI 随己」中英并置，中文用思源/Noto。

---

## 4. 组件与 UI 令牌 (Components → Dawn 设置)

核心调性：**锐利、扁平、发丝线、零投影**（工业精密，拒绝圆润与拟物）。

### 4.1 按钮 Buttons
- 圆角 `buttons_radius = 0`（直角=建筑感）。
- 主按钮：墨钛黑填充 + 画布白字；次按钮：1px 墨钛黑描边 + 透明底。
- 边框 `buttons_border_thickness = 1`，`buttons_border_opacity = 100`。
- **零投影** `buttons_shadow_opacity = 0`。
- 文案大写 + 字距 +0.08em。Hover：轻微反色或 88% 透明，**无位移、无阴影**。

### 4.2 产品卡 Cards
- `card_style = "standard"`，`card_color_scheme = "scheme-2"`（白卡浮于画布白 → 无影分层）。
- `card_corner_radius = 0`、`card_shadow_opacity = 0`。
- `card_border_thickness = 1`、`card_border_opacity = 12`（**发丝线**呼应"结构可见"）。
- `card_text_alignment = "left"`，`card_image_padding = 0`（图满幅）。
- `collection_card_*` / `blog_card_*` 同上保持一致。

### 4.3 输入框 / 变体药丸 Inputs & Variant Pills
- `inputs_radius = 0`、`inputs_border_thickness = 1`、`inputs_shadow_opacity = 0`。
- 变体药丸 **`variant_pills_radius = 0`**（从默认 40 改为 0，去掉"药丸感"，改为结构方块）。选中态：墨钛黑描边/填充。

### 4.4 图片 / 媒体 Media
- `media_radius = 0`、`media_shadow_opacity = 0`、`media_border_thickness = 1`、`media_border_opacity = 5`（极淡发丝线）。

### 4.5 徽章 Badges
- `badge_corner_radius = 0`（默认 40 → 0，方形徽章更结构化）。
- 促销徽章 `sale_badge_color_scheme = "scheme-4"`（梅子=情感/紧迫）；售罄 `scheme-3`。

### 4.6 阴影哲学
全站 **shadow opacity = 0**。层次靠"底色差（画布白 vs 纯白）+ 发丝线 + 留白"实现，不靠投影。静奢=扁平。

---

## 5. 布局与间距 (Layout & Spacing)

- 页宽 `page_width = 1200`（保留 1200；靠留白而非铺满营造画廊感。如需更阔编辑感可试 1400，但先 1200）。
- 网格留白 `spacing_grid_horizontal = 8`、`spacing_grid_vertical = 8`（保持；卡片间留呼吸）。
- 区块间距 `spacing_sections = 0`，由各 section 自身的上下 padding 控制节奏（整幅深色区块可贴合无缝；浅色区块用大 padding ≈ 80–112px 桌面 / 48–64px 移动）。
- **节奏**：深↔浅交替（scheme-3 深 → scheme-1 浅 → scheme-4 梅子），制造"现代艺术馆"的展陈反差。
- Logo：`logo_width ≈ 100`，两侧保证充足 Clear Space（奢侈品呼吸感）。

---

## 6. 影像与艺术指导 (Imagery / Art Direction)

> 影像是本品牌最贵的资产，规范直接决定网站质感。全部来自 VI 第 7.4 / 8.3 节。

- **背景空间**：粗粝天然原石、洞石 (travertine)、清水混凝土；摒弃纯色棚拍。营造"现代艺术馆"冷峻氛围。
- **光影**：指向性**硬侧光 (side light)**，打出明暗交界线（chiaroscuro），凸显哑光拉丝肌理。
- **镜头**：大量**微距特写**展示搭扣闭合的工艺缝隙、转轴、铰链——结构即装饰。
- **佩戴氛围**：法式慵懒 (Effortless Chic)，真实皮肤纹理、白衬衫/羊绒；妆发"法式伪素颜"。
- **模特配色**：燕麦 (Oatmeal)、深炭灰、冷调白、纯黑——给首饰留绝对焦点。
- **网页比例**：首屏 banner 16:9 / 全幅；产品卡 `image_ratio` 用 **"adapt"** 或统一 4:5；编辑图 4:5 竖图；微距正方 1:1。
- **必做**：哑光、冷调、高反差侧光、留白构图。
- **禁止**：高光镜面/亮面金、柔焦糊图、暖黄滤镜、杂乱多彩背景、贴纸感装饰、卡通插画。
- AI 出图可复用 VI 第 9 章的 System Prompt 与反向咒语生成"氛围测试图 / 爆炸图"，**不可当工程图**。

---

## 7. 动效与交互 (Motion & Interaction)

- `animations_reveal_on_scroll = true`（滚动渐入，克制、缓速）。
- `animations_hover_elements = "none"`（默认无；如需生命力，卡片用极轻 `vertical-lift`，**绝不加阴影**）。
- 调性：少、慢、精准；缓动用 ease-out，时长 200–400ms。
- **「咔哒 (Click)」微交互（增强项，后续自定义）**：加入购物车 / 切换变体时，做一个极短的"结构咬合"微动效（轻微 1–2px 位移或缩放回弹），呼应品牌听觉 Logo 的机械咬合感；可选轻音效，默认静音。

---

## 8. 文案语气 (Voice & Tone)

**词汇红绿灯**（VI）：
- 🚫 绝对禁用：DIY、小五金、平替、配件、高性价比、cute、cheap、hack。
- ✅ 核心高频词：Curated（策展）、Fluidity（流动性）、State Transition（状态切换）、Architectural Minimalism（建筑极简）、Canvas（私人底色）、Structure / Order / Engineered。

语气：冷静、精准、克制、自信；像建筑说明书遇见法式时尚杂志。短句 + 偶尔一句富诗意的衬线引语。

网页文案示例（英文优先）：
- 首屏标题：**“One Piece. Every Form.”** / 副标：*Fluidity in form, strength in structure.*
- 机制区块：**“A flower unclips from your earring and locks onto a ring base — in 10 seconds.”**
- CTA：`SHOP THE SYSTEM` · `EXPLORE THE MECHANISM` · `BUILD YOUR FORM`（避免 "Buy now / Shop accessories"）。
- 材质区块：**“Grade 5 titanium. Matte, brushed, anodized. The structure is the decoration.”**
- 情感区块（梅子）：*"Every touch, a reunion with a moment."*（NFC「记忆之匣」）。
- 关于页定位句：**别人卖款式，我们卖结构。** / *We don't sell styles. We engineer structures.*

---

## 9. Dawn 主题落地清单 (Implementation Map)

> 把第 2–7 节转成可直接写入 `config/settings_data.json`（或在主题编辑器对应处设置）的值。这是下一步「装修」的执行底稿。**改前先备份并走 git。**

```jsonc
// color_schemes（5 套，HEX 见 §2.3）
"scheme-1": { background:"#F5F5F0", text:"#1C1D21", button:"#1C1D21", button_label:"#F5F5F0", secondary_button_label:"#1C1D21", shadow:"#1C1D21", background_gradient:"" }
"scheme-2": { background:"#FFFFFF", text:"#1C1D21", button:"#1C1D21", button_label:"#FFFFFF", secondary_button_label:"#1C1D21", shadow:"#1C1D21", background_gradient:"" }
"scheme-3": { background:"#20232B", text:"#F5F5F0", button:"#F5F5F0", button_label:"#20232B", secondary_button_label:"#F5F5F0", shadow:"#1C1D21", background_gradient:"" }
"scheme-4": { background:"#6B3A5A", text:"#F5F5F0", button:"#F5F5F0", button_label:"#6B3A5A", secondary_button_label:"#F5F5F0", shadow:"#1C1D21", background_gradient:"" }
"scheme-5": { background:"#6B6B6B", text:"#F5F5F0", button:"#F5F5F0", button_label:"#6B6B6B", secondary_button_label:"#F5F5F0", shadow:"#1C1D21", background_gradient:"" }

// 字体
"type_header_font": "archivo_n6"          // 确认字库；备选 jost_*
"type_body_font":   "cormorant_garamond_n5"
"heading_scale": 100,
"body_scale": 110,

// 形状 / 阴影（锐利 + 扁平）
"buttons_radius": 0,            "buttons_shadow_opacity": 0,  "buttons_border_thickness": 1, "buttons_border_opacity": 100,
"variant_pills_radius": 0,      "variant_pills_shadow_opacity": 0,
"inputs_radius": 0,             "inputs_shadow_opacity": 0,   "inputs_border_thickness": 1,
"card_corner_radius": 0,        "card_shadow_opacity": 0,     "card_border_thickness": 1, "card_border_opacity": 12, "card_color_scheme": "scheme-2",
"collection_card_corner_radius": 0, "collection_card_shadow_opacity": 0, "collection_card_color_scheme": "scheme-2",
"media_radius": 0,             "media_shadow_opacity": 0,
"badge_corner_radius": 0,       "sale_badge_color_scheme": "scheme-4", "sold_out_badge_color_scheme": "scheme-3",

// 布局 / 动效
"page_width": 1200,
"spacing_sections": 0, "spacing_grid_horizontal": 8, "spacing_grid_vertical": 8,
"animations_reveal_on_scroll": true, "animations_hover_elements": "none"
```

**自定义 CSS（注入到 theme.liquid 或专用 section）——让"系统名词"回到无衬线：**
```css
/* 导航 / 按钮 / 价格 / 表单 = 几何无衬线（系统名词）；正文保留 Cormorant 衬线 */
.header__menu-item, .button, .price, input, select, textarea, .product-form__buttons {
  font-family: "Archivo", "Jost", system-ui, sans-serif;
  letter-spacing: 0.04em;
}
.header__menu-item, .button { text-transform: uppercase; letter-spacing: 0.08em; }
/* 中文回退 */
:lang(zh) { font-family: "Noto Serif SC", serif; }
```

---

## 10. 首页区块蓝图（装修路线衔接，下一阶段细化）

| 顺序 | Section | 配色 | 目的 |
|---|---|---|---|
| 1 | Image Banner（首屏） | scheme-3 深 | 硬侧光搭扣微距 + “One Piece. Every Form.” 立刻传达调性 |
| 2 | **可转换机制讲解**（后续自定义 section） | scheme-1 浅 | 图文展示「花饰拆下→装上戒托」10 秒切换——头号差异点 |
| 3 | Featured Collection（产品网格） | scheme-1 / 卡 scheme-2 | 主推系列，发丝线白卡 |
| 4 | 材质 / 工艺故事带 | scheme-5 钛构 或 scheme-1 | 微距肌理 + “Grade 5 Titanium…” |
| 5 | 编辑式生活方式图 | scheme-3 深 | 法式慵懒佩戴大片 |
| 6 | 情感故事 / NFC「记忆之匣」 | scheme-4 梅子 | 唯一暖色情感触点 + 订阅 |
| 7 | 页脚 | scheme-3 深 | 收束于美术馆式深色 |

> 现状：`templates/index.json` 仍是 Dawn 默认（image_banner + featured_collection，scheme-3）。第 2/4/6 区块需后续按本系统搭建/自定义。

---

## 11. 待确认 / 决策项 (Open Items)

1. **缎面金 HEX**：VI 未给值，暂定 `#B7A179`（哑光低饱和）——需你确认或提供品牌实际金色。
2. **字体可用性**：主题编辑器字体选择器是否能选到 **Archivo / Cormorant Garamond**；不可则用 Jost / EB Garamond。是否考虑上传授权字体（Futura/Optima/Didot）作为长期升级。
3. **正文衬线取舍**：已选"标题无衬线 + 正文衬线 + CSS 把功能性 UI 拉回无衬线"。若你更想要整体更易读，可改为"标题衬线 + 正文无衬线"——这是品牌感 vs 易读性的权衡，请定夺。
4. **店面主语言 / 货币**：确认英文为主、€ 定价；是否需要多语言（中/法）。
5. **页宽**：1200（克制）还是 1400（更阔的画廊感）。

---

*SUIJI 随己 —— 万象，皆由你。用精密结构取代装饰，用构件咬合取代花纹。*

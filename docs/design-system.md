# SUIJI 随己 · DESIGN.md（网站设计宪法 v2）

| 文档信息 | |
|---|---|
| 版本 | v2.1（明暗基调校准「日光美术馆」，2026-06-11） |
| 作用 | SUIJI 官网（Shopify Dawn）**所有视觉/交互决策的单一事实来源**。AI 或人改任何界面前先读本文件；本文件没写的，按 §2「不确定时」规则办 |
| 配套 | `prd.md`（要什么）· `roadmap.md`（何时做）· `brand-vi-reference.md`(品牌VI 原文) |
| 冲突裁决 | 品牌精神以 VI 为准；**网页执行以本文件为准** |

---

## 1. 故事与意图（为什么长这样）

SUIJI 卖的不是首饰款式，是**结构**：一枚花饰通过钛快拆搭扣，在戒指/吊坠/耳环之间 10 秒切换。品牌的一切视觉都服务于一种感受——

> **走进一座现代美术馆，看到一件精密的钛金属装置。冷静、克制、贵在工艺而非装饰。**

由此推出三条不可违背的设计公理：

1. **结构即装饰**——界面用发丝线、网格、直角传达"工程精度"；禁止一切纯装饰元素（花纹、渐变、阴影堆叠）。
2. **留白即奢侈**——低密度、一屏一焦点。拥挤 = 廉价。
3. **产品摄影是主角，UI 是展台**——界面永远比图片"安静"。任何抢戏的颜色/动效都是错的。

**北极星检验**：每个界面元素都要能回答——*它是否帮 Emma（25-40 欧洲都市女性）理解或完成一次"状态切换"？* 不能就删。

---

## 2. 决策三色灯（允许 / 禁止 / 不确定时）

### ✅ 永远允许（默认安全）
直角（radius 0）· 发丝线分隔（1px, 10% 透明度）· 大写+宽字距的功能性短文案 · 大面积留白 · 深浅区块交替 · 哑光质感图片 · 200–400ms ease-out 的克制动效

### 🚫 永远禁止（无例外，无需请示）
- 视觉：投影/玻璃拟态/渐变背景/圆角>0/亮面金/荧光色/少女粉/卡通插画/贴纸感/emoji 作为 UI 元素
- 动效：弹跳(bounce)/旋转入场/视差滚动/自动轮播>5s 一次/hover 加阴影
- 文案：DIY、小五金、平替、配件、高性价比、cute、cheap、hack、"Buy now!!"式催促
- 布局：一屏多焦点、满铺无留白、移动端横向滚动（产品横滑列表除外）

### 🤔 不确定时（默认决策规则）
| 拿不准… | 默认做法 |
|---|---|
| 用什么颜色 | 用中性阶梯（§3.2），不用强调色 |
| 字体衬线还是无衬线 | Archivo 无衬线；只有"情感/编辑性的大字"才考虑衬线 |
| 要不要加动效 | 不加；非加不可则 240ms ease-out 透明度/位移 ≤8px |
| 间距给多大 | 在犹豫的两档里选**大**的那档 |
| 元素要不要保留 | 删掉。事后没人想念它就是对的 |
| 新场景没有规范 | 模仿本文件最接近的已有规格，并把新决策补进本文件 |

---

## 3. 色彩系统

### 3.1 核心纪律：一条明度阶梯 + 一个签名色
VI 的灰全是"中明度"，并排使用会糊成一团。网页端重组为**明度阶梯**（层级靠明暗，不靠色相）：

| Token | HEX | 名称 | 用途 |
|---|---|---|---|
| `canvas` | `#F5F5F0` | 画布白（=VI 哑光白） | 全站主背景 |
| `surface` | `#FFFFFF` | 纯白 | 卡片/抬升层（与画布形成无影层次） |
| `mist` | `#ECECE7` | 雾灰（新增） | 占位图底、禁用态底、骨架屏 |
| `line` | `#A0A0A0` | 钛本色 | **只做**发丝线/分隔线/次级图标 |
| `text-secondary` | `#6B6B6B` | 深钛灰 | 次级文字（仅浅底上，≥14px） |
| `structure` | `#6B6B6B` | 深钛灰 | 结构色带背景（仅配大字） |
| `gallery` | `#20232B` | 美术馆深 | 深色区块/页脚背景 |
| `ink` | `#1C1D21` | 墨钛黑（网页新增） | 正文/标题/主按钮/图标 |

**唯一签名色**：梅子 `#6B3A5A`（`plum`）——情感触点专用（NFC 记忆/会员共创/促销徽章/订阅区），全站面积占比 **<5%**。
**稀有点缀**（限量，默认不用）：缎面金 `#B7A179`（只做发丝描边/烫金细节，**禁止色块填充**）；钛蓝 `#4A6B8A`（特别系列物料）；极光蓝 `#AFDCEF`（网页端弃用）。

### 3.2 功能语义色（v2 新增——电商必需，VI 未定义）
原则：功能色也必须"冷调、低饱和、美术馆里不刺眼"。

| 语义 | HEX | 用法 |
|---|---|---|
| 错误 error | `#8C3B3B`（氧化铁红，冷哑） | 表单错误文字+边框；**不配底色块** |
| 成功 success | `#1C1D21` + ✓ 图标 | 成功不需要绿色，墨黑+对勾即可（克制） |
| 库存紧张/促销 | `plum #6B3A5A` | 徽章、低库存提示 |
| 信息/提示 | `#6B6B6B` | 帮助文字 |

### 3.3 Dawn 五套 color scheme（写入 settings_data.json 的值）
| Scheme | 用途 | background | text | button | button_label | secondary_button_label | shadow |
|---|---|---|---|---|---|---|---|
| scheme-1 画布 | 默认页面底 | `#F5F5F0` | `#1C1D21` | `#1C1D21` | `#F5F5F0` | `#1C1D21` | `#1C1D21` |
| scheme-2 卡片 | 产品卡/浅色子块 | `#FFFFFF` | `#1C1D21` | `#1C1D21` | `#FFFFFF` | `#1C1D21` | `#1C1D21` |
| scheme-3 美术馆 | **稀有深色重音**：页脚、每页≤1个编辑区块；不作首屏/默认 | `#20232B` | `#F5F5F0` | `#F5F5F0` | `#20232B` | `#F5F5F0` | `#1C1D21` |
| scheme-4 梅子 | 情感/会员/订阅 | `#6B3A5A` | `#F5F5F0` | `#F5F5F0` | `#6B3A5A` | `#F5F5F0` | `#1C1D21` |
| scheme-5 钛构 | 材质/工程说明带 | `#6B6B6B` | `#F5F5F0` | `#F5F5F0` | `#6B6B6B` | `#F5F5F0` | `#1C1D21` |

全部 `background_gradient` 留空（禁渐变）。

### 3.4 对比度合规表（WCAG 2.1 AA）
| 组合 | 对比 | 判定 |
|---|---|---|
| ink / canvas | ≈15.9:1 | ✅ 任意字号 |
| text-secondary #6B6B6B / canvas | ≈5.4:1 | ✅ 正文可用（≥14px） |
| line #A0A0A0 / canvas | ≈2.5:1 | ⚠️ **只能做装饰线/大图标，禁做文字** |
| #F5F5F0 / gallery #20232B | ≈13.3:1 | ✅ |
| #F5F5F0 / plum #6B3A5A | ≈7.4:1 | ✅ |
| #F5F5F0 / structure #6B6B6B | ≈5.0:1 | ✅ 但此 scheme 限标题/大字 |

---

## 4. 字体系统

### 4.1 角色分工（v2 定稿：无衬线为主，衬线为"稀有的情感语态"）
| 角色 | 字体 | 覆盖范围 |
|---|---|---|
| **主力** | **Archivo**（几何工业无衬线，Shopify 字库；备选 Jost） | 标题、正文、导航、按钮、价格、表单、产品文案——**一切功能性文字** |
| **点缀** | **Cormorant Garamond**（法式衬线，Google Fonts CSS 加载；备选 EB Garamond） | 仅三处：大号引言 pull-quote、品牌故事大字、Journal 文章正文 |

理由：① SUIJI 是"当代结构美学"（COS/建筑极简谱系，非 Tiffany 衬线传统），无衬线标题=Strength in Structure，正是 VI 给标题指定 Futura/Optima 的本意；② Cormorant 小字发虚，电商 UI 用衬线伤可用性；③ 衬线越稀有越有分量——它出现 = "品牌在说情感的话"。

### 4.2 字阶（桌面 / 移动）
| Token | 字体 | 字号 | 字重 | 行高 | 字距 |
|---|---|---|---|---|---|
| display | Archivo | 64 / 40 | 600 | 1.05 | +0.01em |
| h1 | Archivo | 44 / 30 | 600 | 1.1 | +0.01em |
| h2 | Archivo | 32 / 24 | 600 | 1.15 | +0.01em |
| h3 | Archivo | 22 / 19 | 500 | 1.2 | +0.02em |
| eyebrow | Archivo | 12 | 600 | 1.2 | **+0.16em 全大写** |
| nav / button | Archivo | 14 | 500 | 1 | +0.08em 全大写 |
| body | Archivo | 16 / 15 | 400 | 1.65 | 0 |
| caption | Archivo | 12 | 400 | 1.4 | +0.02em |
| price | Archivo | 16 | 600 | 1 | +0.02em，tabular-nums |
| quote（衬线） | Cormorant | 28 / 22 | 500 italic | 1.45 | 0 |
| story-display（衬线） | Cormorant | 32 / 24 | 500 | 1.3 | +0.01em |
| article-body（衬线） | Cormorant | 20 / 18 | 500 | 1.7 | 0 |

规则：衬线**最小出现字号 18px**（再小必发虚）；大写+宽字距是品牌签名，但**只用于 ≤3 个单词的短语**（长句大写不可读）。

### 4.3 Dawn 槽位与加载
- `type_header_font: archivo_n6` · `type_body_font: archivo_n4` · `heading_scale: 100` · `body_scale: 100`
- Cormorant 不占槽位，经 Google Fonts `<link>` 加载（仅 500/500italic 两个字重，控制载荷），作用于 `blockquote`、`.suiji-serif`、`.template-article .rte`
- 中文回退：界面 `"Noto Sans SC"`，衬线点缀 `"Noto Serif SC"`；法语字符 Archivo/Cormorant 原生支持 ✅

---

## 5. 布局 / 间距 / 断点

- **页宽** `page_width: 1400`；**长文本列强制 ≤720px**（产品描述/文章/About 正文）——大画布给图，窄列给字。
- **断点**（跟 Dawn）：移动 `<750` / 平板 `750–989` / 桌面 `≥990`。
- **间距音阶**（4 的倍数）：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 112。Section 上下 padding：桌面 80–112，移动 48–64；犹豫时取大。
- **网格**：产品网格桌面 4 列 / 移动 2 列，列距 `spacing_grid_horizontal/vertical: 8`。
- **区块节奏（v2.1 校准：日光美术馆）**：**浅色主导**——页面基调 = scheme-1/2 明亮画布；深色 scheme-3 是"重音"不是"基调"（页脚 + 每页至多 1 个编辑区块）；scheme-5 限窄带。首屏永远明亮。相邻同色区块间必须有发丝线或 ≥80px 留白。
- **Logo**：`logo_width: 100`，四周 Clear Space ≥ logo 高度的 50%。

---

## 6. 组件规格（含全状态）

> 通用规则：**所有组件 radius=0、shadow=0**。层次=底色差+发丝线+留白。

### 6.1 按钮
| 状态 | 主按钮 (solid) | 次按钮 (outline) |
|---|---|---|
| 默认 | ink 填充 + canvas 字 | 1px ink 描边 + 透明底 + ink 字 |
| hover | 不透明度 88%（无位移无阴影） | ink 填充 + canvas 字（反转） |
| focus-visible | 2px 外描边 ink，offset 2px（深底上用 canvas 描边） | 同左 |
| active | 不透明度 76% + 「咔哒」微回弹（§7） | 同左 |
| disabled | mist 底 + #A0A0A0 字，cursor not-allowed | 描边/字 40% |
| loading | 文字→三点脉冲（不转圈），按钮宽度锁定不跳 | 同左 |
- 文案：全大写、+0.08em、≤3 词（`ADD TO CART` / `SHOP SETS`）。
- Dawn 值：`buttons_radius:0, buttons_border_thickness:1, buttons_border_opacity:100, buttons_shadow_opacity:0`。

### 6.2 产品卡
- scheme-2 白卡浮于 canvas；`card_corner_radius:0, card_shadow_opacity:0, card_border_thickness:1, card_border_opacity:10`（发丝线）。
- 图 4:5 满幅（`card_image_padding:0`），文字左对齐：品名(body 500) → 价格(price) → 可换徽标（如适用，eyebrow 字样 `INTERCHANGEABLE`）。
- hover：仅次图替换（佩戴图）+ 品名下划线；**无升起无阴影**。
- 标题超长：两行截断 `-webkit-line-clamp:2`。

### 6.3 表单输入
| 状态 | 规格 |
|---|---|
| 默认 | 1px `#A0A0A0` 描边、透明底、radius 0、内边距 12×16 |
| focus | 描边变 ink 1px（不加 glow） |
| 错误 | 描边+提示文字 `#8C3B3B`，提示在输入框下 4px，caption 字号；**不要红底** |
| 禁用 | mist 底 |
- label 永远可见（eyebrow 样式），**不用 placeholder 当 label**。

### 6.4 变体选择（药丸→结构方块）
- `variant_pills_radius:0`：方块切片。默认=发丝描边；选中=ink 填充 canvas 字；不可用=mist 底+对角删除线；hover=描边变 ink。

### 6.5 徽章
- `badge_corner_radius:0`。促销=scheme-4 梅子；售罄=scheme-3；NEW=scheme-1 反白描边。
- **优先级**：售罄 > 促销 > NEW（同时满足只显示最高一个）。

### 6.6 导航 / 页眉
- scheme-1 底 + 底部发丝线；sticky，下滚收起上滚出现；**滚动后不加投影**（用发丝线区分层）。
- 桌面：Logo 左 / 菜单中（nav 字样式）/ 工具右（搜索/账户/购物车/EN|FR）。
- Mega-menu：全宽白底下拉，三列（类目/系列/一张当季图），列间发丝线。
- 移动：抽屉自左滑出，一级菜单 h3 字阶，背景 canvas。

### 6.7 页脚
- scheme-3；四列链接（caption 字阶，行高 2.2）+ 订阅框 + 法务行 + 语言货币切换。克制：无社媒大图标墙，文字链接即可。

### 6.8 购物车抽屉
- 自右滑入 360–420px，canvas 底；行项目=64px 缩略图+品名+变体+价格；"配齐建议"横滑条（读兼容矩阵）；CTA 主按钮全宽 `CHECKOUT — €XX`。

---

## 7. 动效与「咔哒」

- **预算**：进入视口渐入（`animations_reveal_on_scroll: true`）+ hover 状态 + 咔哒微交互。**没有其它动效。**
- 参数：透明度/位移 ≤8px，240ms，`cubic-bezier(0.22,1,0.36,1)`（ease-out）。
- **「咔哒 Click」**（品牌听觉 Logo 的视觉转译）：加购成功/变体选中/小游戏锁定时——`scale 1 → 1.04 → 0.98 → 1`，180ms；可选极短机械音（默认静音，用户开启后记住偏好）。
- `prefers-reduced-motion: reduce` → 全部动效降级为瞬时切换（无过渡）。
- `animations_hover_elements: "none"`（Dawn 槽位）；hover 效果用自定义 CSS 实现上述规格。

---

## 8. 影像艺术指导

### 8.1 风格铁律（来自 VI 7.4/8.3）
硬侧光（明暗交界线）· 原石/洞石/清水混凝土背景 · 微距怼到搭扣转轴 · 法式慵懒佩戴（真实皮肤纹理、燕麦/炭灰/白衬衫）· 哑光冷调。
**明度铁律（v2.1）**：默认**高调 (high-key)**——浅色石材、明亮通透，戏剧感来自"亮面上的硬光影"；**暗调低调图仅限编辑重音区块**（每页≤1），禁作 hero/产品图。
**禁**：亮面反光、柔焦、暖黄滤镜、杂乱背景、棚拍纯色板感。

### 8.2 比例规范
| 用途 | 比例 |
|---|---|
| Hero / 编辑大图 | 16:9 桌面 · 4:5 移动（两版裁切） |
| 产品卡 / 画廊 | 4:5 |
| 微距细节 | 1:1 |
| 小游戏素材 | 底座"空座图" 1:1 / 花饰透明 PNG 同视角同比例 |

### 8.3 占位图管线（素材未拍齐期间）
1. **首选**：`~/Desktop/Suiji/SUIJI_2024_Product_Images/`（121 张真实产品图，待标注分类）。
2. **AI 补位**：`gpt-image-2`（密钥已配置）按 VI 第 9 章 System Prompt + 反向咒语出图；只用于**氛围图/背景/概念图**，凡出现产品本体的 AI 图必须人工确认"结构与真品一致"才可用，且上线前全部替换为实拍。
3. 任何位置缺图：mist 底 + 居中小号 SUIJI 字标（**永不出现破图图标**）。

### 8.4 Alt 文本规则（SEO+a11y）
模式：`[产品名] — [材质] [形态]，[场景]`，例：`Camellia charm — brushed titanium, mounted on ring base, side-lit macro`。装饰图 alt=""。

---

## 9. 文案语气（Voice）

- 人格：**建筑师在法式杂志写专栏**——冷静、精准、短句；偶尔一句衬线诗意。
- 🚫 禁词：DIY / 小五金 / 平替 / 配件 / 高性价比 / cute / cheap / hack / 多重感叹号。
- ✅ 高频词：Structure · Engineered · State Transition · Fluidity · Curated · Canvas · Order。
- 微文案模式：
  - 按钮 = 动词短语 ≤3 词：`SHOP SETS` / `EXPLORE THE MECHANISM` / `BUILD YOUR FORM`
  - 空状态 = 一句冷静引导：`Nothing here yet. The structure awaits.` + 返回 CTA
  - 错误 = 直说+可行动：`Card declined. Try another payment method.`（不卖萌不道歉三连）
  - 成功加购 = `Locked in.`（呼应咔哒）

---

## 10. 全局状态规范（加载/空/错误）

| 状态 | 规格 |
|---|---|
| 骨架屏 | mist 色块（无闪烁动画或 1.6s 极缓脉冲），形状=最终布局 |
| 空集合 | 居中 eyebrow `COMING SOON` + 一句文案 + waitlist 入口（scheme-1） |
| 表单成功 | 行内确认（ink 字 + ✓），不弹 toast 不跳页（订阅类） |
| 404 | scheme-3 整屏：`This form doesn't exist. Yours can.` + `BACK TO SHOP` |
| 离线/慢网 | 图片懒加载 + LQIP（低清占位）；小游戏素材加载中显示骨架舞台 |

---

## 11. Dawn 落地映射（settings_data.json 执行块）

```jsonc
// ===== 颜色（5 schemes，值见 §3.3）=====
// ===== 字体 =====
"type_header_font": "archivo_n6", "type_body_font": "archivo_n4",
"heading_scale": 100, "body_scale": 100,
// ===== 形状/阴影：全直角全无影 =====
"buttons_radius": 0, "buttons_shadow_opacity": 0, "buttons_border_thickness": 1, "buttons_border_opacity": 100,
"variant_pills_radius": 0, "variant_pills_shadow_opacity": 0,
"inputs_radius": 0, "inputs_shadow_opacity": 0, "inputs_border_thickness": 1,
"card_corner_radius": 0, "card_shadow_opacity": 0, "card_border_thickness": 1, "card_border_opacity": 10,
"card_style": "standard", "card_color_scheme": "scheme-2", "card_image_padding": 0, "card_text_alignment": "left",
"collection_card_corner_radius": 0, "collection_card_shadow_opacity": 0, "collection_card_color_scheme": "scheme-2",
"blog_card_corner_radius": 0, "blog_card_shadow_opacity": 0,
"media_radius": 0, "media_shadow_opacity": 0, "media_border_thickness": 1, "media_border_opacity": 5,
"badge_corner_radius": 0, "sale_badge_color_scheme": "scheme-4", "sold_out_badge_color_scheme": "scheme-3",
// ===== 布局/动效 =====
"page_width": 1400, "spacing_sections": 0, "spacing_grid_horizontal": 8, "spacing_grid_vertical": 8,
"animations_reveal_on_scroll": true, "animations_hover_elements": "none",
"logo_width": 100
```

**自定义资产命名约定**：`sections/suiji-*.liquid` · `snippets/suiji-*.liquid` · `assets/suiji-*.{css,js}`；**不修改 Dawn 原生文件**（升级安全），一切扩展走新增文件。

**全局自定义 CSS（assets/suiji-global.css，theme.liquid 引入）**：
```css
/* 工业秩序签名：导航/按钮 大写+宽字距 */
.header__menu-item, .button { text-transform: uppercase; letter-spacing: .08em; }
/* 衬线点缀（Google Fonts 加载 Cormorant 500/500i） */
blockquote, .suiji-serif, .template-article .rte {
  font-family: "Cormorant Garamond","EB Garamond","Noto Serif SC",Georgia,serif; }
/* 长文本列收窄 */
.rte, .article-content { max-width: 720px; }
/* 中文回退 */
:lang(zh) { font-family: "Noto Sans SC", sans-serif; }
:lang(zh) blockquote, :lang(zh) .suiji-serif { font-family: "Noto Serif SC", serif; }
/* 焦点可见（全站统一） */
:focus-visible { outline: 2px solid #1C1D21; outline-offset: 2px; border-radius: 0; }
.color-scheme-3 :focus-visible, .color-scheme-4 :focus-visible, .color-scheme-5 :focus-visible { outline-color:#F5F5F0; }
```

---

## 12. 边界情况手册（Edge Cases）

| 情况 | 处理 |
|---|---|
| 产品标题超长 | 卡片两行截断；产品页完整显示 |
| 图片缺失 | mist 底+SUIJI 字标，永不破图 |
| FR 文案比 EN 长 20–30% | 按钮不定宽（min-width+padding 撑开）；导航字距可降到 +0.04em；禁止固定高度容器装文字 |
| 中文字符出现 | 自动走 Noto 回退（§4.3），不允许系统默认宋体 |
| 促销+售罄同时成立 | 只显示售罄徽章（§6.5 优先级） |
| 深色图上文字可读性不足 | Dawn overlay 0–40%（`image_overlay_opacity ≤ 40`），仍不足则文字移出图片下方，**禁止加文字阴影** |
| 用户开启 reduced-motion | 全动效瞬时化（§7） |
| 慢网/低端机 | 小游戏先渲染静态组合图+点选模式，拖拽增强可后载 |
| 触屏无 hover | 卡片次图替换改为画廊滑动；所有 hover 信息必须有非 hover 等价入口 |
| 邮件客户端 | 邮件模板只用系统字体栈+内联样式，沿用色板（Klaviyo 模板单独建，遵守本宪法的色与禁令） |

---

## 13. 决策日志

| # | 决策 | 状态 | 值 |
|---|---|---|---|
| 1 | 缎面金 HEX | ✅ | `#B7A179`，仅金属点缀 |
| 2 | 主字体 | ✅（待实装验证） | Archivo（Shopify 字库），衬线 Cormorant 走 CSS；实装时我直接在主题里验证，不需要你操作 |
| 3 | 衬线用途 | ✅ | 仅引言/品牌故事/Journal 正文，≥18px |
| 4 | 页宽 | ✅ | 1400 + 文本列 ≤720 |
| 5 | 语言/货币 | ✅ | EN 主 + FR 切换，EUR € |
| 6 | 功能语义色 | ✅ v2 新增 | error `#8C3B3B`；success 用 ink+✓ |
| 7 | 雾灰 mist | ✅ v2 新增 | `#ECECE7` 占位/禁用/骨架 |
| 8 | 明暗基调 | ✅ v2.1 校准（用户反馈"太黑"） | **日光美术馆**：浅色主导，深色仅重音（页脚+每页≤1区块）；影像默认高调；首屏 hero=亮图+零遮罩+scheme-1 |

*——本宪法 v2 冻结。修改需在本文件留下决策记录。万象，皆由你。*

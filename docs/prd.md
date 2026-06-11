# SUIJI 随己 · 官网 PRD v3

| 文档信息 | |
|---|---|
| 版本 | v3.0（资深 PM 重写版，2026-06-11） |
| 决策人 | 王玥 ｜ 执行 | Claude（开发/数据/素材/文案）+ 王玥（账号/商务/拍板） |
| 配套 | `design-system.md`（怎么长）· `roadmap.md`（何时做） |
| 平台 | Shopify Dawn + 自定义 sections ｜ 市场 EU（主攻法国）｜ EN 主 + FR ｜ EUR € ｜ 价位 €50–300 |
| 阅读约定 | **❓决策**=等你拍板 ｜ **📌提案**=我先定了，可推翻 ｜ ✅原生 / 🔧动态数据 / 🛠️自定义开发 =实现成本 |

---

## 1. 产品概述

### 1.1 电梯陈述
SUIJI 官网是「可转换结构首饰」的**体验式商店**：访客 5 秒看懂"一件→多形态"，亲手玩一次拆装（线上小游戏），购买首发 3 套装；买家自动成为会员，参与测品投票与预售——**网站既是货架，也是机制的展厅和品牌的共创俱乐部**。

### 1.2 目标（按优先级）
1. **转化**：把可转换差异点变成下单理由（套装为主力）
2. **客单价**：套装 €189–249 锚定 + 单品加购/复购
3. **私域共创**：订阅→会员→投票/waitlist→反哺选品
4. **品牌站位**：当代结构美学（非轻奢/非 DIY），为欧洲市场建立可信形象

### 1.3 非目标（明确不做，防 scope 蔓延）
本期不做：3D/AR 试戴、积分忠诚度、UGC 评价系统、多语言>2、礼品卡定制、NFC 线上激活、App。

### 1.4 北极星与 KPI
**北极星 = 换装互动率**（访客与小游戏或产品页换装模块交互的比例）。

| 维度 | 指标 | 3 个月目标 |
|---|---|---|
| 转化 | CVR / 加购率 / 结账完成率 | CVR ≥1.5% |
| 客单 | AOV / 连带率 | AOV ≥ €180 |
| 互动 | 小游戏停留 / 互动率 / 游戏内加购数 | 停留 ≥60s，互动 ≥30% |
| 私域 | 订阅率 / 会员数（=套装购买数） | 订阅 ≥4% |
| 共创 | 会员投票参与率 | ≥25% |
| 技术 | 移动 LCP / CLS / Lighthouse | <2.5s / <0.1 / ≥90 |

---

## 2. 用户

### 2.1 画像与 JTBD
| 画像 | 是谁 | 要完成的任务 (JTBD) |
|---|---|---|
| **Emma**（主） | 25–40 欧洲都市女性，设计审美高，反快时尚反撞款 | "用一套值得信赖的结构件，让我每天 10 秒换一种表达" |
| **Gift Buyer** | 为伴侣/母亲/朋友选礼，预算 €100–300 | "送一个不会错、有故事可讲、对方能长期用的礼物" |
| **Member** | 已购套装核心用户 | "更早看到新品、对'做不做这款'有发言权、第一时间锁定心仪款" |
| 反向用户 | 找平替/DIY/可爱风 | 视觉与文案主动劝退，不妥协 |

### 2.2 三条关键旅程（验收时按此走查）
1. **冷流量→首单**：广告/社媒 → 首页 Hero → 玩小游戏 → 套装产品页 → 加购 → 结账（弹窗给了 10% 码）
2. **送礼**：Google "convertible jewelry gift" → Gift 集合 → 套装页（礼盒说明）→ 下单
3. **会员共创**：买套装 → 邮件欢迎"你已是会员" → 会员中心 → 看预售 → 投票 → join waitlist → 投产通知邮件 → 复购

---

## 3. 范围

### 3.1 MVP 功能清单（本期全部上线）
| # | 模块 | 成本 |
|---|---|---|
| F1 | 全局装修（设计令牌/导航/页脚/购物车抽屉） | ✅+🔧 |
| F2 | 首页（8 区块） | ✅ |
| F3 | The Mechanism 页 + **换装小游戏（B 档拖拽吸附）** | 🛠️ |
| F4 | 集合页+筛选（类目/系列/价格/可换） | ✅ |
| F5 | 套装产品页（含套内清单+组合矩阵+跨套提示） | 🛠️ |
| F6 | 普通产品页（花饰/底座，含兼容列表） | 🔧 |
| F7 | 购物车（抽屉+配齐推荐）+ Shopify 结账 | ✅+🛠️小 |
| F8 | 会员系统（注册弹窗 10% off / 买套装自动会员 / 会员中心三态 / 预售区 / 投票 / waitlist） | 🔧+🛠️ |
| F9 | 内容页群（About/选购/保养/珠宝知识/QA/Visit Us/Sustainability） | ✅ |
| F10 | 法务+GDPR（政策×4 / Cookie 同意 / 双重确认订阅） | ✅ |
| F11 | i18n EN+FR、€ | ✅配置 |
| F12 | SEO/结构化数据 + GA4 事件埋点 | 🔧 |

### 3.2 Backlog（二期+）
3D 换装升级（C 档）、评价 UGC、NFC 激活、DE/ES/IT、积分、A/B 测试体系、Best Sellers 自动化。

---

## 4. 商品体系

### 4.1 首发 3 套装 📌提案（❓决策 #1：批准或改）
**统一结构**：每套 = 4 底座（耳环×2 + 项链×1 + 戒指×1）+ **4 枚互不相同花饰**；任意花饰适配任意底座（**跨套装也通用**）。
**卖点公式**：套内自由互换（组合数 9 / 9 / 8）→ **"One set. Every form."**

| 套装 | 主题 | 4 枚花饰 | 色彩锚点 | 定价📌 |
|---|---|---|---|---|
| SET 01 **CAMELLIA 山茶** | 有机/入门 | 同一朵山茶的四个时态：全开/半开/花苞/单瓣（叙事=绽放） | 钛本色 #A0A0A0 | **€189** |
| SET 02 **ORBIT 轨** | 几何/态度 | 圆环/方块/三角/直线（最"卖结构"） | 深钛灰 #6B6B6B | **€209** |
| SET 03 **AURORA 极光** | 阳极色彩/旗舰 | 同一花型 × 四种阳极氧化色（钛蓝/紫/青/玫瑰调） | 钛蓝+梅子 | **€249** |

**价格架构逻辑**：单品后续开放时（花饰 €39–59 / 底座 €45–69），单买 4+4 ≈ €350+ ＞ 套装 → 套装=理性最优解（锚定效应）。

### 4.2 类目总表
| 类目 | MVP 状态 |
|---|---|
| Sets 套装 ⭐ / Charms 花饰 / Bases 首饰托 | **有货**（套装 3 + 套内单品补购位） |
| Earrings / Studs / Rings / Pendants / Necklaces / Brooches / Bracelets / Beads / Multi-rings | **占位集合**（Coming soon + waitlist 入口） |
| New Arrivals / Interchangeable Collection / Best Sellers / Gift | 自动/手动集合（规则 §7.3） |
| ~~tops~~ | 已删（含义待你确认后再加） |

### 4.3 Shopify 建模规则
- **套装 = 1 个 Product**（product type `Set`）。变体维度只留 1 个：戒指尺寸 = **多码（EU 52 / 54 / 56）✅已定 2026-06-11**。套内构成不靠变体，靠 metafield 引用 metaobjects。
- **花饰/底座 = 独立 Product**（type `Charm`/`Base`），MVP 即建好（哪怕暂不开卖，置 draft），用于小游戏数据与后续单卖。
- **预售候选 = Product（draft 或 active+完全隐藏）** + tag `pre-sale`：不进公开集合、**排除出搜索（Search & Discovery 排除）与 sitemap（`seo.hidden` metafield）**，防泄漏（详见 §6-E4 边界）。
- 命名约定：handle 全英文小写连字符（`set-camellia` / `charm-camellia-bud` / `base-ring-classic`）。

---

## 5. 信息架构

### 5.1 站点地图 & 导航
```
Home
├─ SHOP ▾（mega-menu 三列：按类目｜按系列｜当季视觉+游戏入口）
├─ THE MECHANISM（机制+小游戏 🎮）
├─ JOURNAL（选购指南/保养/珠宝知识/品牌内容）
├─ ABOUT（品牌/设计师/团队/历史/客户评价）
├─ SUPPORT ▾（Q&A / Care Guide / Shipping & Returns / Contact）
└─ 工具：搜索｜账户(会员中心)｜购物车｜EN|FR
Footer：Shop/About/Support/法务(Privacy·T&C·Cookie·Sustainability)/订阅/社媒/语言货币
```

### 5.2 模板映射（Dawn）
| 页面 | 模板 | 实现 |
|---|---|---|
| 首页 | `index.json` | ✅ |
| 机制+小游戏 | `page.mechanism.json` | 🛠️ `suiji-interactive-mechanism` |
| 套装产品页 | `product.set.json` | 🛠️ `suiji-set-contents` + `suiji-combo-matrix` |
| 普通产品页 | `product.json` | 🔧 |
| 会员中心 | `page.members.json` | 🛠️ `suiji-members-area` |
| 集合 / About / 内容页 / 政策 / 系统页 | Dawn 原生模板族 | ✅ |

---

## 6. 功能规格（Epic → 用户故事 → 验收标准）

### E1 浏览与发现
**US1.1** 作为访客，我打开首页 5 秒内明白"一件→多形态"。
首页区块（配色见 design-system §3.3）：
1. Hero（s3）：搭扣微距 + `One Piece. Every Form.` + `SHOP SETS` / `PLAY THE MECHANISM` ✅
2. 机制 3 步（s1，multicolumn）✅ → 3. 三套装陈列（s1）✅ → 4. 小游戏预告条（s5，15s 循环视频/动图）→ 5. 材质故事（s1）✅ → 6. 编辑大片（s3）✅ → 7. 会员共创预告（s4）✅ → 8. 订阅（s4）✅
**验收**：移动 LCP<2.5s；Hero 两 CTA 点击埋点；逐屏无横滚。

**US1.2** 作为访客，我能按 类目/系列/价格/是否可换 筛到目标商品。
集合页：原生网格 + Search & Discovery 筛选（type / tag `interchangeable` / 价格带）；空占位集合显示 `COMING SOON` + waitlist。
**验收**：筛选无整页刷新；空状态有 waitlist 入口；FR 下筛选标签翻译完整。

### E2 机制体验（小游戏 B 档）🛠️ ★
**US2.1** 作为访客，我能拖一枚花饰到底座上，看到吸附+咔哒锁定，并能直接买这个组合。

**交互规格**：
- 舞台 = 底座空座图（1:1）；底部花饰托盘（横滑，含跨套装全部花饰）；顶部形态 tab（Ring / Necklace / Earring）。
- 拖拽（Pointer Events）：花饰进入锚点半径 48px → 磁吸过渡到锚点（transform 240ms）→ 咔哒回弹（scale 1→1.04→0.98→1, 180ms）→ 状态"已锁定"。
- 锁定后：展示组合完成图 + 价格条 `THIS COMBO — €XX`（花饰+底座合计）+ `ADD COMBO`（Cart AJAX 同时加两件）+ `IN SET CAMELLIA — €189` 套装跳转（如果该组合属于某套装，**优先推套装**）。
- 换装：再拖新花饰=替换（旧花饰飞回托盘）；切形态 tab=底座切换、已选花饰保留并重新吸附。
- **移动端**：拖拽降级为**两步点选**（点花饰→点底座高亮锚点）；动效一致。
- 音效：默认静音；右上角小喇叭开启后 localStorage 记住。

**边界情况**：
| 情况 | 处理 |
|---|---|
| 花饰与当前底座不兼容（矩阵外） | 拖近时锚点显示"⌀"标记+轻微排斥动效，文案 `Not compatible with this base.` |
| 组合中某件售罄 | 价格条变 `OUT OF STOCK — JOIN WAITLIST`（接 waitlist） |
| 素材未加载完 | 骨架舞台（mist 色块），花饰逐个淡入 |
| 触屏+键盘用户 | 全流程键盘可达（tab 选花饰，enter 装上）；aria-live 播报锁定结果 |
| reduced-motion | 拖拽改点选+瞬时切换 |
**技术**：纯 HTML/CSS/JS（无库，<30KB）；数据=Liquid 注入 metaobjects JSON（花饰/底座/锚点/兼容/价格/变体ID）；素材=同视角空座图+花饰透明 PNG（gpt-image-2 制占位，上线前实拍替换）。
**验收**：iOS Safari/Android Chrome 实测拖/点全可用；任意兼容组合加购成功率 100%；不兼容组合出现友好提示；游戏事件全埋点（§9）。

### E3 购买
**US3.1** 套装产品页：画廊（全家福/单件/微距/佩戴）→ 购买区（价格/尺寸变体/`ADD SET TO CART`+咔哒）→ **What's in the set**（4+4 可视化清单 🛠️）→ **24 Ways**（组合矩阵轮播或迷你换装器 🛠️ 复用 E2 组件）→ 规格折叠（材质/尺寸/护理 🔧metafield）→ 信任区（EU 配送/退换/保修/低敏 ✅）→ 跨套提示 → 相关推荐。
**US3.2** 购物车抽屉含**配齐推荐**：购物车里有底座无兼容花饰（或反之）→ 推荐条"Charms that fit your base"（读兼容矩阵）🛠️小。
**US3.3** 结账 = Shopify 托管（仅 logo/主色微调）；支付 ✅已定：**Shopify Payments**（你在后台「设置→收款 Payments」激活，需企业/身份信息+收款 IBAN；激活后自动含 Visa/MC/Apple Pay/Google Pay，法国市场可在其中启用 Klarna 分期）+ **PayPal**（在同一页单独连接 PayPal 商业账户）。10% 码范围保持 📌默认：全场可用、不与其他折扣叠加。
**验收**：移动购买区 sticky；变体/库存/€/FR 正确；测试订单全流程跑通（支付→邮件→退款）。

### E4 会员与共创
**流程**：弹窗注册（进站 8s 或滚动 50%，每会话最多 1 次，关闭后 7 天不再弹）→ Klaviyo 发一次性 10% 码 → 购买套装 → **Shopify Flow 自动打 tag `member`** + 欢迎邮件 → 会员中心解锁。

**会员中心三态**（`page.members.json` 🛠️）：
| 状态 | 内容 |
|---|---|
| 未登录 | 价值主张 + 登录/注册 CTA（提 10% off） |
| 已登录非会员 | "Buy any set to unlock the studio" + 套装入口 |
| 会员 | ① 预售产品区（tag `pre-sale` 轮播）② 测品投票 ③ 我的 waitlist ④ 专属内容 |

**测品投票（MVP 轻方案）**：候选=metaobject `vote_item`；点击投票= Klaviyo 事件 `vote`（绑定账号防重投）；**票数不实时公开 ✅已定**（显示 "Voting open"），你在 Klaviyo 后台看统计；投产后该卡变 "In production →" 链接（闭环）。
**Waitlist**：占位类目/售罄品/预售品上的 `JOIN WAITLIST` → Klaviyo list（按产品分）+ customer metafield 记录；投产/到货自动邮件。

**边界情况**：
| 情况 | 处理 |
|---|---|
| 买套装后**整单退款** | ✅已定：会员资格保留，Flow 不自动撤 tag |
| 游客结账（未注册）买套装 | tag 跟邮箱走；后续用同邮箱激活账号即见会员区（Shopify 按邮箱关联订单） |
| 10% 码滥用（换邮箱反复领） | 一次性码+绑邮箱+排除已有客户（Klaviyo 新订阅者 flow 才发）；❓决策 #3b：10% 适用全场还是排除套装？📌建议全场可用（首单转化优先） |
| 预售品泄漏 | 不进集合+排除搜索+`seo.hidden`+所有入口仅会员中心 Liquid 渲染；直链访问→模板头判断非会员 302 到 `/pages/members` |
| GDPR | 投票/waitlist 事件属营销数据：注册时一并取得同意；隐私政策写明 |

### E5 内容与信任
- **About**：宣言（衬线大字）→ 品牌故事 → 设计师 → 团队 → 时间线 → 客户评价（初期=种子用户语录 📌）→ CTA。
- **指南**：选购指南（怎么选第一套/送礼）、保养指南（钛+搭扣维护）、珠宝知识（blog，SEO 长尾）。
- **Support**：Q&A（FAQPage 结构化）、Contact 表单。**Visit Us 页删除 ✅已定**（无线下点；社媒链接进页脚与 Contact 页）。
- **Sustainability**：钛可回收/耐用反快时尚/包装。
- **法务**：Privacy/T&C/退换/配送（Shopify 生成+FR）+ Cookie 同意（Shopify Customer Privacy）+ 订阅双重确认。

---

## 7. 数据模型（全 Shopify 原生 + Klaviyo，零自建库）

### 7.1 Metaobjects（4 张表）
**charm**：name/name_fr ｜ image_main ｜ image_overlay_png（小游戏）｜ set_ref→jewelry_set ｜ material/color ｜ **compatible_bases[list→base]** ｜ product_ref→Product
**base**：name/name_fr ｜ form(ring/necklace/earring/brooch) ｜ image_empty ｜ **anchor_x/anchor_y/anchor_scale**（锚点）｜ compatible_charms[list→charm] ｜ product_ref
**jewelry_set**：name/name_fr/theme_story ｜ charms[list] ｜ bases[list] ｜ hero_image ｜ combo_count ｜ product_ref
**vote_item**：name/image/description ｜ status(draft/open/closed/in_production) ｜ result_note

### 7.2 Products / Tags / Metafields
- type：`Set` / `Charm` / `Base`；tag：`interchangeable`、`gift`、`pre-sale`、`new`（60 天自动下）
- product metafields：`suiji.set_ref`（套装页读 metaobject）、`suiji.care`、`suiji.specs`、`seo.hidden`
- customer：tag `member`；metafield `suiji.waitlist`（list of handles）

### 7.3 Collections
| 集合 | 规则 |
|---|---|
| sets / charms / bases / 各类目 | type 或 tag 自动 |
| new-arrivals | 自动：tag `new` |
| best-sellers | 手动（初期人工维护 📌） |
| gift | 手动 tag `gift` |
| interchangeable-collection | tag `interchangeable` |

### 7.4 Klaviyo（邮件&事件）
Lists/Segments：订阅者 / member / waitlist-{handle}；Flows：欢迎+10% 码 / 会员欢迎 / waitlist 通知 / 弃购；Events：`vote`、`waitlist_join`。

---

## 8. 系统架构

```
Shopify 核心（商品/订单/客户/结账/Markets EN-FR-€）
├─ 免费 App：Flow（自动打tag）/ Search & Discovery（筛选+排除预售）/ Translate & Adapt（FR）
├─ Klaviyo（订阅/flows/投票&waitlist事件）
├─ GA4（事件埋点，§9）
└─ 主题层（Dawn + suiji-* 自定义）：
     sections: suiji-interactive-mechanism / suiji-set-contents / suiji-combo-matrix /
               suiji-members-area / suiji-cart-upsell / suiji-mechanism-steps
     assets:   suiji-global.css / suiji-mechanism.{js,css} / suiji-members.js
     约定：不改 Dawn 原文件；JS 总量 <60KB；全部走 git
```
**明确不引入**：自建服务器/外部数据库/bundle 付费 app/评价 app（二期）。
**密钥管理**：`.theme-token`（主题推送）/ `.image-api-key`（gpt-image-2）/ `.feishu-credentials`（飞书）——均 0600+gitignored；**Admin API token 待你创建**（见 §14 分工）。

---

## 9. 埋点字典（GA4）

| 事件 | 触发 | 参数 |
|---|---|---|
| `view_item / add_to_cart / begin_checkout / purchase` | 电商标准 | items, value, currency |
| `mechanism_play` | 小游戏首次交互 | device |
| `mechanism_snap` | 吸附锁定成功 | charm_id, base_id, form |
| `mechanism_combo_atc` | 游戏内加购 | combo, value |
| `mechanism_incompatible` | 尝试不兼容组合 | charm_id, base_id |
| `signup_popup_view / submit` | 弹窗展示/提交 | trigger(8s/scroll) |
| `member_unlock` | 首次以 member 身份进会员中心 | — |
| `vote_click` | 投票 | vote_item |
| `waitlist_join` | 加入等候 | product_handle |
| `lang_switch` | EN↔FR | from,to |
**复盘节奏**：上线后双周看北极星+漏斗，月度全 KPI（出报告用 csv-data-summarizer）。

---

## 10. i18n
EN 默认根路径；FR=`/fr/`（Translate & Adapt）；hreflang en/fr/x-default；€ 全市场。**待译物**：商品/集合文案、metaobject `*_fr` 字段、页面、政策、邮件模板、小游戏 UI 字符串（JS 里走 Liquid 翻译注入）。流程 ✅已定：我出 EN→我出 FR 初稿并自行润色→标注"待母语审"（暂无母语资源，后续有再过一遍）。FR 文案平均比 EN 长 25%，组件已按 design-system §12 适配。

## 11. 非功能需求
性能：LCP<2.5s/CLS<0.1/移动 Lighthouse≥90；图片 WebP+srcset+懒加载（首屏图 eager）。
可达性：WCAG 2.1 AA；小游戏键盘可玩+aria-live；focus 全站可见。
SEO/GEO：结构化数据 Product/Offer/FAQPage/Organization/BreadcrumbList；The Mechanism 页=实体定义页（AI 搜索引用源）；核心词 convertible/interchangeable/titanium jewelry。
安全/隐私：GDPR 同意+双确认+数据删除流程；密钥永不进 git；第三方 app 安装前审权限。

## 12. 发布计划
| 里程碑 | 内容 | 完成定义 (DoD) |
|---|---|---|
| M1 数据地基 | Metaobjects 4 表+3 套装+集合+占位图标注 | 后台数据完整，小游戏可读到 JSON |
| M2 全局装修 | 令牌写入+导航/页脚/抽屉+首页 | 预览主题过 design-review |
| M3 核心页 | 套装产品页+集合页+Mechanism 骨架 | 移动走查通过 |
| M4 小游戏 | E2 全规格 | E2 验收全绿 |
| M5 会员 | E4 全链路 | 测试号全流程实测 |
| M6 内容法务 | E5 + FR 全量 | 双语走查 |
| M7 上线 | QA 清单+真实下单+DNS | 公开发布 |
❓决策 #8：目标上线日期？（决定素材/翻译并行度）

## 13. 风险
| 风险 | 对策 |
|---|---|
| 小游戏素材（同视角抠图）拍摄难 | 先 AI 占位（gpt-image-2 透明 PNG），拍摄清单写死视角/比例 |
| 套装与单品价差设计不当→只买单品 | 单品延后开放+价格锚定（§4.1） |
| FR 机翻品牌感差 | 关键页（首页/套装/About）人工润色优先 |
| 弹窗伤体验/被 Google 罚 | 8s 延迟+移动端小尺寸+频控 |
| 预售泄漏 | §6-E4 边界四重防护 |
| Dawn 大版本升级冲突 | 不改原文件+git 基线（已有 pristine 提交） |

## 14. 决策清单 + 分工

### 14.1 决策记录（2026-06-11 已拍板 7 项）
| # | 决策 | 结果 |
|---|---|---|
| 1 | 3 套装构成/命名/定价 | ✅ 批准 CAMELLIA €189 / ORBIT €209 / AURORA €249；**实拍图暂缺**→占位策略见 `docs/asset-map.md`（2024 系列图临时用 + gpt-image-2 按新 VI 补） |
| 2 | 戒指尺寸 | ✅ **多码变体（EU 52 / 54 / 56）** |
| 3 | 支付 | ✅ Shopify Payments（后台激活，含 Klarna）+ PayPal；10% 码范围保持默认📌全场不叠加 |
| 4 | 投票票数 | ✅ 不实时公开（零后端方案） |
| 5 | 整单退款后会员 | ✅ 保留资格 |
| 6 | Visit Us | ✅ 删除该页（无线下点，社媒入页脚） |
| 7 | FR 翻译 | ✅ 我出初稿+润色，标注待母语审 |
| 8 | 目标上线日期 | ❓ 仍待定（唯一未决项） |

### 14.2 分工表（谁做什么）
**我（Claude）可独立完成**：主题全部代码（令牌/sections/小游戏/会员页）｜ Metaobject 定义与数据灌入（**需 Admin API token**，见下）｜ 121 张图的标注分类+用途映射 ｜ gpt-image-2 占位图（透明 PNG/氛围图）｜ 全站 EN 文案+FR 初稿 ｜ 结构化数据+GA4 埋点代码 ｜ 文档双向同步飞书 ｜ git 版本管理（**不自动 push，听你口令**）。

**需要你做（我给逐步指引）**：
1. **创建 Admin API 自定义应用 token**（Shopify 后台 5 分钟）→ 给我后，metaobjects/商品/集合全部我来建；**不给则**我产出"后台点击清单"你手动录入
2. 安装免费 app：Flow / Search & Discovery / Translate & Adapt / Klaviyo（需店主权限的点击）
3. 商务配置：支付开通（Stripe/PayPal/Klarna 实名）/ 运费与税 / Markets 货币 / 域名 DNS / 政策页的公司实体信息
4. Klaviyo 与 GA4 开账号（给我 API key / Measurement ID 后流程与埋点我配）
5. §14.1 的 8 个决策
6. 后期：真实拍摄（我出 shot list）；FR 母语审（可选）

---
*v3 冻结前逐节对一遍。所有功能上线前回北极星：它帮用户完成"状态切换"了吗？*

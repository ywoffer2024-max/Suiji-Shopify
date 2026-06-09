# SUIJI 随己 · Shopify 建站与运营路线图 (Roadmap)

> 这是 SUIJI 官网项目的**长期作战地图**。配合 `docs/design-system.md`（设计宪法）与 git 版本管理，构成「可长期维护」的三件套。
> 状态标记：✅ 已完成 · 🚧 进行中 · ⬜ 待办

---

## 0. 两个关键决策（先答你的问题）

### Q1：要不要连 Figma 做设计系统？——**不需要。用 DESIGN.md（设计 markdown）。**
理由：
1. **你的场景**：基于现成模板（Dawn）+ 单人维护 + 由 AI（我）来落地代码。Figma 是给「人」看的像素稿，**我无法读 Figma 去生成 Liquid 代码**；而一份写给模型看的 markdown，我能直接拿来生成主题代码、保持全站一致。
2. **文章印证**（Lisa Demchenko, *How to write a DESIGN.md Claude can actually use*）：DESIGN.md 是「设计系统 ↔ 模型」之间的**沟通层**，关键不是色卡，而是**产品故事 + 约束（permit / forbid / 遇到没想到的情况怎么办）**。这正是 AI 建站真正需要的东西。
3. **可维护性**：markdown 进 git，可 diff、可回滚、可长期演进；Figma 改了不会自动同步到站点。
4. Figma 不是不能用——**后期**若要做高保真视觉稿/给外部设计师沟通，可作为「可选补充」，但**不是骨干**。

> 结论：**DESIGN.md = 骨干**（已建 `docs/design-system.md`，下一步按文章标准打磨）；Figma = 可选的、后期的像素稿工具。

### Q2：要不要先读品牌 VI 和产品再做计划？——**已经做了。** ✅
已读完《SUIJI 随己：品牌视觉与产品设计指南》，并据此产出 `docs/design-system.md`（含配色、字体、组件、影像、文案语气、Dawn 落地值）。本路线图就建立在这份理解之上。

---

## 1. 核心打法 / 怎么保证「长期可维护」

三根支柱，所有工作都围绕它们流转：

1. **DESIGN.md（设计宪法）** = 单一事实来源。任何视觉/交互决策先落到这里。
2. **Git + GitHub**（`ywoffer2024-max/Suiji-Shopify`）= 版本与回滚。
3. **标准工作流**：`DESIGN.md 定义` → 我改 `dawn-live/` 主题代码 → 本地 `theme dev` 预览 → git 提交 → push → `theme push` 部署上线。改前永远先备份/留干净提交点。

> 产品差异化锚点（写进每个页面）：**一件 → 多形态**的可转换机制（花饰 10 秒快拆，戒指/项链/耳环互换）。检验任何页面的唯一问题：*"它是否帮用户完成一次『状态切换』？"* 否则删掉。

---

## 2. 我的 Skills 地图（按阶段，已安装可直接用）

| 阶段 | 可用 Skills | 用途 |
|---|---|---|
| 设计系统 | `brand-guidelines`, `frontend-design`, `ui-ux-pro-max`, `canvas-design` | 把 VI 转成可用设计规范 / 高质量前端 |
| 装修(主题) | `shopify-liquid`, `shopify-use-shopify-cli`, `theme-factory`, `frontend-design` | Liquid 区块/section 开发、CLI 工作流 |
| 数据建模 | `shopify-custom-data`（Metafields/Metaobjects） | 建模「花饰↔戒托」兼容关系等可转换数据 |
| 素材 | `image-enhancer`, `canvas-design`, `moments-landing-page-cloner` | 图像处理、参考页克隆 |
| 选品/市场 | `reddit-jewelry-research`, `reddit-jewelry-insights`, `competitive-ads-extractor` | 珠宝市场洞察、竞品广告拆解 |
| 运营/内容 | `xiaohongshu-writer/generator/rewriter`, `content-research-writer`, `twitter-algorithm-optimizer`, `brand-launch-ops` | 小红书/社媒内容、出海冷启动 |
| 数据分析 | `csv-data-summarizer`, `document-skills(xlsx/pdf/pptx/docx)` | 销售/流量数据汇总、出报告 |
| SEO/技术 | `shopify-dev`, `shopify-liquid`, `shopify-storefront-graphql` | 文档检索、结构化数据、定制 |
| 其它 | `shopify-functions`, `shopify-admin`, `shopify-hydrogen`, `domain-name-brainstormer` | 折扣/结账逻辑、Admin 操作（按需） |

> 规则：遇到没有对应 skill 的需求先 `find skills` 搜；**下载任何新 skill 前先跑 `/skill-vetter` 安检**（你的既定安全规则）。

---

## 3. 分阶段路线图

### Phase 0 — 地基 ✅🚧
- ✅ 接入店铺（Theme Access token）、拉取 Dawn 基线（351 文件）、git 初始化
- ✅ 读 VI、产出 `docs/design-system.md`
- 🚧 GitHub 推送：本地 2 个提交已就绪，**等你在仓库加写权限部署密钥**后我即推
- ✅ 确认基础主题 = Dawn

### Phase 1 — 设计系统定稿（DESIGN.md）⬜
- 按文章标准打磨 `design-system.md`：**产品故事先行 + 明确的「允许/禁止/兜底规则」**（目前已具雏形，强化 Do/Don't 与边界情况）
- 锁定 5 个待定项（见 §4）
- 可选：重命名/补充为约定俗成的 `DESIGN.md`（+ `design-components.md`），便于 AI 工具识别
- **产出**：冻结版设计宪法

### Phase 2 — 信息架构 & 数据模型 ⬜
- 站点地图 & 导航：首页 / Shop(按形态·按花饰·按材质) / **The Mechanism(可转换玩法)** / 产品 / 品牌故事 About / Journal / 客服
- **用 Metafields/Metaobjects 建模可转换系统**：花饰、底座、兼容矩阵（哪些花饰适配哪些托）——这是产品页「换装」体验的数据基础（`shopify-custom-data`）
- 集合(Collections)结构与标签体系
- **产出**：IA 文档 + 数据模型 schema

### Phase 3 — 装修 / 主题搭建（Dawn）⬜
- 全局令牌落地：把 `design-system.md` 的配色/字体/形状写入 `settings_data.json`
- 首页 7 区块（含**可转换机制讲解** + 材质故事 + NFC「记忆之匣」情感区）
- 关键模板：产品页（换装/兼容 UX）、集合页、品牌故事页、Journal
- 新增几个自定义 section（`shopify-liquid`）
- 全程：本地改 → `theme dev` 预览 → git → 部署
- **产出**：可上线的主题

### Phase 4 — 素材 / 资产 ⬜
- 艺术指导按 DESIGN.md：硬侧光微距、原石/清水混凝土背景、法式慵懒佩戴
- 先用 VI 第 9 章 AI 提示词出**氛围图/爆炸图占位**（明确标注非工程图），`image-enhancer` 收尾
- 真实拍摄 shot list + 「咔哒」ASMR 短视频脚本（社媒资产）
- 资产规范：命名、尺寸、存放位置
- **产出**：首批可用素材 + 拍摄清单

### Phase 5 — 上线就绪 ⬜
- SEO 基础：title/meta/alt、结构化数据(Schema)、sitemap、`meta-tags`
- 性能（图像尺寸/懒加载）、可达性（对比度已在 DESIGN.md 解决）
- 法务页、运费、退换、支付与结账自测
- 上线检查清单（QA）
- **产出**：发布

### Phase 6 — 运营 / 营销 ⬜
- 内容引擎：小红书（`xiaohongshu-*`）、IG/TikTok（ASMR「click」）、`competitive-ads-extractor` 拆竞品广告
- 市场洞察：`reddit-jewelry-research/insights` 找定位与社区话题
- 出海冷启动：`brand-launch-ops`
- 邮件/留存、商品企划、促销
- **产出**：可持续的内容&获客节奏

### Phase 7 — 数据分析 ⬜
- GA4 / Shopify Analytics 埋点、事件、漏斗
- `csv-data-summarizer` 做销售/流量分析，`document-skills` 出报告
- 转化分析 + A/B 想法
- **产出**：周期性数据复盘

### Phase 8 — SEO / GEO ⬜
- 技术 SEO + 内容 SEO（Journal 文章打 "convertible jewelry / transformable ring" 等词）
- **GEO（生成式引擎优化）**：结构化数据 + 清晰的产品/品牌事实，让 AI 搜索引用 SUIJI；FAQ、实体清晰度
- 国际化（欧洲）：hreflang、货币、多语言
- **产出**：自然流量与 AI 可见度增长

---

## 4. 需要你拍板的决策（阻塞 Phase 1 定稿）

1. 缎面金 HEX（VI 未给，暂定 `#B7A179`）
2. 字体：编辑器能否选到 Archivo / Cormorant Garamond（否则 Jost / EB Garamond）；是否上传授权字体
3. 正文衬线取舍（品牌感 vs 易读性）
4. 页宽 1200 vs 1400
5. 店面主语言 / 货币（英文 + € ？是否多语言）

---

## 5. 即时下一步
1. 你加好 GitHub 部署密钥 → 我推送（地基入库）
2. 你定 §4 的 5 项 → 我把 `design-system.md` 定稿并打磨成「Claude-usable」标准
3. 进入 Phase 2：搭 IA + 用 Metaobjects 建模可转换系统

---
*参考：Lisa Demchenko, "How to write a DESIGN.md file Claude can actually use" (UX Collective, 2026)。核心：DESIGN.md 要讲产品故事 + 给约束，而非堆砌 token。*

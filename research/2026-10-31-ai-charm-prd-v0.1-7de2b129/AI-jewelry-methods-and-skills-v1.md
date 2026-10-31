# SUIJI：AI 辅助花饰设计与可打印生产方法调研

版本 v1 · 调研核验日 2026-10-31 · 对象：SUIJI 网站、设计及生产负责人

## 判断与建议

已有珠宝品牌把 AI 用于创意探索、变体与客户沟通，也已有可定制、实际 3D 打印的首饰系统。**本次没有找到足够公开证据，能证明一个现成 skill 可将任意提示词直接变成尺寸准确、适配 SUIJI 底托并已通过钛首饰量产验证的文件。** 这是本次证据范围的结论，不是声称市场上不存在相关技术。

适合 SUIJI 的方法是：**用户意图 → 有边界的花饰造型 → 锁定真实接口的 CAD 工程化 → 工艺检查 → 实物验证 → 打印及生产交付。** AI 与 Tripo 提供创意和候选几何；经过核定的 CAD、工艺参数和实物测试共同保证制造要求。

用户最新指示：最终必须能 3D 打印、用于生产；可能采用「树脂打样」和「直接钛等金属打印」两条路线。因此两条路线应分别保留资格、文件和验证记录；树脂样件通过后，金属制造仍须独立首件确认。

## 案例：哪些部分已有可信证据

| 案例 | 实际公开方法与证据 | SUIJI 借鉴方式 | 证据边界 |
|---|---|---|---|
| J’evar / ALTR | 品牌官方转载 CEO 的一手采访，确认使用自有生成式 AI，并由人保留设计决定 | 以品牌自己的作品、材料及规格构建受控知识库；AI 出变化，人筛选并工程化 | 已有品牌采用；效率改善为自述，没有独立公开的尺寸合格率、良率或收入增量证明 |
| Delmar Jewelers | 设计总监一手介绍：消费者画像、已有畅销款 → 提示词 → AI 创意细节 → 人工转 3D 设计；文中最终系列图片明确是人工 3D 渲染 | 让用户选择风格/场景，提炼某个造型细节后重建；保持品牌自己的结构 | 不能把渲染图当成实体制造证明；采访也明确原始 AI 概念往往不可直接制作 |
| GIA《Artificial Intelligence in Jewelry Design》 | 研究展示用真实首饰作为输入生成变化；图 8 包含作者原有银胸针及其 AI 衍生设计 | 用 SUIJI 自己的结构和语言限定探索范围；把异常连接、悬浮镶座等作为人工审查项 | 2024 年研究是方法证据，不代表 2026 年各模型性能排名，也不是自动制造评测 |
| Nervous System · Kinematics | 创作者官方展示铰接三角片首饰和实际 SLS 尼龙打印方法，另有可调参数的设计界面 | 先把可生产空间写进参数与规则，再开放用户定制；功能结构由系统约束 | 属于算法/参数化设计，不是生成式 AI；尼龙工艺不能直接套给钛 |
| Jeweler Studio | 官方展示可嵌入网站的文字/参考图设计、图像预览、线索与订金流程，并另提供 3D 戒指配置器 | 借鉴用户从描述到保存、提交设计的顺畅流程；将「AI 渲染」与「固定 3D 配置器」分清 | 公开内容主要证明图像和获客产品；倍增销售等为供应商宣传，没有据此验证生产 STL/3MF 的尺寸精度 |
| Ideas2IT / JewelBench | 供应商自述图像清理、生成候选 3D、Blender 展示、HD 后续处理的项目 | 研究候选预览与工程交付分阶段的架构 | 自述的降时和“production-quality”不等于第三方制造检验；不照搬其重型多模型系统 |

案例来源：[ALTR/J’evar](https://altr.nyc/blogs/corporate/can-generative-ai-help-online-retailers-design-better-products)、[Delmar 设计总监采访](https://www.jewellerybusiness.com/features/a-case-study-in-ai-jewellery-design/)、[GIA 原研究](https://www.gia.edu/gems-gemology/fall-2024-artificial-intelligence-in-jewelry-design)、[Nervous System 实物与工艺](https://n-e-r-v-o-u-s.com/projects/kinematics/kinematics-jewelry/)、[Kinematics 配置器](https://n-e-r-v-o-u-s.com/kinematics/?t=2)、[Jeweler Studio 官方产品](https://jewelerstudio.ai/)、[Ideas2IT 项目自述](https://www.ideas2it.com/case-studies/ai-cad-modeling-jewelry)。

另外检查了 Juler 官网；当前可读取的公开页只有 AI Jewelry Design 标题和联系表单，未找到足够产品/输出规格，不把它列为已验证方案。[Juler](https://juler.ai/)

## 路线比较与适配

| 方法 | 适合什么 | 生产准确性的来源 | 首版建议 |
|---|---|---|---|
| 文本/图片 → AI 效果图 → 人工 CAD | 创意外形、材质方向、快速讨论 | 后续真实尺寸 CAD、工程复核、实物 | 采用；效果图必须标记为设计意向 |
| 参数化 CAD → 有边界的个性变化 | 外框轮廓、厚度范围、浅浮雕、重复图案及批准的石座 | 受控模板、真实接口、参数约束、工艺 profile | 作为 SUIJI 制造主线；优先复用现有可信原生资产 |
| 图/多视图 → Tripo 候选网格 → 工程重建/修订 | 自由曲面探索、可旋转预览、复杂装饰参考 | 工程化及制造验证，而不是 Tripo 成功状态 | 作为创意分支接入；不让它生成或替换精密连接 |
| 任意提示词 → 整枚戒指网格 → 直接量产 | 当前证据不足 | 没有可直接继承的 SUIJI 公差/连接证据 | 不进入自动生产路径 |

参数化并不要求所有装饰都是规则几何：自由外形可使用经审查的网格制造路线，但接口和关键尺寸要独立验证。没有实际 BRep/CAD 重建时，不把网格转成 STEP 就称作精确参数 CAD。CadQuery 官方支持 STEP 交换、STL/3MF 等网格导出，并说明完整参数信息保留在其 Python 源中；它是工具选项，不要求现有 Rhino/Blender 工程为此迁移。[CadQuery 官方格式说明](https://cadquery.readthedocs.io/en/latest/importexport.html)

## Tripo 接入：截至调研日的关键变化

官方 SDK 文档公告 v2 API 定于 **2026-10-31** 停用，Python 1.0.0 全部使用 v3。这里是官方公告，未以实际付费请求验证服务停机时刻。新功能按 v3 设计；API v3 与模型版本名称分开记录。[官方 SDK 与迁移说明](https://developers.tripo3d.com/en/docs/sdk)

网站应从服务端使用 API；官方也把 CLI 定位为个人/Agent 操作路径，把 API 定位为网站及业务系统集成。[官方 CLI/API 用途说明](https://developers.tripo3d.com/en/docs/cli)

| 事项 | 已核实 / 处理方式 |
|---|---|
| 地区 | 国际 `openapi.tripo3d.ai/v3`，中国大陆 `openapi.tripo3d.com/v3`；必须按实际账户选择，不从中文界面或登录方式推断 |
| 能力 | 文字、图片及多视图生成；异步任务查询、上传与转换；只选项目需要的能力 |
| 原生调用 | 由服务端保存任务 ID，处理 queued/running/success/failed/cancelled；API 成功只表示任务完成 |
| 转换 | 官方列出 STL 与 3MF；同页对 3MF 是否带颜色存在相互矛盾的描述，接入时须拿实际文件验证，首版不依赖其颜色/材料保留 |
| 缩放和修形 | 转换器含 scale_factor、flatten_bottom、重拓扑等选项；这些不是精度修复。不得对批准的连接核心或整件装配自动使用 |
| SDK | 官方文档当日锁定 JS `@vastai/tripo-sdk@0.5.0`、Python `tripo3d==1.0.0`；实施时重新核发行版和契约后固定依赖 |
| 费用 | 账户地区、模型与选项影响用量；Studio 订阅与 API 额度不能混用。此次没有登录、充值或调用生成 |

来源：[API 概述](https://developers.tripo3d.ai/en/docs/introduction)、[格式转换](https://developers.tripo3d.com/en/docs/models-convert)、[官方 SDK](https://developers.tripo3d.com/en/docs/sdk)、[官方珠宝工作流说明](https://www.tripo3d.ai/blog/jewelry-3d-generator)。官方珠宝文章本身也说明网格仍需尺寸和可制造性处理。

官方现有「Tripo 3D Codex Plugin」说明页，描述的是生成 3D 资产及游戏资产能力。本次插件目录搜索 Tripo 返回空列表，未取得实际安装包，**没有完成包级审查，也没有安装或建议立即安装**；文档存在不等于当前账户目录中可用，更不等于有珠宝制造能力。[官方插件说明](https://developers.tripo3d.com/en/docs/codex-plugin)

## Skill 发现与逐包审查

实际执行了 `npx --yes skills find tripo`、`jewelry`、`'3d configurator'`、`cadquery`、`freecad`。下载/安装次数是发现时的目录数据，不能作为生产成功证据。按本地 `skill-vetter` 对选定精确版本全文及其包内文件审查，未安装任何候选。

| 候选与精确版本 | 实际用途 | 审查结论 | 采用建议 |
|---|---|---|---|
| calesthio/generative-media-skills · tripo-3d · `8c85352…` | 异步生成/轮询/转换的操作参考；2 个包内文档，另核许可证 | **BLOCK**：原文含 curl、外部 API 调用，命中本地严格清单；且仍用 v2，存在过时能力与格式内容。不是认定它有恶意代码 | 不安装/执行原包；异步思想可人工转成 v3 服务端实现 |
| aiunlocked1412/claude-skill-unlock · jewelry-designer · `f40e6c3…` | 需求访谈、宝石/材料/镶嵌的设计简报和图像提示词；5 个包内文档，另核许可证 | **WARNING**：没有 CAD 引擎；包含无来源的价格/材质/舒适度等通则与示例证书/出处，不能当事实 | 仅借结构化设计简报思路；换成 SUIJI 已核实事实，不安装原包 |
| github/awesome-copilot · freecad-scripts · `5269f7e…` | 参数化对象、单位、实体/网格和导出 API 开发参考；6 个包内文档，另核许可证 | **WARNING**：文本代码会读取/保存/关闭 ActiveDocument、删除对象、批量导出，亦可调用本机求解器和宏；没有珠宝工艺门禁，也无技能级 semver | CAD 开发资料较合适；仅在任务独占进程、批准源/输出白名单内适配，先验证 API。此次不安装、不运行 |
| 本地 3d-web-experience | 网页旋转、配置、移动端与 GLB 展示 | **SAFE（只限已读文本包）**：包内仅 SKILL.md，无可执行附件；外部示例与安装建议未执行 | 可辅助网页交互；不能承担制造精度或打印认证 |

更完整的权限、文件和风险记录见同目录《skill-vetting-v1.md》。三份远程候选合计核验 16 个文件（含许可证），按 Git blob SHA 和 SHA-256 归档。其他目录结果只列作发现，未审包不推荐安装；没有找到完全符合 SUIJI「创意＋锁定底托接口＋可生产打印验收」的现成 skill。

## 从可看模型到生产文件

建议保留三种交付层次：网页 GLB 负责预览；可编辑 CAD/工程源负责尺寸、接口和修订；STL/3MF 负责工厂认可的打印交换。STL 不携带明确单位，应以 mm 为本项目合同单位并附尺寸核验。3MF 标准支持显式单位，默认毫米；文件仍须在实际工厂软件重新打开验证。格式支持不等于机器已准备执行。[3MF 官方规范](https://github.com/3MFConsortium/spec_core/blob/master/3MF%20Core%20Specification.md)、[Prusa 官方导入格式](https://help.prusa3d.com/article/supported-file-formats_1772)

| 路线 | 先做什么 | 放行凭据 |
|---|---|---|
| 树脂打样 | 选定打印机/树脂/层厚/后处理；核轮廓、接口和装配，清楚说明样件用途 | 已核 STL/3MF、切片回读、实际样件测量与佩戴/装配评审 |
| 直接金属打印 | 选定工厂、具体合金、机器和工艺；核支撑、取粉、变形、表面处理与配合面加工 | 金属工艺 profile、工厂 DFM、首件实测与功能验证，批准后才正式生产 |

树脂打样可用于外形/配合验证；不同树脂和后处理并不等同最终金属性能。将来若决定铸造，要另建铸造工艺，不从「树脂样件」自动推导钛能按普通珠宝铸造路线生产。Formlabs 官方也把样件、可铸造材料和最终功能件的用途分开，具体设计要求依材料而异。[Formlabs 材料用途与流程](https://formlabs.com/support/Using-Castable-Wax-Resin/?language=en_US)

首版不写一个适用于所有机器/材料的最小壁厚或统一公差。工厂须给定关键尺寸及测量方法、打印和抛光/加工后的允许偏差；未知字段保持待确认，生产出口保持关闭。模型检查、工厂软件回读和实物验证缺一不可。

## 已完成与后续依赖

已完成：公开方法研究、5 组 Skills CLI 搜索、选定候选全文审查及源哈希归档、Tripo v3 文档核对、首版 PRD 和工厂信息模板。

当前资料缺口：网站只有 2D 图、BOM、54/57 mm 戒围信息，未提供可担保为工厂签核的 3D 底托/连接接口、配合公差和打印工艺 profile。应由现有原生模型负责人提供批准源，按当前生产控制规则核定，不能从产品图补猜接口。

本次未安装新 skill、未生成模型或花费 API 额度、未启动 Blender/GPU、未发布 AI 功能页面。PRD 支持两条工艺路线，后续验证和开发按阶段推进。

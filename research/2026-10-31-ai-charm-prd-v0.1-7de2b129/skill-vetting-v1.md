# Skill 发现与审查记录 v1

核验日：2026-10-31。审查规则：`/Users/a166/.agents/skills/skill-vetter/SKILL.md` v1.0.0；发现规则：find-skills。此文只记录研究与审查，所有候选均未安装/运行。

## 审查口径

按精确提交核对文件树、SKILL.md 全文、包内文档/脚本/资产及许可证；对所审查的三个远程技能，实际目录均仅有 Markdown 文档，代码位于示例代码块中。未把整个大型仓库视为安装范围。16 个文件的 Git blob SHA 与下载内容重新计算全部相同，SHA-256 见 `skill-audit-source-v1/manifest-v1.json`。

SAFE 仅表示本次静态读取未见阻止使用所审文本的安全问题，不保证工程正确。WARNING 要先适配和再审；BLOCK 表示按当前规则不执行/安装。所有权限下表均为原文示例能力分析，**没有实际授予任何候选运行权限**。

本地 vetter 明确把 `curl/wget` 及网络＋shell 视为阻断项。因此 Tripo 原包的 BLOCK 是遵循该规则，并结合过时接口，不是发现恶意外传的结论。

## 1. tripo-3d — BLOCK

- 来源：[精确技能目录](https://github.com/calesthio/generative-media-skills/tree/8c85352d5d75d4dcbe58480bd138e37b9742bab1/skills/providers/3d-generation/tripo-3d)
- 提交：`8c85352d5d75d4dcbe58480bd138e37b9742bab1`；作者归属 calesthio/generative-media-skills contributors；MIT。
- 审查文件：SKILL.md 20,370 bytes；EVAL.md 13,974 bytes；另核根 LICENSE。未见可执行附件。
- 元数据：可识别名称与用途，原文核验日期 2026-07-10；未提供技能级 semver。
- fileRead：示例读取待上传图像/模型；本次 DENIED 执行。
- fileWrite：示例保存输出；本次 DENIED 执行。
- network：需要向 Tripo API 传图和下载结果；本次 DENIED 执行。
- shell：3 处 curl 示例（含付费 POST）；本次 DENIED 执行。
- 阻断项：curl＋外部 API 命中本地清单；仍使用 `/v2/openapi`，已与当日官方 v3 路线不一致；旧 refine/stylize 能力不能继承；3MF 材料和费用内容须重核。
- 未发现的事项：所审文件没有实际凭据、混淆 payload 或隐藏脚本。环境变量名不等于已有可用 API key。
- 建议：不安装原包。参考其异步任务与失败记录结构，按当前官方 v3 文档另写受控服务端适配。

## 2. jewelry-designer — WARNING

- 来源：[精确目录](https://github.com/aiunlocked1412/claude-skill-unlock/tree/f40e6c332784b7bd66999dd52aafa58cfd4c3816/skills/04-design/jewelry-designer)
- 提交：`f40e6c332784b7bd66999dd52aafa58cfd4c3816`；作者 aiunlock.co；根 LICENSE.txt 为 MIT，并附领域免责声明与 attribution。
- 全部 5 个技能文件：SKILL.md、README.md、templates/prompt-main.md、templates/output-template.md、examples/example-output.md；另核 LICENSE.txt。
- 元数据：名称/说明匹配；技能正文未构成经过版本化验证的制造引擎。许可证中的项目版本不替代技能级能力验证。
- fileRead/fileWrite：文档和简报输入输出；本次不赋予文件操作权限。network/shell：所审包未有执行网络/安装的附件，未授予。
- 内容风险：无来源的材料/价格/舒适度通则；示例含宝石出处、证书和鉴定等具体事实，不能转成 SUIJI 产品真实信息；使用 Midjourney 提示词，不输出 CAD。
- 实际工艺步骤仍是人工 CAD、树脂/蜡样、铸造、镶嵌与 QC；指向的独立 `/3d-modeler` 不在该安装目录内，没有继承其能力。
- 建议：只借鉴设计简报的提问结构，替换全部事实字段；不安装原包。不能用它宣称精准打印。

## 3. freecad-scripts — WARNING

- 来源：[GitHub 官方组织下的社区技能目录](https://github.com/github/awesome-copilot/tree/5269f7ea2d6c3a9bfda5ed878b6726cf509121fd/skills/freecad-scripts)。这不等于 FreeCAD 项目对每段内容的认证。
- 提交：`5269f7ea2d6c3a9bfda5ed878b6726cf509121fd`；作者出处 GitHub awesome-copilot；MIT；无技能级 semver。
- 全部 6 个技能文档：SKILL.md；references 下 scripting-fundamentals、geometry-and-shapes、parametric-objects、gui-and-interface、workbenches-and-advanced；另核 LICENSE。
- fileRead：打开 FCStd/STEP/STL 等源；fileWrite：save/saveAs、模型/图像导出、求解器工作目录；shell/执行：宏和本机求解器调用示例；network：正文是文档链接，没有代码上传数据。以上均没有在本次运行。
- 风险范围：默认取 ActiveDocument；含 removeObject、closeDocument、save、批量导出及用户 Mod 安装说明。若直接照做，可能修改已有工程或覆盖输出；不能用于用户/其他任务拥有的会话，也不能覆盖 T7。
- 工程局限：示例网格公差/倒角数值是演示参数；makeShapeFromMesh/Part.makeSolid 不能自动恢复设计约束或制造意图。包未提供 SUIJI 连接、公差、金属打印/抛光规则或珠宝成品验收。
- 建议：作为 CAD 自动化开发资料，先适配为指定输入、独占进程、新版本输出、无破坏性操作，按实际 FreeCAD 版本小范围验证。没有建议本次安装。

## 4. 本地 3d-web-experience — SAFE（文本指导范围）

- 路径：`/Users/a166/.agents/skills/3d-web-experience/SKILL.md`；已检查目录只有此文件，无 bundled scripts/assets。
- 出处 frontmatter：vibeship-spawner-skills，Apache-2.0 标注；未给技能级 semver。源码授权归属需保留；此次没有重新分发该本地文件。
- 内容：Three.js/R3F/Spline、GLB 展示/配置、性能与移动端回退。包含外部 Spline 地址占位示例和 gltf-transform 安装建议，均未执行。
- fileRead/fileWrite/network/shell：本次只读该文本，没有授予实施权限。新依赖和外部服务应在实施时按精确版本复核。
- 安全和能力结论分开：可用作网页开发提示；不提供 CAD、制造壁厚、公差或实物验证能力。

## 仅发现、未审查，不建议安装

- okou-ai/okou-skills@tripo
- ai-hub-admin/craftsman-agent@jewelry-designer（已核目录/提交，未读其 48 KB 全文）
- flowful-ai/cad-skill@parametric-3d-printing（已核根文件清单，含多个 Python 脚本；未全面审脚本）
- tangency-labs/solidcraft@solidcraft-checking 及其他 CadQuery/FreeCAD 搜索结果
- Tripo 官方 Codex Plugin：已读官方说明；当前插件目录查询无匹配，实际包未取得，审查未完成

对这些候选不授予 SAFE/WARNING 等完整包级结论，也不以相似名称替代目标 skill。

## 推荐组合

复用 SUIJI 现有、已验证的原生建模与生产控制规则，结合自定义的「受控创意简报＋固定接口 CAD＋工艺 profile＋输出验证」工作流。网页展示使用已安装的适用指导；Tripo 网站接入使用官方 v3 SDK/API。后续如写成 SUIJI 专用 skill，还须加入源版本、接口锁、工厂参数、输出白名单、独立审核和失败状态；本次只提出结构，未创建可执行 skill。

# 内部：AI 审核、设计师接管与邮件沟通

本规则供 SUIJI 实施。工艺参数、审批工具和内部证据不会放在顾客的设计页面。

## 审核流程

**顾客提交设计与邮箱 → AI 审核 → 简单且合格范围内自动通过 / 其他进入设计师 → 邮件沟通确认需求 → 制作安排与制造验证。**

| 路径 | 内部动作 | 顾客结果 |
|---|---|---|
| AI 可以确认的简单设计 | 基于已批准模板、接口、工艺及硬检查，自动审批是否可做 | 可以制作＋结果邮件；无每单强制人工等待 |
| AI 未通过 / 不确定 / 信息不足 | 建设计师待办，附原意、版本、原因和建议 | 设计师确认中，邮件补充/沟通 |
| 复杂、新结构或超范围 | 由设计师判断、修改或整理工程需求 | 设计师邮件提出可行方案并确认 |
| AI 通过后发现不行 | 停止原审批继续驱动制作，保留历史，交设计师复核 | 发送需进一步确认的邮件，讨论调整 |

AI 不能自动通过时不直接最终拒绝顾客。设计师可解释限制、请求信息或提出替代，最终确认由真实设计和顾客需求决定。

## 自动通过范围怎样成立

必须有可引用的批准模板/接口和材料工艺范围，关键尺寸、连接、制造硬检查有证据。AI 审核与生成任务分开；审核使用实际来源及检查结果，不能仅凭一张效果图或模型 success 状态批准。

范围内设计可自动审批；新模板或超范围方案先人工评估和验证。审核记录包含提交/设计版本、规则及模型版本、输入证据、结论和理由。制造资格另行记录，树脂与金属独立；现有资格只在被证实覆盖的范围内复用。

## 设计师如何与顾客沟通

1. 打开设计待办，看到顾客原意、所选版本、底托和 AI 发现的问题。
2. 使用 contact@suijijewelry.com 的服务邮件身份回复顾客；围绕具体设计沟通，不发无关营销。
3. 需要时询问尺寸/已有底托/佩戴想法、说明可行修改，确认需求与报价/交期。
4. 修改形成新版本，顾客回复或在对应设计页面确认；确认记录与该版本关联。
5. 重新审核受影响范围，再安排样件/制作。不能默认顾客同意新的造型或需求。

## 邮件事件与文案初稿

服务邮箱为 contact@suijijewelry.com。以下只定义模板和事件；本轮没有发送邮件，也没有声称 Sender/域认证已配置完成。

| 事件 | 主题（中 / EN / FR） | 发出时机 |
|---|---|---|
| 提交回执 | 已收到你的 SUIJI 设计 / We’ve received your SUIJI design / Nous avons reçu votre création SUIJI | 设计与联系邮箱成功持久化后 |
| AI 自动通过 | 你的 SUIJI 设计可以制作 / Your SUIJI design is feasible to make / Votre création SUIJI est réalisable | 审核已记录为可做通过后 |
| 转设计师 | 设计师将与你确认设计 / A designer will review your design with you / Un designer va étudier votre création avec vous | 已进入设计师队列后 |
| 补充或修改 | 关于你的 SUIJI 设计，想与你确认 / A few details about your SUIJI design / Quelques précisions sur votre création SUIJI | 设计师提出明确问题/方案时 |
| 通过后复核 | 你的设计需要进一步确认 / A further review of your design / Une vérification complémentaire de votre création | 后续发现需调整并转设计师时 |

### 提交回执正文

中：我们已收到你的设计 {{design_id}}。我们会先审核这款设计；如果需要补充信息或调整，设计师会通过邮件与你沟通。你可以在这里查看设计：{{design_link}}。

EN: We’ve received your design {{design_id}}. We’ll review it first. If we need further information or any changes, a designer will contact you by email. View your design here: {{design_link}}.

FR: Nous avons bien reçu votre création {{design_id}}. Nous allons d’abord l’étudier. Si des informations complémentaires ou des ajustements sont nécessaires, un designer vous contactera par e-mail. Retrouvez votre création ici : {{design_link}}.

### AI 自动通过正文

中：你的设计 {{design_id}} 已通过制作可行性审核。接下来，我们会与你确认适用的报价、交期及制作安排。请查看当前方案：{{design_link}}。如需求有变化，可直接回复这封邮件。

EN: Your design {{design_id}} has passed our feasibility review. We’ll confirm the applicable quote, lead time and production arrangements with you next. View the current design: {{design_link}}. Reply to this email if your requirements have changed.

FR: Votre création {{design_id}} a passé l’étude de faisabilité. Nous confirmerons ensuite avec vous le devis, le délai et les modalités de fabrication. Consultez la proposition actuelle : {{design_link}}. Si vos souhaits ont changé, vous pouvez répondre à cet e-mail.

### 转设计师正文

中：你的设计 {{design_id}} 需要设计师进一步确认。我们会通过邮件与你讨论具体细节和可行方案；你也可以直接回复补充想法。当前方案：{{design_link}}。

EN: Design {{design_id}} needs a closer review by a designer. We’ll discuss the details and feasible options with you by email. You can also reply with any additional ideas. Current design: {{design_link}}.

FR: Votre création {{design_id}} nécessite une étude complémentaire par un designer. Nous échangerons avec vous par e-mail sur les détails et les options réalisables. Vous pouvez également répondre pour préciser vos idées. Proposition actuelle : {{design_link}}.

### 需要补充或修改正文

由设计师填写 {{specific_questions}}、{{proposed_changes}}，引用准确版本 {{revision_id}}，清楚问顾客要确认什么。不能只有“请联系我”的空通知，也不把 AI 内部判断原样贴给顾客。

### 通过后需进一步确认正文

中：我们在后续确认设计 {{design_id}} 时，发现一些细节需要调整。设计师会通过邮件与你说明情况、讨论可行方案；在重新确认前，我们会先暂停制作安排。你可以在这里查看设计：{{design_link}}。

EN: During a further review of design {{design_id}}, we found some details that need adjustment. A designer will explain them and discuss feasible options with you by email. We’ll hold the production arrangements until they are confirmed. View your design: {{design_link}}.

FR: Lors d’une vérification complémentaire de votre création {{design_id}}, nous avons relevé des détails à ajuster. Un designer vous les expliquera et discutera avec vous des options réalisables par e-mail. La fabrication restera en attente de confirmation. Retrouvez votre création ici : {{design_link}}.

所有变量都是真实设计数据占位符，不是已创建的订单、已发生的审核或已发送邮件。

## 邮件与后台验收

- 邮箱必填并校验格式；保存方案、审核结果及邮件事件，按事件 ID 去重。
- 验证实际发件 Sender、回复地址、域认证与收件；不能用“页面上显示 contact@”代替链路验证。
- 排队、供应商接受、退信与回复分别记录；失败有内部待办和有界重试，不伪称顾客已收到。
- 同一邮件链关联正确设计、版本、问题和顾客确认。设计师身份须获授权，顾客看不到后台。
- 顾客邮件不带 skill/API/工厂日志；不把客户图片、邮件往来或联系人信息提交到公开 GitHub。
- 确认模板、邮箱服务和权限后才接入真实通知；当前交付只更新 PRD。

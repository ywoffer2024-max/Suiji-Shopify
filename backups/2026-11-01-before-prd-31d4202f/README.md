# SUIJI — 施工前备份 / Backup before PRD rev107

本快照区分当前线上版本与未发布候选。没有向Shopify上传、发布或创建主题，也没有启用费用、AI、折扣、邮件或制造服务。

## 当前线上代码

- 实际主主题：207320645972，live；697文件，读取前后官方路径/校验值稳定。
- `live-theme/` 是当前官方接口返回的源表示，697文件自身SHA256/Git blob与本次完整源索引逐一核对。611文件的原字节MD5与官方一致；86份JSON按本次官方接口返回原文保留，其自身SHA明确，但与后台MD5不匹配，**不声称它们与内部存储字节相同**，也不靠猜序列化替换原文。
- 未变媒体与代码复用已存在Git对象，未重新生成或全量重传。
- 本地可变工作源在 `backup-status.json` 的local_work_root；`live-theme`可用于后续本地施工，须另建施工分支。受保护T7来源不覆盖。

## 内容与未发布候选

- `journal-last-published-source/` 保留50份语言正文来源；随附本轮19:05UTC公开正文一致性审计。它不是原生ArticleID、更新时间或翻译digest导出。
- `native-content/service-pages.json` 含4个既有服务Page×英法8份实际正文、ID、标题、SHA；精确updatedAt/digest/未暴露SEO缺口如实保留。
- `native-content/last-published-about-contact/` 是上一发布版的About/Contact英法正文，保留其原验证日期，不冒充本次新鲜Admin API全页导出。
- `unpublished-candidate/` 包含已冻结94成员审阅ZIP、29主题/32维护源差异清单。没有应用到live主题；4新原生信息页还未创建。解包后在新目录按manifest覆盖基线，可还原该未发布候选。

## 恢复边界

1. 本快照可还原当前API提供的697主题代码/资产表示，以及上述已获得的正文与候选。恢复时先创建未发布主题验证，**不得把整个备份仓库根目录或候选ZIP直接推到现有live主题**。任何正式恢复/发布另行按当时授权、角色和实际字段核对。
2. Shopify原生Page、Article、翻译和Menu不是Git主题文件。所备正文需用原ID/handle人工或授权API回填，不能仅靠theme push恢复。精确翻译digest及后台未暴露字段须恢复时重新读取。
3. `template-and-menu-reference-index.json` 保存当前主题配置中的模板/菜单引用，不能替代全部native Menu资源树及全店原生模板绑定。
4. 主题内媒体二进制包含在Git；外部商品/CDN媒体在media索引里是引用，未宣称已备份全部原图、视频、3D、客户上传或授权。CAD/渲染母版不属于此网站快照。
5. 不包含账户密码、API凭证、Cookie、会话、客户、订单、支付、库存、完整折扣/会员资格/邮件/DNS/App数据库。它不是全店事务级灾备，不恢复这些业务状态。
6. 备份分支唯一、非默认分支、commit标记skip ci；当前仓库无活跃GitHub Actions工作流且GitHub Pages未启用。此备份不连接正式部署。未配置新的自动部署入口；保留线上结束核验回执。

## 大型JSON的无损保存

四份大型元数据JSON以`.json.gz`保存；用`gzip -dc 文件.json.gz > 新目录/文件.json`解压，解压后原始SHA256见`compressed-metadata-index.json`。697主题文件仍在普通的`live-theme/`目录中，可直接读取，不包在gzip里。

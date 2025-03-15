# 国企报告标题生成器 StateReportCraft  

**AI驱动的国有企业公文智能架构系统**  
*AI-Powered Report Title & Structure Generator for State-Owned Enterprises*

这是一个帮助国企员工写报告标题的网站工具，通过AI技术自动生成专业的报告总标题和结构化的小标题。

👉 👉 [立即体验](https://report4qiri.netlify.app/) | 📖 [开发文档](#技术架构)
[![GitHub Stars](https://img.shields.io/github/stars/yourname/StateReportCraft?style=social)](https://github.com/QiriZ/StateReportCraft)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📚 适用对象：国企文秘、战略部、合规风控岗、基层汇报人员  

## 🚀 核心功能：  
- 输入需求原话或者关键词（如“数字化转型总结”“安全生产整改方案”），生成国企风格报告标题与层级结构  
- 内置国企常用术语库、政策热点标签与合规性检查  
- 支持导出大纲，无缝衔接后续内容撰写
### 核心优势
- 🚀 **精准匹配国企语境**  
  内嵌国资委高频术语库（2023版），自动关联"党建融合""供给侧改革"等特色表达
- 📈 **逻辑结构化生成**  
  严格遵循"总-分-策"行文结构，支持递进式/并列式/对比式小标题关系可视化
- 🔒 **数据零留存机制**  
  采用浏览器端本地化处理，敏感信息不出本地

## 技术架构
- 前端：HTML5 + CSS3 + JavaScript
- API调用：使用fetch API调用SiliconFlow的DeepSeek-R1模型

## 页面结构
![报告生成器界面截图](media/界面.png)
- **主页面（index.html）**：包含输入框、生成按钮和结果展示区
- **样式文件（style.css）**：定义网站的样式和布局
- **JavaScript文件（script.js）**：处理用户交互和API调用

## 使用方法
1. 在文本框中输入您的文章内容或主要观点
2. 点击"生成标题"按钮
3. 系统将自动生成报告总标题和小标题结构
4. 生成结果会显示在页面下方

| 步骤 | 功能描述 | 技术实现 |
|------|----------|----------|
| 1️⃣ 输入 | 支持自然语言或关键词输入<br>（例："数字化转型总结""安全生产整改"） | 智能语义识别 |
| 2️⃣ 生成 | 一键生成三级标题体系 | DeepSeek-R1 模型 |
| 3️⃣ 优化 | 合规性检查 + 术语匹配 | 国企政策知识库 |
| 4️⃣ 导出 | Markdown/Word 结构化模板 | 前端渲染引擎 |


## 注意事项
- API调用需要稳定的网络连接
- 生成结果仅供参考，可能需要根据实际情况进行调整
- 用户数据不会被存储或用于其他目的








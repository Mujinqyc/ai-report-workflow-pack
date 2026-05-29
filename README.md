# AI 日报周报自动生成工作流包

这是一个面向职场办公场景的小型 AI 数字产品 MVP。

用户输入：

- 今天完成的工作

- 遇到的问题

- 明天的计划

产品输出：

- 正式日报

- 简洁日报

- 领导汇报版

- 周报总结

## 第一版包含内容

- 文档版：产品说明、使用指南、演示脚本

- 表格版：日报/周报输入模板

- 简单网页演示版：本地运行的 HTML 页面

## 第一版暂不包含

- 登录系统

- 支付系统

- 数据库

- 线上部署

- OpenAI API 接入

## 当前目标

先完成一个可以演示、可以交付、可以继续迭代的小型 AI 工作流包。

## 项目结构

```text
docs/
  product_brief.md        产品说明
  user_guide.md           使用指南
  demo_script.md          演示脚本

templates/
  report_input_template.csv      日报/周报输入表格模板
  daily_report_template.md       日报生成模板
  weekly_report_template.md      周报生成模板

web_demo/
  index.html              网页演示入口
  style.css               页面样式
  script.js               报告生成逻辑
  script.test.js          生成逻辑测试

notes/
  build_log.md            构建记录
  review.md               第一版复盘
```

## 如何运行网页演示版

### 方法一：直接打开网页

在项目根目录运行：

```powershell
Start-Process .\web_demo\index.html
```

也可以直接双击打开：

```text
web_demo/index.html
```

### 方法二：检查生成逻辑

在项目根目录运行：

```powershell
& "C:\Users\Qianyuchen\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" .\web_demo\script.test.js
```

看到下面结果，说明核心生成逻辑正常：

```text
OK: report generation tests passed.
```

## 网页演示版使用方式

1. 打开 `web_demo/index.html`
2. 填写“今天完成的工作”
3. 填写“遇到的问题”
4. 填写“明天计划”
5. 点击“生成报告”
6. 复制正式日报、简洁日报、领导汇报版或周报总结

## 第一版状态

当前版本：`v1 本地 MVP`

状态：已完成第一版本地演示闭环。

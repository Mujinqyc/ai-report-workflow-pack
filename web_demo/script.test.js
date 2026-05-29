const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { generateReports } = require("./script.js");

const reports = generateReports({
  completed: "完成网页页面结构\n编写日报生成逻辑",
  problems: "对 JavaScript 事件绑定还不熟悉",
  plan: "优化页面样式\n增加复制按钮",
});

assert.ok(reports.formal.includes("今日工作完成情况"));
assert.ok(reports.short.includes("今日完成"));
assert.ok(reports.leader.includes("今天主要推进了以下工作"));
assert.ok(reports.weekly.includes("本周工作总结"));

const css = fs.readFileSync(path.join(__dirname, "style.css"), "utf8");
assert.ok(css.includes(".copy-button:hover"));
assert.ok(css.includes(".copy-button.is-copied"));

const optimizedReports = generateReports({
  completed: "写页面\n改按钮\n整理文档",
  problems: "不熟 JS\n样式乱",
  plan: "继续优化\n加说明",
});

assert.ok(optimizedReports.formal.includes("完成页面相关内容的编写与整理"));
assert.ok(optimizedReports.formal.includes("优化按钮交互与显示效果"));
assert.ok(optimizedReports.formal.includes("整理项目文档与说明材料"));
assert.ok(!optimizedReports.formal.includes("- 写页面"));
assert.ok(!optimizedReports.formal.includes("- 改按钮"));

console.log("OK: report generation tests passed.");

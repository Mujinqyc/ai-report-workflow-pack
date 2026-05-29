const assert = require("node:assert");
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

console.log("OK: report generation tests passed.");

function normalizeInput(value) {
  return String(value || "").trim();
}

function toBulletList(value) {
  const lines = normalizeInput(value)
    .split(/\r?\n|；|;/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return "- 暂无填写内容";
  }

  return lines.map((line) => `- ${line}`).join("\n");
}

function generateReports(input) {
  const completed = toBulletList(input.completed);
  const problems = toBulletList(input.problems);
  const plan = toBulletList(input.plan);

  return {
    formal: [
      "正式日报",
      "",
      "今日工作完成情况：",
      completed,
      "",
      "遇到的问题：",
      problems,
      "",
      "明日工作计划：",
      plan,
    ].join("\n"),
    short: [
      "简洁日报",
      "",
      "今日完成：",
      completed,
      "",
      "遇到问题：",
      problems,
      "",
      "明日计划：",
      plan,
    ].join("\n"),
    leader: [
      "领导汇报版",
      "",
      "今天主要推进了以下工作：",
      completed,
      "",
      "目前存在的问题是：",
      problems,
      "",
      "明天计划继续推进：",
      plan,
      "",
      "整体进度正常，如有变化会及时同步。",
    ].join("\n"),
    weekly: [
      "周报总结",
      "",
      "本周工作总结：",
      completed,
      "",
      "本周遇到的问题：",
      problems,
      "",
      "下周工作计划：",
      plan,
      "",
      "本周整体工作按照计划推进，后续会继续关注问题处理和任务完成质量。",
    ].join("\n"),
  };
}

function setOutput(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function readFormInput() {
  return {
    completed: document.getElementById("completed").value,
    problems: document.getElementById("problems").value,
    plan: document.getElementById("plan").value,
  };
}

function renderReports(reports) {
  setOutput("formalOutput", reports.formal);
  setOutput("shortOutput", reports.short);
  setOutput("leaderOutput", reports.leader);
  setOutput("weeklyOutput", reports.weekly);
}

function fillExample() {
  document.getElementById("completed").value = [
    "完成网页页面结构",
    "编写日报生成逻辑",
    "整理产品说明文档",
  ].join("\n");
  document.getElementById("problems").value = [
    "对 JavaScript 事件绑定还不熟悉",
    "页面样式在不同宽度下显示不稳定",
  ].join("\n");
  document.getElementById("plan").value = [
    "优化页面样式",
    "增加复制按钮",
    "整理演示脚本",
  ].join("\n");
}

function clearAll() {
  document.getElementById("completed").value = "";
  document.getElementById("problems").value = "";
  document.getElementById("plan").value = "";
  renderReports({
    formal: "点击“生成报告”后显示内容。",
    short: "点击“生成报告”后显示内容。",
    leader: "点击“生成报告”后显示内容。",
    weekly: "点击“生成报告”后显示内容。",
  });
}

async function copyOutput(targetId, button) {
  const text = document.getElementById(targetId).textContent;
  await navigator.clipboard.writeText(text);
  const originalText = button.textContent;
  button.textContent = "已复制";
  window.setTimeout(() => {
    button.textContent = originalText;
  }, 1200);
}

function initPage() {
  const form = document.getElementById("reportForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderReports(generateReports(readFormInput()));
  });

  document.getElementById("fillExample").addEventListener("click", fillExample);
  document.getElementById("clearAll").addEventListener("click", clearAll);

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", () => {
      copyOutput(button.dataset.copyTarget, button).catch(() => {
        button.textContent = "复制失败";
      });
    });
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initPage);
}

if (typeof module !== "undefined") {
  module.exports = { generateReports, toBulletList };
}

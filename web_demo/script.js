function normalizeInput(value) {
  return String(value || "").trim();
}

function parseInputLines(value) {
  return normalizeInput(value)
    .split(/\r?\n|；|;/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function optimizeLine(line, type) {
  const text = line.trim().replace(/\s+/g, " ");
  const lowerText = text.toLowerCase();

  if (type === "completed") {
    if (text.includes("页面") && (text.includes("写") || text.includes("做"))) {
      return "完成页面相关内容的编写与整理";
    }
    if (text.includes("按钮") && (text.includes("改") || text.includes("优化"))) {
      return "优化按钮交互与显示效果";
    }
    if (text.includes("文档") && (text.includes("整理") || text.includes("写"))) {
      return "整理项目文档与说明材料";
    }
    if (text.includes("测试")) {
      return `完成${text.replace(/^完成/, "")}，验证核心功能是否正常`;
    }
    if (text.startsWith("写")) {
      return `编写${text.slice(1)}相关内容`;
    }
    if (text.startsWith("改")) {
      return `优化${text.slice(1)}相关内容`;
    }
    if (!/^(完成|优化|整理|编写|修复|新增|增加)/.test(text)) {
      return `推进${text}相关工作`;
    }
    return text;
  }

  if (type === "problems") {
    if ((text.includes("不熟") || text.includes("不会")) && lowerText.includes("js")) {
      return "对 JavaScript 事件绑定和页面交互逻辑还不够熟悉";
    }
    if (text.includes("样式") && (text.includes("乱") || text.includes("不稳定"))) {
      return "页面样式在不同宽度下显示还不够稳定";
    }
    if (text.includes("报错")) {
      return `出现${text}问题，需要继续定位原因`;
    }
    if (text.startsWith("不熟")) {
      return `对${text.slice(2)}还不够熟悉，需要继续练习`;
    }
    if (!/^(对|页面|当前|存在|出现)/.test(text)) {
      return `当前需要处理的问题：${text}`;
    }
    return text;
  }

  if (type === "plan") {
    if (text.includes("继续") && text.includes("优化")) {
      return "继续优化页面体验和生成结果质量";
    }
    if (text.includes("说明") || text.includes("文档")) {
      return "补充项目说明和使用文档";
    }
    if (text.includes("按钮")) {
      return "完善按钮交互与复制反馈";
    }
    if (text.startsWith("加")) {
      return `增加${text.slice(1)}相关功能`;
    }
    if (!/^(优化|增加|整理|完成|补充|修复|继续)/.test(text)) {
      return `继续推进${text}相关工作`;
    }
    return text;
  }

  return text;
}

function toBulletList(value, type = "general") {
  const lines = parseInputLines(value);

  if (lines.length === 0) {
    return "- 暂无填写内容";
  }

  return lines.map((line) => `- ${optimizeLine(line, type)}`).join("\n");
}

function generateReports(input) {
  const completed = toBulletList(input.completed, "completed");
  const problems = toBulletList(input.problems, "problems");
  const plan = toBulletList(input.plan, "plan");

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
  button.classList.add("is-copied");
  button.textContent = "已复制";
  window.setTimeout(() => {
    button.classList.remove("is-copied");
    button.textContent = originalText;
    button.blur();
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
  module.exports = { generateReports, toBulletList, optimizeLine };
}

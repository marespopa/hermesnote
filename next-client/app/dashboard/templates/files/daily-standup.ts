import { getDate } from "@/app/services/date-utils";
import { MarkdownTemplate } from "..";

const date = getDate();

const DailyStandupTemplate: MarkdownTemplate = {
  filename: "daily-standup",
  frontMatter: {
    title: "Daily Standup Status",
    description: `A note about your daily standup status`,
    tags: "daily,engineering,status,meeting",
  },
  content: `**${date}**

# 🗓️ Daily Standup Status

---

## ✅ What did you accomplish yesterday?
- Example: Fixed Bug #123.

---

## 🎯 What are you planning to do today?
- Example: Implement authentication for FeatureY.

---

## 🚧 Are there any blockers or impediments?
- Example: Waiting for approval on PR #789.

---

## 📝 Additional Notes (Optional)
- Example: Suggesting a quick sync on FeatureZ.`,
};

export default DailyStandupTemplate;

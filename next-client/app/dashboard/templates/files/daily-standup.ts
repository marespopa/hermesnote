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

## 🕰️ What did you accomplish yesterday?

Share the tasks or work you completed the previous day. Be concise and specific.

## 💻 What are you planning to do today?

Mention the tasks you intend to work on during the current day. It's important to communicate your priorities.

## 🚧 Are there any blockers or impediments?

If you're facing any challenges or obstacles that are preventing you from making progress, mention them. This allows the team to offer help or find solutions.`,
};

export default DailyStandupTemplate;

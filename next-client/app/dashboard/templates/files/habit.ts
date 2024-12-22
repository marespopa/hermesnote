import { getDatesOfCurrentWeek } from "@/app/services/date-utils";
import { MarkdownTemplate } from "..";

const dates = getDatesOfCurrentWeek();

const ExampleTemplate: MarkdownTemplate = {
  filename: "habit-tracker",
  frontMatter: {
    title: "Habit Tracker",
    description: `An easy way to track habits.`,
    tags: "habit,productivity,tracker",
  },
  content: `# 🌟 Habit Tracker

## 🗓️ Weekly Habit Overview

### ${dates[0]}
- Habit: ✅ or ❌

### ${dates[1]}
- Habit: ✅ or ❌

### ${dates[2]}
- Habit: ✅ or ❌

### ${dates[3]}
- Habit: ✅ or ❌

### ${dates[4]}
- Habit: ✅ or ❌

### ${dates[5]}
- Habit: ✅ or ❌

### ${dates[6]}
- Habit: ✅ or ❌

---

## 📊 Progress Summary

- Habit: 6/7 days

---

### 🌈 How to Use:
1. Update each day with ✅ for completed or ❌ for missed habits.
2. At the end of the week, count how many days each habit was completed.`,
};

export default ExampleTemplate;

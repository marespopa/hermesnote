import { MarkdownTemplate } from "..";

const MonthlyBudgetTemplate: MarkdownTemplate = {
  filename: "budget-month",
  frontMatter: {
    title: "Monthly Budget",
    description: `This monthly budget template helps you track income, expenses, and savings with clear sections for fixed and variable costs.`,
    tags: "budget,finance",
  },
  content: `# 💰 Monthly Budget

## 📅 Month: [Insert Month and Year]

### **💸 Income**
- **Total Income:** [Amount]

### **🏠 Expenses**
- **Expense 1:** [Amount]
- **Total Expenses:** **[Total Amount]**

### **💡 Savings & Investments**
- **Savings:** [Amount]
- **Investments:** [Amount]
- **Total Savings & Investments:** **[Total Amount]**

### **💡 Saving Recommendations**
- **Emergency Fund:** Save 3-6 months of expenses.
- **Retirement:** Contribute 10-15% of income.
- **Investments:** Diversify your investments.
- **Savings Goal:** Aim to save at least 20% of income.

### **🎯 Summary**
- **Total Income:** [Amount]
- **Total Expenses:** [Amount]
- **Total Savings & Investments:** [Amount]
- **Remaining Balance:** **[Income - Expenses - Savings]**`,
};

export default MonthlyBudgetTemplate;

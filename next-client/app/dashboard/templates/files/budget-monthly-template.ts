import { MarkdownTemplate } from "..";

const MonthlyBudgetTemplate: MarkdownTemplate = {
  filename: "expenses-template.md",
  frontMatter: {
    title: "Monthly Budget Template",
    description: `Use this template to keep track of your monthly budget and maintain a clear overview of your budget.`,
    tags: "budget,monthly budget,economy,expenses",
  },
  content: `
  # Monthly Expenses Template
  
  Use this template to keep track of your monthly expenses and maintain a clear overview of your budget.
  
  ## Month: [Insert Month and Year]
  
  ### Income
  - [ ] Salary/Wages: $_________________
  - [ ] Additional Income: $_________________
  - [ ] Other Sources: $_________________
  - [ ] Total Income: $_________________
  
  ### Fixed Expenses
  - [ ] Rent/Mortgage: $_________________
  - [ ] Utilities (Electricity, Water, Gas, Internet, etc.): $_________________
  - [ ] Loan Payments: $_________________
  - [ ] Insurance (Health, Auto, Home, etc.): $_________________
  - [ ] Transportation (Gas, Public Transit, Car Payment): $_________________
  - [ ] Groceries: $_________________
  - [ ] Total Fixed Expenses: $_________________
  
  ### Variable Expenses
  - [ ] Dining Out: $_________________
  - [ ] Entertainment: $_________________
  - [ ] Shopping (Clothing, Personal Items): $_________________
  - [ ] Health and Fitness: $_________________
  - [ ] Travel: $_________________
  - [ ] Miscellaneous: $_________________
  - [ ] Total Variable Expenses: $_________________
  
  ### Savings and Investments
  - [ ] Retirement Savings: $_________________
  - [ ] Emergency Fund: $_________________
  - [ ] Other Savings: $_________________
  - [ ] Total Savings: $_________________
  
  ### Summary
  - [ ] Total Expenses (Fixed + Variable): $_________________
  - [ ] Total Savings and Investments: $_________________
  - [ ] Remaining Funds (Income - Total Expenses): $_________________
  
  ## Notes:
  - [ ] Add any additional notes or reminders related to your expenses and budgeting for the month.
  
  Use this template to fill in the amounts as you track your monthly income and expenses. It will help you stay organized and make informed financial decisions.
  `,
};

export default MonthlyBudgetTemplate;

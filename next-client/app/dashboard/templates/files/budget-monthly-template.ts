import { getMonth, getYear } from "@/app/services/date-utils";
import { MarkdownTemplate } from "..";

const month = getMonth();
const year = getYear();

const MonthlyBudgetTemplate: MarkdownTemplate = {
  filename: "expenses-template",
  frontMatter: {
    title: "Monthly Budget",
    description: `Use this template to keep track of your monthly budget and maintain a clear overview of your budget.`,
    tags: "budget,monthly budget,economy,expenses",
  },
  content: `
  # Monthly Expenses Template
  
  Use this template to keep track of your monthly expenses and maintain a clear overview of your budget.
  
  ## Month: [${month} ${year}]
  
  ### Income
  - [ ] Salary/Wages: $
  - [ ] Additional Income: $
  - [ ] Other Sources: $
  - [ ] Total Income: $
  
  ### Fixed Expenses
  - [ ] Rent/Mortgage: $
  - [ ] Utilities (Electricity, Water, Gas, Internet, etc.): $
  - [ ] Loan Payments: $
  - [ ] Insurance (Health, Auto, Home, etc.): $
  - [ ] Transportation (Gas, Public Transit, Car Payment): $
  - [ ] Groceries: $
  - [ ] Total Fixed Expenses: $
  
  ### Variable Expenses
  - [ ] Dining Out: $
  - [ ] Entertainment: $
  - [ ] Shopping (Clothing, Personal Items): $
  - [ ] Health and Fitness: $
  - [ ] Travel: $
  - [ ] Miscellaneous: $
  - [ ] Total Variable Expenses: $
  
  ### Savings and Investments
  - [ ] Retirement Savings: $
  - [ ] Emergency Fund: $
  - [ ] Other Savings: $
  - [ ] Total Savings: $
  
  ### Summary
  - [ ] Total Expenses (Fixed + Variable): $
  - [ ] Total Savings and Investments: $
  - [ ] Remaining Funds (Income - Total Expenses): $
  
  ## Notes:
  - [ ] Add any additional notes or reminders related to your expenses and budgeting for the month.
  
  *Use this template to fill in the amounts as you track your monthly income and expenses. It will help you stay organized and make informed financial decisions.*
  `,
};

export default MonthlyBudgetTemplate;

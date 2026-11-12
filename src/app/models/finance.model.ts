export type TransactionType = 'expense' | 'income';

export type ExpenseCategory =
  | 'Food'
  | 'Tech'
  | 'Housing'
  | 'Transport'
  | 'Entertainment'
  | 'Investments';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: ExpenseCategory;
  date: string;
  paymentMethod: string;
  notes?: string;
}

export interface CategoryBudget {
  category: ExpenseCategory;
  allocated: number;
  spent: number;
  color: string;
  icon: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
}

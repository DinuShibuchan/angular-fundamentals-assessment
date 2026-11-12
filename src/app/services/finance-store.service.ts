import { Injectable, computed, signal } from '@angular/core';
import {
  CategoryBudget,
  ExpenseCategory,
  FinancialSummary,
  Transaction
} from '../models/finance.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceStoreService {
  // Global Monthly Budget
  readonly monthlyBudget = signal<number>(4500);

  // Active Category Filter
  readonly selectedFilter = signal<string>('All');

  // Transactions State
  readonly transactions = signal<Transaction[]>([
    {
      id: 'tx-101',
      title: 'Whole Foods Grocery',
      amount: 142.5,
      type: 'expense',
      category: 'Food',
      date: '2026-11-10',
      paymentMethod: 'Credit Card',
      notes: 'Weekly fresh groceries and supplies'
    },
    {
      id: 'tx-102',
      title: 'AWS Cloud Hosting',
      amount: 89.0,
      type: 'expense',
      category: 'Tech',
      date: '2026-11-09',
      paymentMethod: 'Corporate Debit',
      notes: 'Production cluster hosting'
    },
    {
      id: 'tx-103',
      title: 'Senior Developer Salary',
      amount: 6200.0,
      type: 'income',
      category: 'Investments',
      date: '2026-11-01',
      paymentMethod: 'Direct Deposit',
      notes: 'Monthly direct salary transfer'
    },
    {
      id: 'tx-104',
      title: 'Metro Transit Pass',
      amount: 75.0,
      type: 'expense',
      category: 'Transport',
      date: '2026-11-05',
      paymentMethod: 'Apple Pay',
      notes: 'Monthly rapid transit pass'
    },
    {
      id: 'tx-105',
      title: 'Apartment Rental Lease',
      amount: 1650.0,
      type: 'expense',
      category: 'Housing',
      date: '2026-11-02',
      paymentMethod: 'Bank Transfer',
      notes: 'Monthly apartment rent and utilities'
    },
    {
      id: 'tx-106',
      title: 'GitHub Enterprise & Copilot',
      amount: 39.0,
      type: 'expense',
      category: 'Tech',
      date: '2026-11-07',
      paymentMethod: 'Credit Card',
      notes: 'Developer tooling subscription'
    },
    {
      id: 'tx-107',
      title: 'IMAX Cinema & Dinner',
      amount: 68.0,
      type: 'expense',
      category: 'Entertainment',
      date: '2026-11-08',
      paymentMethod: 'Credit Card',
      notes: 'Weekend movie with team'
    },
    {
      id: 'tx-108',
      title: 'Index Fund Investment (S&P)',
      amount: 600.0,
      type: 'expense',
      category: 'Investments',
      date: '2026-11-04',
      paymentMethod: 'Auto Debit',
      notes: 'Long-term diversified mutual fund contribution'
    }
  ]);

  // Computed: Filtered Transactions
  readonly filteredTransactions = computed(() => {
    const filter = this.selectedFilter();
    const list = this.transactions();
    if (filter === 'All') {
      return list;
    }
    return list.filter((t) => t.category === filter);
  });

  // Computed: Financial Summary
  readonly summary = computed<FinancialSummary>(() => {
    const list = this.transactions();
    let totalIncome = 0;
    let totalExpenses = 0;

    for (const tx of list) {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else {
        totalExpenses += tx.amount;
      }
    }

    const netSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

    return {
      totalIncome,
      totalExpenses,
      netSavings,
      savingsRate
    };
  });

  // Computed: Category Budgets & Spending
  readonly categoryBudgets = computed<CategoryBudget[]>(() => {
    const list = this.transactions();
    const allocations: Record<ExpenseCategory, { allocated: number; color: string; icon: string }> = {
      Housing: { allocated: 1800, color: '#38bdf8', icon: '🏠' },
      Food: { allocated: 600, color: '#2dd4bf', icon: '🥗' },
      Tech: { allocated: 300, color: '#818cf8', icon: '💻' },
      Transport: { allocated: 250, color: '#f59e0b', icon: '🚆' },
      Entertainment: { allocated: 200, color: '#f43f5e', icon: '🎬' },
      Investments: { allocated: 1000, color: '#34d399', icon: '📈' }
    };

    const spentMap: Record<ExpenseCategory, number> = {
      Housing: 0,
      Food: 0,
      Tech: 0,
      Transport: 0,
      Entertainment: 0,
      Investments: 0
    };

    for (const tx of list) {
      if (tx.type === 'expense' && spentMap[tx.category] !== undefined) {
        spentMap[tx.category] += tx.amount;
      }
    }

    return (Object.keys(allocations) as ExpenseCategory[]).map((cat) => ({
      category: cat,
      allocated: allocations[cat].allocated,
      spent: spentMap[cat],
      color: allocations[cat].color,
      icon: allocations[cat].icon
    }));
  });

  // Actions
  setFilter(category: string): void {
    this.selectedFilter.set(category);
  }

  addTransaction(newTx: Omit<Transaction, 'id'>): void {
    const id = 'tx-' + (Date.now() % 100000);
    this.transactions.update((curr) => [{ ...newTx, id }, ...curr]);
  }

  deleteTransaction(id: string): void {
    this.transactions.update((curr) => curr.filter((t) => t.id !== id));
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceStoreService } from '../../services/finance-store.service';
import { ExpenseCategory, TransactionType } from '../../models/finance.model';

@Component({
  selector: 'app-transactions-ledger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-ledger.component.html',
  styleUrl: './transactions-ledger.component.css'
})
export class TransactionsLedgerComponent {
  readonly store = inject(FinanceStoreService);
  private readonly router = inject(Router);

  // New Transaction Form State
  readonly isAdding = signal<boolean>(false);
  newTitle = '';
  newAmount: number | null = null;
  newType: TransactionType = 'expense';
  newCategory: ExpenseCategory = 'Food';
  newMethod = 'Credit Card';
  newNotes = '';

  readonly categories: ExpenseCategory[] = [
    'Food',
    'Tech',
    'Housing',
    'Transport',
    'Entertainment',
    'Investments'
  ];

  toggleAddForm(): void {
    this.isAdding.update((v) => !v);
  }

  submitTransaction(): void {
    if (!this.newTitle.trim() || !this.newAmount || this.newAmount <= 0) {
      return;
    }

    this.store.addTransaction({
      title: this.newTitle.trim(),
      amount: this.newAmount,
      type: this.newType,
      category: this.newCategory,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: this.newMethod,
      notes: this.newNotes.trim() || undefined
    });

    // Reset form
    this.newTitle = '';
    this.newAmount = null;
    this.newNotes = '';
    this.isAdding.set(false);
  }

  openBudgetAnalytics(): void {
    void this.router.navigate(['/budget-analytics']);
  }
}

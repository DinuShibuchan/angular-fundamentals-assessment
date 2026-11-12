import { Routes } from '@angular/router';
import { TransactionsLedgerComponent } from './components/transactions-ledger/transactions-ledger.component';
import { BudgetAnalyticsComponent } from './components/budget-analytics/budget-analytics.component';

export const routes: Routes = [
  {
    path: 'transactions',
    component: TransactionsLedgerComponent,
    title: 'SpendWise | Transactions Ledger'
  },
  {
    path: 'budget-analytics',
    component: BudgetAnalyticsComponent,
    title: 'SpendWise | Budget Analytics'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'transactions'
  },
  {
    path: '**',
    redirectTo: 'transactions'
  }
];

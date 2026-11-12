import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FinanceStoreService } from '../../services/finance-store.service';
import { CurrencyGatewayService, ExchangeRates } from '../../services/currency-gateway.service';

@Component({
  selector: 'app-budget-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './budget-analytics.component.html',
  styleUrl: './budget-analytics.component.css'
})
export class BudgetAnalyticsComponent implements OnInit {
  readonly store = inject(FinanceStoreService);
  private readonly currencyGateway = inject(CurrencyGatewayService);
  private readonly router = inject(Router);

  readonly exchangeData = signal<ExchangeRates | null>(null);
  readonly isLoadingRates = signal<boolean>(false);

  ngOnInit(): void {
    this.refreshCurrencyRates();
  }

  refreshCurrencyRates(): void {
    this.isLoadingRates.set(true);
    this.currencyGateway.fetchExchangeRates().subscribe({
      next: (data) => {
        this.exchangeData.set(data);
        this.isLoadingRates.set(false);
      },
      error: () => {
        this.isLoadingRates.set(false);
      }
    });
  }

  calculatePercent(spent: number, allocated: number): number {
    if (allocated <= 0) return 0;
    return Math.min(100, Math.round((spent / allocated) * 100));
  }

  navigateBack(): void {
    void this.router.navigate(['/transactions']);
  }
}

import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface ExchangeRates {
  base: string;
  rates: { [key: string]: number };
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyGatewayService {
  fetchExchangeRates(): Observable<ExchangeRates> {
    return of({
      base: 'USD',
      rates: {
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.79,
        INR: 84.4,
        JPY: 154.2
      },
      timestamp: new Date().toLocaleTimeString()
    }).pipe(delay(350));
  }
}

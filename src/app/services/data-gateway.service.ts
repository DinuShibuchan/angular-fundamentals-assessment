import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataGatewayService {
  refresh(): Observable<string> {
    return of('Service successfully refreshed simulated HTTP response at ' + new Date().toLocaleTimeString()).pipe(
      delay(300)
    );
  }
}

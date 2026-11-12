import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArchitectureStoreService } from '../services/architecture-store.service';

@Component({
  selector: 'app-routing-example',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './routing-example.component.html',
  styleUrl: './routing-example.component.css'
})
export class RoutingExampleComponent {
  private readonly router = inject(Router);
  readonly store = inject(ArchitectureStoreService);

  navigateBack(): void {
    void this.router.navigate(['/architecture']);
  }
}

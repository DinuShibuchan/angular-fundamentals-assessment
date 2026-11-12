import { Injectable, computed, signal } from '@angular/core';
import { ArchitectureLayer } from '../models/architecture-layer.type';

@Injectable({
  providedIn: 'root'
})
export class ArchitectureStoreService {
  readonly layers = signal<ArchitectureLayer[]>([
    {
      name: 'Bootstrap',
      category: 'Core',
      file: 'src/main.ts',
      accent: '#2dd4bf',
      summary: 'Starts one standalone Angular application.',
      detail: 'bootstrapApplication initializes AppComponent with root providers such as provideRouter() without NgModules.'
    },
    {
      name: 'Standalone UI',
      category: 'UI',
      file: 'src/app/components/architecture-page.component.ts',
      accent: '#60a5fa',
      summary: 'Focused, self-contained component tree.',
      detail: 'Standalone components explicitly declare their template, styles, and imports directly for high modularity.'
    },
    {
      name: 'Services + DI',
      category: 'Logic',
      file: 'src/app/services/data-gateway.service.ts',
      accent: '#fbbf24',
      summary: 'Shared logic behind an injectable boundary.',
      detail: 'Dependency injection keeps UI lean and makes business capabilities modular, reusable, and easily testable.'
    },
    {
      name: 'Routing',
      category: 'Navigation',
      file: 'src/app/app.routes.ts',
      accent: '#fb7185',
      summary: 'URLs select screen-level components.',
      detail: 'The Angular Router renders the matching route inside <router-outlet> with both declarative and programmatic navigation.'
    },
    {
      name: 'Reactive State',
      category: 'State',
      file: 'src/app/services/architecture-store.service.ts',
      accent: '#a78bfa',
      summary: 'Signals drive granular, reactive UI updates.',
      detail: 'Signals and computed values manage state changes and trigger surgical template updates with peak performance.'
    }
  ]);

  readonly selectedName = signal<string>('Bootstrap');

  readonly selected = computed(() =>
    this.layers().find(layer => layer.name === this.selectedName()) ?? this.layers()[0]
  );

  select(name: string): void {
    this.selectedName.set(name);
  }
}

import { Routes } from '@angular/router';
import { ArchitecturePageComponent } from './components/architecture-page.component';
import { RoutingExampleComponent } from './components/routing-example.component';

export const routes: Routes = [
  {
    path: 'architecture',
    component: ArchitecturePageComponent,
    title: 'Architecture Lab | Angular Fundamentals'
  },
  {
    path: 'routing-example',
    component: RoutingExampleComponent,
    title: 'Routing Example | Angular Fundamentals'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'architecture'
  },
  {
    path: '**',
    redirectTo: 'architecture'
  }
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'coffees' },
  {
    path: 'coffees',
    loadChildren: () =>
      import('./features/coffee/coffee.routes').then((m) => m.COFFEE_ROUTES),
  },
];

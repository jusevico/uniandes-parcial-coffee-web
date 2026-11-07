import { Routes } from '@angular/router';
import { CoffeeState } from './logic/coffee.state';
import { CoffeeListPage } from './presentation/pages/coffee-list-page/coffee-list-page';
import { CoffeeService } from './services/coffee.service';

export const COFFEE_ROUTES: Routes = [
  {
    path: '',
    providers: [CoffeeService, CoffeeState],
    component: CoffeeListPage,
  },
];

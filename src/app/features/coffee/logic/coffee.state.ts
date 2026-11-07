import { Injectable, inject, signal } from '@angular/core';
import { Coffee } from '../services/coffee.model';
import { CoffeeService } from '../services/coffee.service';

@Injectable()
export class CoffeeState {
  private readonly service = inject(CoffeeService);

  readonly coffees = signal<Coffee[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.service.getCoffees().subscribe({
      next: (data) => {
        this.coffees.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load coffees');
        this.loading.set(false);
      },
    });
  }
}

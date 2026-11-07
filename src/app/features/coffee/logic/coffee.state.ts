import { Injectable, computed, inject, signal } from '@angular/core';
import { COFFEE_TYPE, Coffee } from '../services/coffee.model';
import { CoffeeService } from '../services/coffee.service';

@Injectable()
export class CoffeeState {
  private readonly service = inject(CoffeeService);

  readonly coffees = signal<Coffee[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly originCount = computed(
    () => this.coffees().filter((c) => c.type === COFFEE_TYPE.ORIGIN).length,
  );

  readonly blendCount = computed(
    () => this.coffees().filter((c) => c.type === COFFEE_TYPE.BLEND).length,
  );

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

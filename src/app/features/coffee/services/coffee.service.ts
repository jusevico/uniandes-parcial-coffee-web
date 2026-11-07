import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CoffeeDto } from './coffee.dto';
import { Coffee } from './coffee.model';

@Injectable()
export class CoffeeService {
  private readonly http = inject(HttpClient);

  getCoffees(): Observable<Coffee[]> {
    return this.http
      .get<CoffeeDto[]>(environment.coffeesUrl)
      .pipe(
        map((items) =>
          items.map(
            (d) => new Coffee(d.id, d.nombre, d.tipo, d.region, d.sabor, d.altura, d.imagen),
          ),
        ),
      );
  }
}

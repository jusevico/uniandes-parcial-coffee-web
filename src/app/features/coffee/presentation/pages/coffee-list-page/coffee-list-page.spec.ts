import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoffeeState } from '../../../logic/coffee.state';
import { COFFEE_TYPE, Coffee } from '../../../services/coffee.model';
import { CoffeeService } from '../../../services/coffee.service';
import { CoffeeListPage } from './coffee-list-page';

describe('CoffeeListPage', () => {
  let fixture: ComponentFixture<CoffeeListPage>;
  let element: HTMLElement;

  const coffees: Coffee[] = [
    new Coffee(1, 'Café Especial para tí', COFFEE_TYPE.BLEND, 'Angelópolis, Antioquia', 'Panela', 1920, 'img1.jpg'),
    new Coffee(2, 'Café Especial Navegante', COFFEE_TYPE.ORIGIN, 'Guatapé, Antioquia', 'Cítrico', 1800, 'img2.jpg'),
    new Coffee(3, 'Café Especial El Prístino', COFFEE_TYPE.BLEND, 'Chinchiná, Caldas', 'Chocolate', 1700, 'img3.jpg'),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeListPage],
      providers: [
        CoffeeState,
        { provide: CoffeeService, useValue: { getCoffees: () => of(coffees) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeListPage);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render the header row plus one row per coffee', () => {
    expect(element.querySelectorAll('thead tr').length).toBe(1);
    expect(element.querySelectorAll('tbody tr').length).toBe(3);
    expect(element.querySelectorAll('table tr').length).toBe(4);
  });

  it('should render the table header columns', () => {
    const headers = Array.from(element.querySelectorAll('thead th')).map((th) =>
      th.textContent?.trim(),
    );
    expect(headers).toEqual(['#', 'Nombre', 'Tipo', 'Región']);
  });

  it('should render the data of each coffee', () => {
    const firstRowCells = Array.from(element.querySelectorAll('tbody tr:first-child > *')).map(
      (cell) => cell.textContent?.trim(),
    );
    expect(firstRowCells).toEqual(['1', 'Café Especial para tí', 'Blend', 'Angelópolis, Antioquia']);
  });

  it('should show the total per coffee type', () => {
    const totals = element.querySelectorAll('.coffee-totals p');
    expect(totals[0].textContent).toContain('Total café de origen: 1');
    expect(totals[1].textContent).toContain('Total café blend: 2');
  });
});

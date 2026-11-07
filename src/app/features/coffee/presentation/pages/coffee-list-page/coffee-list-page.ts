import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CoffeeState } from '../../../logic/coffee.state';

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list-page.html',
  styleUrl: './coffee-list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeeListPage implements OnInit {
  protected readonly state = inject(CoffeeState);

  ngOnInit(): void {
    this.state.load();
  }
}

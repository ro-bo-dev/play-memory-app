import { Component } from '@angular/core';
import { MemoryCardModel } from '../model/memory-card.model';
import { MemoryCardService } from '../service/memory-card.service';
import { Store } from '@ngrx/store';
import { selectMemoryCards } from '../state/memory-card.selector';
import { MemoryCardActions } from '../state/memory-card.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ MemoryCardService ]
})
export class HomePage {

  memoryCards$ = this.store.select(selectMemoryCards);

  boxSize: number = 100;

  constructor(private memoryCardService: MemoryCardService, private store: Store) {
    this.getBoxSize();
  }

  ngOnInit() {
    let memoryCards = this.memoryCardService.createMemoryCards();
    this.store.dispatch(MemoryCardActions.createMemoryCards({ memoryCards }))
  }

  getBoxSize() {
    let totalSurface = window.innerWidth * window.innerHeight;
    let boxSurface = totalSurface / this.memoryCardService.cardCount;
    this.boxSize = Math.sqrt(boxSurface) * .8;
  }

}

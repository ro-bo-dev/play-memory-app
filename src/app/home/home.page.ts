import { Component } from '@angular/core';
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
  foundPairs: number = 0;
  unveilCount: number = 0;
  cardCount: number;

  gotLucky: number = 0;
  matchOnSecondUnveil: number = 0;

  boxSize: number = 100;
  window: any = window;

  constructor(private memoryCardService: MemoryCardService, private store: Store) {
    this.getBoxSize();
    this.cardCount = memoryCardService.getCardCount();
  }

  ngOnInit() {
    let memoryCards = this.memoryCardService.createMemoryCards();
    this.store.dispatch(MemoryCardActions.createMemoryCards({ memoryCards }))

    this.memoryCards$.subscribe((memoryCards => {
      this.foundPairs = Math.floor(memoryCards.filter(memoryCard => memoryCard.uncovered === true).length * .5);
      this.unveilCount = this.memoryCardService.getUnveilCount();
      this.gotLucky = Math.floor(memoryCards.filter(memoryCard => memoryCard.uncovered && memoryCard.unveilCount == 1).length * .5);
      this.matchOnSecondUnveil = memoryCards.filter(memoryCard => memoryCard.uncovered && memoryCard.unveilCount == 2).length;
    }));
  }

  onCardCountChange(value: number) {
    this.gotLucky = 0;
    this.matchOnSecondUnveil = 0;

    this.memoryCardService.resetUnveilCount();
    this.memoryCardService.setCardCount(value);
    this.getBoxSize();

    let memoryCards = this.memoryCardService.createMemoryCards();
    this.store.dispatch(MemoryCardActions.createMemoryCards({ memoryCards }))
  }

  getBoxSize() {
    let totalSurface = window.innerWidth * window.innerHeight;
    let boxSurface = totalSurface / this.memoryCardService.getCardCount();
    this.boxSize = Math.sqrt(boxSurface) * .8;
  }

}

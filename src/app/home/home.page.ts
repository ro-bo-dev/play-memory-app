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
  foundPairs: number = 0;
  unveilCount: number = 0;
  cardCount: number;

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

      console.log("memCards changed");
      console.log("found pairs: " + this.foundPairs);
    }));
  }

  onCardCountChange(event: any) {
    this.cardCount = event.detail.value;
    this.memoryCardService.setCardCount(this.cardCount);
    let memoryCards = this.memoryCardService.createMemoryCards();
    this.store.dispatch(MemoryCardActions.createMemoryCards({ memoryCards }))
    console.log(event);
    console.log(event.detail.value);
  }

  getBoxSize() {
    let totalSurface = window.innerWidth * window.innerHeight;
    let boxSurface = totalSurface / this.memoryCardService.cardCount;
    this.boxSize = Math.sqrt(boxSurface) * .8;
  }

}

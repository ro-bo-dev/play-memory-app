import { Injectable } from '@angular/core';
import { MemoryCard, MemoryCardModel } from '../model/memory-card.model';

@Injectable({ providedIn: 'root' })
export class MemoryCardService {
  private INITIAL_CARD_COUNT: number = 12;

  private unveilCount: number = 0;

  constructor() {}

  createMemoryCards(): MemoryCard[] {
    let memoryCards: MemoryCard[] = [];

    for (let i = 0; i < this.getCardCount(); i++) {
        const card = new MemoryCardModel(i, Math.floor(i * .5));
        memoryCards.push(card);
      }
  
      this.shuffle(memoryCards);
      return memoryCards;
  }

  getUnveilCount() {
    return this.unveilCount;
  }

  incrementUnveilCount() {
    this.unveilCount++;
  }

  resetUnveilCount() {
    this.unveilCount = 0;
  }

  getCardCount() {
    let cardCount: number;

    try {
      cardCount = localStorage.getItem("app.memory.cardCount") as any as number;
  
      if (cardCount == undefined) {
        cardCount = this.INITIAL_CARD_COUNT;
        localStorage.setItem("app.memory.cardCount", "" + cardCount);
      }
    } catch (error) {
      cardCount = this.INITIAL_CARD_COUNT;
    }
    return cardCount;
  }

  setCardCount(count: number) {
    try {
      localStorage.setItem("app.memory.cardCount", "" + count);
    } catch (error) {
      console.warn("local storage access failed");
    }
  }

  // source: https://bost.ocks.org/mike/shuffle/
  shuffle(array: any[]) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
  }

}
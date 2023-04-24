import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemoryCard, MemoryCardModel } from '../model/memory-card.model';

@Injectable({ providedIn: 'root' })
export class MemoryCardService {
  cardCount: number = 12;

  constructor() {}

  createMemoryCards(): MemoryCard[] {
    let memoryCards: MemoryCard[] = [];

    for (let i = 0; i < this.cardCount; i++) {
        const card = new MemoryCardModel(i, Math.floor(i * .5));
        memoryCards.push(card);
      }
  
      this.shuffle(memoryCards);
      return memoryCards;
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
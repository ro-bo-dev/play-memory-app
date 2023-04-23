import { Component, HostListener } from '@angular/core';
import { MemoryCardModel } from '../model/memory-card.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cardCount: number = 12;
  memoryCards: MemoryCardModel[] = [];

  boxSize: number = 100;

  constructor() {
    this.getBoxSize();

    for (let i = 0; i < this.cardCount; i++) {
      const card = new MemoryCardModel(Math.floor(i * .5), i);
      this.memoryCards.push(card);
    }

    this.shuffle(this.memoryCards);
  }

  ngOnInit() {
  }

  getBoxSize() {
    let totalSurface = window.innerWidth * window.innerHeight;
    let boxSurface = totalSurface / this.cardCount;
    this.boxSize = Math.sqrt(boxSurface) * .8;

    console.log(window.innerHeight, window.innerWidth);
    console.log(boxSurface);
    console.log(this.boxSize);
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

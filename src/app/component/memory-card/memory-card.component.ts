import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MemoryCardActions } from 'src/app/state/memory-card.actions';
import { selectMemoryCardById, selectMemoryCards } from 'src/app/state/memory-card.selector';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss'],
})
export class MemoryCardComponent implements OnInit {

  @Input() id: number = 0;
  @Input() sujet: number = 0;
  @Input() boxSize: number = 100;
  unveiled: boolean = false;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectMemoryCardById(this.id))
    .subscribe((memoryCard) => {
      console.log("selectMemoryCardById:changed unveiled");
      console.log(memoryCard);
      if (memoryCard) {
        this.unveiled = memoryCard.unveiled;
      }
  });
  }

  unveil() {
    if (!this.unveiled)
      this.store.dispatch(MemoryCardActions.unveil( { id: this.id } ))

    console.log("unveil");
    console.log(this.unveiled);
  }

}

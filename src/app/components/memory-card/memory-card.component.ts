import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss'],
})
export class MemoryCardComponent  implements OnInit {

  @Input() sujet: number = 0;
  @Input() position: number = 0;
  @Input() boxSize: number = 100;
  unveiled: boolean = false;

  constructor() {
  }

  ngOnInit() {}

  toggleUnveiled() {
    this.unveiled = !this.unveiled;
    console.log(this.unveiled);
  }

  veil() {
    this.unveiled = false;
  }
}

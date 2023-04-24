import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { memoryCardReducer } from './state/memory-card.reducer';
import { MemoryCardService } from './service/memory-card.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    StoreModule.forRoot({ memoryCards: memoryCardReducer })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, MemoryCardService],
  bootstrap: [AppComponent],
})
export class AppModule {}

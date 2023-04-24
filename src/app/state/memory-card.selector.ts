import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MemoryCard } from '../model/memory-card.model';

export const selectMemoryCards = createFeatureSelector<MemoryCard[]>('memoryCards');

export const selectMemoryCardById = (id: number) => createSelector(selectMemoryCards, (allItems) => {
    if (allItems) {
        //console.warn("selected card id " + id);
      return allItems.find(memoryCard => memoryCard.id === id);
    } else {
      return undefined;
    }
  });
import { createReducer, on } from '@ngrx/store';
import { MemoryCardActions } from './memory-card.actions';
import { MemoryCard } from '../model/memory-card.model';

export const initialState: MemoryCard[] = [];

export const memoryCardReducer = createReducer(
  initialState,
  on(MemoryCardActions.unveil, (state, { id }) => {
    let draft = [...state]; 
    let idx = state.findIndex(memoryCard => memoryCard.id === id);
    let memoryCard = {...state[idx]};

    if (memoryCard) {
      // memory logic

      // uncover pair
      let oddNumberOfCardsUnveiled = state.filter(item => item.unveiled === true).length % 2;
      if (oddNumberOfCardsUnveiled) {
        let prevIdx = state.findIndex(item => item.unveiled && item.sujet == memoryCard.sujet)
        if (prevIdx >= 0) {
          let prevMemoryCard = {...state[prevIdx]};
          prevMemoryCard.uncovered = true;
          draft[prevIdx] = prevMemoryCard;
  
          memoryCard.uncovered = true;
        }
      }
      // conceal, if already two covered are unveiled
      let unveiledCards = state.filter(item => item.uncovered === false && item.unveiled === true);
      if (unveiledCards.length === 2) {
        unveiledCards.forEach(unveiledCard => {
          let idx = state.findIndex(item => item === unveiledCard)
          if (idx >= 0) {
            let card = {...state[idx]};
            card.unveiled = false;
            draft[idx] = card;
          }
        });
      }
      memoryCard.unveilCount++;
      memoryCard.unveiled = true;
      draft[idx] = memoryCard;
    }
    return draft;
  }),
  on(MemoryCardActions.createMemoryCards, (_state, { memoryCards }) => memoryCards)
);
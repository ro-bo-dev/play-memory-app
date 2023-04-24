import { createReducer, on } from '@ngrx/store';
import { MemoryCardActions } from './memory-card.actions';
import { MemoryCard } from '../model/memory-card.model';

export const initialState: MemoryCard[] = [];

export const memoryCardReducer = createReducer(
  initialState,
  on(MemoryCardActions.unveil, (state, { id }) => {
    console.warn("on(MemoryCardActions.unveil");
    console.warn(state);
    
    let draft = [...state]; 
    
    console.warn("draft");
    console.warn(draft);
    
    let idx = state.findIndex(memoryCard => memoryCard.id === id);
    let memoryCard = {...state[idx]};
    
    console.warn("memoryCard");
    console.warn(memoryCard);

    if (memoryCard) {

      // memory logic


      memoryCard.unveiled = true;
      draft[idx] = memoryCard;
    }

    console.warn("memoryCard2");
    console.warn(memoryCard);

    console.warn("draft2");
    console.warn(draft);

    return draft;
  }),
  on(MemoryCardActions.createMemoryCards, (_state, { memoryCards }) => memoryCards)
);
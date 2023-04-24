import { createActionGroup, props } from '@ngrx/store';
import { MemoryCard } from '../model/memory-card.model';

export const MemoryCardActions = createActionGroup({
  source: 'Memory Card',
  events: {
    'Unveil': props<{ id: number }>(),
    'Conceal': props<{ id: number }>(),
    'Create Memory Cards': props<{ memoryCards: MemoryCard[] }>(),
  },
});

export class MemoryCardModel implements MemoryCard {
    id: number;
    sujet: number;
    unveiled: boolean;
    uncovered: boolean;

    constructor(id: number, sujet: number) {
        this.id = id;
        this.sujet = sujet;
        this.unveiled = false;
        this.uncovered = false;
    }
}

export interface MemoryCard {
    id: number;
    sujet: number;
    unveiled: boolean;
    uncovered: boolean;
}
export class MemoryCardModel implements MemoryCard {
    id: number;
    sujet: number;
    unveiled: boolean;
    unveilCount: number;
    uncovered: boolean;

    constructor(id: number, sujet: number) {
        this.id = id;
        this.sujet = sujet;
        this.unveiled = false;
        this.unveilCount = 0;
        this.uncovered = false;
    }
}

export interface MemoryCard {
    id: number;
    sujet: number;
    unveiled: boolean;
    unveilCount: number;
    uncovered: boolean;
}
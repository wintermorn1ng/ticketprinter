import { UUID } from "../Tools";

export class Dishes {
    name: string;
    id: string;
    prices?: number;

    constructor (name: string) {
        this.name = name;
        this.id = UUID();
    }
}
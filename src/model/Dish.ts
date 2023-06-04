import { UUID } from "../tools/Tools";

export class Dish {
    name: string;
    id: string;
    prices?: number;

    constructor (name: string) {
        this.name = name;
        this.id = UUID();
    }
}
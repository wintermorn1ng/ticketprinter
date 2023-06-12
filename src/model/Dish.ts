import { UUID } from "../tools/Tools";

export class Dish {
    name: string;
    id: string;
    prices?: number;

    constructor (name: string, prices?: number) {
        this.name = name;
        this.id = UUID();
        this.prices = prices;
    }
}
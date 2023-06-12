import { Dish } from "./Dish";

export class DishesManager {
    private dishes: Dish[] = [];

    constructor (dishes?: Dish[]) {
        if (dishes) {
            this.dishes = dishes;
        }
    }

    addDish (name: string, prices?: number) {
        let dish = new Dish(name, prices);
        this.dishes.push(dish);
        return dish.id;
    }

    removeDish (id: string) {
        this.dishes = this.dishes.filter(dish => dish.id !== id);
    }

    getDishes () {
        return this.dishes;
    }

    getDish (id: string) {
        return this.dishes.find((dish) => dish.id === id);
    }

    changeDish (id: string, name: string) {
        let dish = this.dishes.find(dish => dish.id === id);
        if (dish) {
            dish.name = name;
        }
    }

    toJSON () {
        return JSON.stringify(this.dishes);
    }

    fromJSON (jsonStr: string) {
        this.dishes = JSON.parse(jsonStr);
    }

    static fromJSON (jsonStr: string) {
        return new DishesManager(JSON.parse(jsonStr));
    }
}
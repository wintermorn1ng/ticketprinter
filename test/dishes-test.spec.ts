import { DishesManager } from "../src/model/DishesManager"

describe('test dish', () => {
    let dishesManager: DishesManager;
    beforeEach(() => {
        dishesManager = new DishesManager();
    });

    test('add dish', () => {
        let id = dishesManager.addDish('dish1');

        expect(dishesManager.getDishes().length).toBe(1);
        expect(dishesManager.getDish(id)?.name).toBe('dish1');
    });

    test('test remove dish', () => {
        let id = dishesManager.addDish('dish1');
        dishesManager.addDish('dish2');

        expect(dishesManager.getDishes().length).toBe(2);

        dishesManager.removeDish(id);

        expect(dishesManager.getDishes().length).toBe(1);
        expect(dishesManager.getDishes()[0].name).toBe('dish2');
    });

    test('test change dish', () => {
        let id = dishesManager.addDish('dish1');

        dishesManager.changeDish(id, 'victor');

        expect(dishesManager.getDish(id)?.name).toBe('victor');
    });

    test('test DishesManager toJSON & fromJSON', () => {
        dishesManager.addDish("dish1");
        let id = dishesManager.addDish("dish2");
        dishesManager.addDish("dish3");

        let json = dishesManager.toJSON();

        let mockDishesManager = DishesManager.fromJSON(json);
        expect(mockDishesManager.getDishes().length).toBe(3);
        expect(mockDishesManager.getDish(id)?.name).toBe('dish2');
    });
})
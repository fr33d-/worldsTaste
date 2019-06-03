import { Router } from 'express';
import {
    createCoffeeKinds,
    createCoffeeOrigin,
    createCoffeeRoasteds,
    getCoffeeKinds,
    getCoffeeOrigins,
    getCoffeeRoasteds,
    deleteCoffeeRoastedsById,
    deleteCoffeeKindsById,
    deleteCoffeeOriginById,
} from '../controllers/CoffeeAttrsController';

// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeAttrsRoute = Router();

coffeeAttrsRoute.route('/roasteds').get(getCoffeeRoasteds);
coffeeAttrsRoute.route('/kinds').get(getCoffeeKinds);
coffeeAttrsRoute.route('/origins').get(getCoffeeOrigins);

coffeeAttrsRoute.route('/roasteds').post(createCoffeeRoasteds);
coffeeAttrsRoute.route('/kinds').post(createCoffeeKinds);
coffeeAttrsRoute.route('/origins').post(createCoffeeOrigin);

coffeeAttrsRoute.route('/roasteds/:id').delete(deleteCoffeeRoastedsById);
coffeeAttrsRoute.route('/kinds/:id').delete(deleteCoffeeKindsById);
coffeeAttrsRoute.route('/origins/:id').delete(deleteCoffeeOriginById);

export { coffeeAttrsRoute };

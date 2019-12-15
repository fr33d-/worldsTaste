import { Router } from 'express';
import {
    createCoffeeKinds,
    createCoffeeMethod,
    createCoffeeOrigin,
    createCoffeeProcess,
    createCoffeeRoasteds,
    createCoffeeSpecies,
    deleteCoffeeKindsById,
    deleteCoffeeMethodById,
    deleteCoffeeOriginById,
    deleteCoffeeProcessById,
    deleteCoffeeRoastedsById,
    deleteCoffeeSpeciesById,
    getCoffeeKinds,
    getCoffeeMethodes,
    getCoffeeOrigins,
    getCoffeeProcesses,
    getCoffeeRoasteds,
    getCoffeeSpecies,
} from '../controllers/CoffeeAttrsController';

// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeAttrsRoute = Router();

coffeeAttrsRoute.route('/roasteds').get(getCoffeeRoasteds);
coffeeAttrsRoute.route('/roasteds').post(createCoffeeRoasteds);
coffeeAttrsRoute.route('/roasteds/:id').delete(deleteCoffeeRoastedsById);

coffeeAttrsRoute.route('/kinds').get(getCoffeeKinds);
coffeeAttrsRoute.route('/kinds').post(createCoffeeKinds);
coffeeAttrsRoute.route('/kinds/:id').delete(deleteCoffeeKindsById);

coffeeAttrsRoute.route('/origins').get(getCoffeeOrigins);
coffeeAttrsRoute.route('/origins').post(createCoffeeOrigin);
coffeeAttrsRoute.route('/origins/:id').delete(deleteCoffeeOriginById);

coffeeAttrsRoute.route('/processes').get(getCoffeeProcesses);
coffeeAttrsRoute.route('/processes').post(createCoffeeProcess);
coffeeAttrsRoute.route('/processes/:id').delete(deleteCoffeeProcessById);

coffeeAttrsRoute.route('/species').get(getCoffeeSpecies);
coffeeAttrsRoute.route('/species').post(createCoffeeSpecies);
coffeeAttrsRoute.route('/species/:id').delete(deleteCoffeeSpeciesById);

coffeeAttrsRoute.route('/method').get(getCoffeeMethodes);
coffeeAttrsRoute.route('/method').post(createCoffeeMethod);
coffeeAttrsRoute.route('/method/:id').delete(deleteCoffeeMethodById);

export { coffeeAttrsRoute };

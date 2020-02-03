import { Router } from 'express';
import { getCoffeeStores, createCoffeeStore, updateCoffeeStoreById, deleteCoffeeStoreById } from '../controllers/CoffeeAttrsController';


// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeStoresRoute = Router();

coffeeStoresRoute.route('/').get(getCoffeeStores);
coffeeStoresRoute.route('/').post(createCoffeeStore);
coffeeStoresRoute.route('/').put(updateCoffeeStoreById);
coffeeStoresRoute.route('/').delete(deleteCoffeeStoreById);


export { coffeeStoresRoute };

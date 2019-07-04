import express, { Router } from 'express';
import * as path from 'path';
import {
    createCigar,
    deleteCigarById,
    getAllCigars,
    getCigarAssets,
    getCigarById,
} from '../controllers/CigarsController';

// Define a new router that basically wraps multiple endpoint into a single object.
const cigarRoute = Router();

cigarRoute.use('/static', express.static(path.join(__dirname, '../uploads/')));
cigarRoute.route('/').get(getAllCigars);
cigarRoute.route('/').post(createCigar);
cigarRoute.route('/:id').get(getCigarById);
cigarRoute.route('/:id').delete(deleteCigarById);
cigarRoute.route('/assets/:id').get(getCigarAssets);

// coffeeRoute.route('/:id').put(uploadImage);

export { cigarRoute };

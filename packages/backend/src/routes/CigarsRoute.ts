import express, { Router } from 'express';
import * as path from 'path';
import {
    createCigar,
    deleteCigarById,
    deleteCigarImageByURL,
    getAllCigars,
    getCigarAssets,
    getCigarById,
    postCigarAssets,
    updateCigarById,
} from '../controllers/CigarsController';

// Define a new router that basically wraps multiple endpoint into a single object.
const cigarRoute = Router();

cigarRoute.use('/static', express.static(path.join(__dirname, '../uploads/')));
cigarRoute.route('/').get(getAllCigars);
cigarRoute.route('/').post(createCigar);
cigarRoute.route('/:id').get(getCigarById);
cigarRoute.route('/:id').delete(deleteCigarById);
cigarRoute.use('/assets', express.static(path.join(__dirname, '../../uploads/cigar-images')));
cigarRoute.route('/assets/').get(getCigarAssets);
cigarRoute.route('/assets/:id').post(postCigarAssets);
cigarRoute.route('/assets/:id').delete(deleteCigarImageByURL);

cigarRoute.route('/:id').put(updateCigarById);
// coffeeRoute.route('/:id').put(uploadImage);

export { cigarRoute };

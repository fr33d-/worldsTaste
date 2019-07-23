import { Router } from 'express';
import {
    createCigarAnschnittEntity,
    deleteCigarAnschnittEntity,
    getCigarAnschnittEntities,
    getCigarAromaradEntities,
    createCigarAromaradEntity,
    deleteCigarAromaradEntity,
    deleteCigarDeckblattEntity,
    getCigarEinlageEntities,
    deleteCigarEinlageEntity,
    getCigarOriginEntities,
    createCigarOriginEntity,
    deleteCigarOriginEntity,
    getCigarProducerEntities,
    createCigarProducerEntity,
    deleteCigarProducerEntity,
    getCigarUmblattEntities,
    createCigarUmblattEntity,
    deleteCigarUmblattEntity,
    getCigarDeckblattEntities,
    createCigarDeckblattEntity,
    createCigarEinlageEntity,
} from '../controllers/CigarAttrsController';

// Define a new router that basically wraps multiple endpoint into a single object.
const cigarAttrsRoute = Router();

cigarAttrsRoute.route('/anschnitt').get(getCigarAnschnittEntities);
cigarAttrsRoute.route('/anschnitt').post(createCigarAnschnittEntity);
cigarAttrsRoute.route('/anschnitt/:id').delete(deleteCigarAnschnittEntity);

cigarAttrsRoute.route('/aromarad').get(getCigarAromaradEntities);
cigarAttrsRoute.route('/aromarad').post(createCigarAromaradEntity);
cigarAttrsRoute.route('/aromarad/:id').delete(deleteCigarAromaradEntity);

cigarAttrsRoute.route('/deckblatt').get(getCigarDeckblattEntities);
cigarAttrsRoute.route('/deckblatt').post(createCigarDeckblattEntity);
cigarAttrsRoute.route('/deckblatt/:id').delete(deleteCigarDeckblattEntity);

cigarAttrsRoute.route('/einlage').get(getCigarEinlageEntities);
cigarAttrsRoute.route('/einlage').post(createCigarEinlageEntity);
cigarAttrsRoute.route('/einlage/:id').delete(deleteCigarEinlageEntity);

cigarAttrsRoute.route('/origin').get(getCigarOriginEntities);
cigarAttrsRoute.route('/origin').post(createCigarOriginEntity);
cigarAttrsRoute.route('/origin/:id').delete(deleteCigarOriginEntity);

cigarAttrsRoute.route('/producer').get(getCigarProducerEntities);
cigarAttrsRoute.route('/producer').post(createCigarProducerEntity);
cigarAttrsRoute.route('/producer/:id').delete(deleteCigarProducerEntity);

cigarAttrsRoute.route('/umblatt').get(getCigarUmblattEntities);
cigarAttrsRoute.route('/umblatt').post(createCigarUmblattEntity);
cigarAttrsRoute.route('/umblatt/:id').delete(deleteCigarUmblattEntity);

export { cigarAttrsRoute };
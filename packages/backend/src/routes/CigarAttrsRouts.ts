import { Router } from 'express';
import {
    createCigarAnschnittEntity,
    deleteCigarAnschnittEntity,
    getCigarAnschnittEntities,
    getCigarAromaradEntities,
    createCigarAromaradEntity,
    deleteCigarAromaradEntity,
    deleteCigarDeckplattEntity,
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
    getCigarDeckplattEntities,
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

cigarAttrsRoute.route('/deckplatt').get(getCigarDeckplattEntities);
cigarAttrsRoute.route('/deckplatt').post(createCigarDeckblattEntity);
cigarAttrsRoute.route('/deckplatt/:id').delete(deleteCigarDeckplattEntity);

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
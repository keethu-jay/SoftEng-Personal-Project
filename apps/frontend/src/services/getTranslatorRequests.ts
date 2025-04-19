import axios from 'axios';

import { API_ROUTES } from '../../../../packages/common/src/constants.ts';
import type {TranslatorRequest} from 'src/routes/AllServiceRequests.tsx';

async function getTranslatorRequests (): Promise<TranslatorRequest> {
    const translatorServices = (await axios.get('/api/servicereqs/translator')).data;
    return translatorServices.data;
}

export default getTranslatorRequests;
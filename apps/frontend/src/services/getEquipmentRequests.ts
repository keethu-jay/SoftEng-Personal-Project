import axios from 'axios';

import { API_ROUTES } from '../../../../packages/common/src/constants.ts';
import type {EquipmentRequest} from 'src/routes/AllServiceRequests.tsx';

async function getEquipmentRequests (): Promise<EquipmentRequest> {
    const equipmentServices = (await axios.get('/api/servicereqs/equipment')).data;
    return equipmentServices.data;
}

export default getEquipmentRequests;
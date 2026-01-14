import apiClient from '../lib/axios';

import type { ServiceRequest } from '@/routes/AllServiceRequests.tsx';

async function getEquipmentRequests(): Promise<ServiceRequest[]> {
    const res = await apiClient.get('/api/servicereqs/equipment');
    return Array.isArray(res.data) ? (res.data as ServiceRequest[]) : [];
}

export default getEquipmentRequests;
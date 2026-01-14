import apiClient from '../lib/axios';

import type { ServiceRequest } from '@/routes/AllServiceRequests.tsx';

async function getTranslatorRequests(): Promise<ServiceRequest[]> {
    const res = await apiClient.get('/api/servicereqs/translator');
    return Array.isArray(res.data) ? (res.data as ServiceRequest[]) : [];
}

export default getTranslatorRequests;
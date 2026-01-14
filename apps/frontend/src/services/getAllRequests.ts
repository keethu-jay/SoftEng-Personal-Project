import apiClient from '../lib/axios';

import type { ServiceRequest } from '@/routes/AllServiceRequests.tsx';

async function getAllRequests(): Promise<ServiceRequest[]> {
    const res = await apiClient.get('/api/servicereqs');
    return Array.isArray(res.data) ? (res.data as ServiceRequest[]) : [];
}

export default getAllRequests;
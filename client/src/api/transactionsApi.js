import axiosClient from './axiosClient';

export async function simulateTransaction(payload) {
    const response = await axiosClient.post(
        '/transactions/simulate',
        payload
    );

    return response.data;
}

export async function getApprovedTransactions() {
    const response = await axiosClient.get(
        '/transactions/approved'
    );

    return response.data;
}
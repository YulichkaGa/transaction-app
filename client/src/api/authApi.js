import axiosClient from './axiosClient';

export const register = async (payload) => {
    const response = await axiosClient.post(
        '/auth/register',
        payload
    );

    return response.data;
};

export const login = async (payload) => {
    const response = await axiosClient.post(
        '/auth/login',
        payload
    );

    return response.data;
};
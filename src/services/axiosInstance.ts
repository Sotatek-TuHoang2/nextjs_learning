import axios from 'axios';
import { headers } from 'next/headers';
import { config } from 'process';

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => {
        console.error('Api Error: ', error);
        return Promise.reject(error)
    }
)

export default axiosInstance
import process from 'process';

import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_INCTAGRAM_API_URL;

export const inctagramInstance = axios.create({
    baseURL,
    withCredentials: true
});

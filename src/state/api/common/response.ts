import {AxiosResponse} from 'axios';

export interface GDRGatewayResponse<T> {
    statusCode: number;
    resultCode: number;
    body: T;
}

export const onResponse = (res: AxiosResponse): AxiosResponse => {
    const {method, url} = res.config;
    const {code, message} = res.data;
    if (code === 'SUCCESS') {
        console.log(`[API RESPONSE]: ${method?.toUpperCase()} ${url} | ${code} : ${message}`);
    } else {
        console.log(`[API ERROR]: ${method?.toUpperCase()} ${url} | ${code} : ${message}`);
    }

    return res;
};

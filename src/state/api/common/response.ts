import {AxiosResponse} from 'axios';

export interface GatewayResponse<T> {
    statusCode: number;
    resultCode: number;
    body: T;
}

export const onResponse = (res: AxiosResponse): AxiosResponse => {
    const {method, url} = res.config;
    const {statusCode, resultCode, body} = res.data;
    if (statusCode === 200 && resultCode === 1) {
        console.log(`[API RESPONSE]: ${method?.toUpperCase()} ${url} | ${resultCode} : ${body}`);
    } else {
        console.log(`[API ERROR]: ${method?.toUpperCase()} ${url} | ${resultCode} : ${body}`);
    }

    return res;
};

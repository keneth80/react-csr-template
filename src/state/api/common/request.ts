import {InternalAxiosRequestConfig} from 'axios';

export interface GDRGatewayRequest<T> {
    url: string;
    param: T;
}

export const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const {method, url} = config;
    console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

    // @TODO: jwt 또는 토큰 저장할 시 셋팅.
    // const token = getCookie(COOKIE_KEY.LOGIN_TOKEN);
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
};

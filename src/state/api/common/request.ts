import {InternalAxiosRequestConfig, AxiosRequestConfig} from 'axios';

export interface GatewayRequestParam<T> {
    param: T;
}

export interface GatewayRequest<T> {
    url: string;
    body?: T | AxiosRequestConfig;
}

export const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const {method, url} = config;
    console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

    // @TODO: jwt 또는 토큰 저장할 시 셋팅.
    // const token = getCookie(COOKIE_KEY.LOGIN_TOKEN);
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
};

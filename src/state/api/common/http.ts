import Axios, {AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults} from 'axios';
import {GO_LOGIN_ERROR_EVENT, GO_SERVER_ERROR_EVENT} from './error';

/**
 * @title makeAxios
 * @param <any>configuration(optional)
 * @returns AxiosInstance
 * @description 공통 이벤트 처리가 적용된 axios instance를 생성해주는 함수
 */
export function makeAxios(configuration?: {baseURL: string; [key: string]: any}): AxiosInstance {
    const axiosConfig = {
        withCredentials: true
    };

    if (configuration) {
        Object.assign(axiosConfig, configuration);
    }

    const axios: AxiosInstance = AxiosSingleInstance.getInstance(axiosConfig);

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (error.response && error.response.status) {
                switch (error.response.status) {
                    case 401:
                        dispatchEvent(new Event(GO_LOGIN_ERROR_EVENT));
                        return new Promise(() => {});
                    case 500:
                        dispatchEvent(new Event(GO_SERVER_ERROR_EVENT));
                        return new Promise(() => {});
                    default:
                        return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return axios;
}

export class AxiosSingleInstance {
    private static INSTANCE: AxiosInstance;
    public static getInstance(axiosConfig?: CreateAxiosDefaults): AxiosInstance {
        if (!AxiosSingleInstance.INSTANCE) {
            AxiosSingleInstance.INSTANCE = Axios.create(axiosConfig);
        }
        return AxiosSingleInstance.INSTANCE;
    }
}

export const setRequestInterceptorByHeaderToken = (token: string) => {
    return AxiosSingleInstance.getInstance().interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};

export const removeTokenInterceptor = (config: AxiosRequestConfig) => {
    delete config?.headers?.common.Authorization;
    return config;
};

export function setRequestInterceptor(interceptor: any): number {
    return AxiosSingleInstance.getInstance().interceptors.request.use(interceptor);
}

export function removeRequestInterceptor(interceptorId: number): void {
    AxiosSingleInstance.getInstance().interceptors.request.eject(interceptorId);
}

export function setResponseInterceptor(interceptor: any): number {
    return AxiosSingleInstance.getInstance().interceptors.response.use(interceptor);
}

export function setReponseErrorInterceptor(interceptor: any): number {
    return AxiosSingleInstance.getInstance().interceptors.response.use(function (response) {
        return response;
    }, interceptor);
}

export function removeResponseInterceptor(interceptorId: number): void {
    AxiosSingleInstance.getInstance().interceptors.response.eject(interceptorId);
}

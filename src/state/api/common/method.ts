import {AxiosResponse, AxiosRequestConfig} from 'axios';
import {AxiosSingleInstance} from '../common/http';
import {GatewayResponse} from './response';

function httpMethodWrapper<T = any, P = any>(
    url: string,
    param: P,
    httpCallback: (url: string, param?: P | AxiosRequestConfig) => Promise<GatewayResponse<T>>
) {
    return new Promise<GatewayResponse<T>>((resolve) => {
        try {
            httpCallback(url, param)
                .then((response: GatewayResponse<T>) => {
                    resolve(response);
                })
                .catch((error) => {
                    resolve({
                        statusCode: 400,
                        resultCode: 500,
                        body: error as T
                    });
                });
        } catch (error) {
            resolve({
                statusCode: 400,
                resultCode: 500,
                body: error as T
            });
        }
    });
}

export function get<T = any>(url: string, config: AxiosRequestConfig): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, AxiosRequestConfig>(url, config, AxiosSingleInstance.getInstance().get);
}

export function post<T = any, P = any>(url: string, param: P): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, P>(url, param, AxiosSingleInstance.getInstance().post);
}

export function put<T = any, P = any>(url: string, param: P): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, P>(url, param, AxiosSingleInstance.getInstance().put);
}

export function deleted<T = any>(url: string, config: AxiosRequestConfig): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, AxiosRequestConfig>(url, config, AxiosSingleInstance.getInstance().delete);
}

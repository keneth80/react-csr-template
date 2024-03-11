import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AxiosSingleInstance} from '../common/http';
import {GatewayResponse} from './response';

function httpMethodWrapper<T = any, P = any>(
    url: string,
    param: P,
    httpMethod: (url: string, param: P | AxiosRequestConfig) => Promise<AxiosResponse<T>>
) {
    return new Promise<GatewayResponse<T>>((resolve) => {
        try {
            httpMethod(url, param)
                .then((response: AxiosResponse) => {
                    resolve(response.data);
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

export function get<T = any>(url: string, config?: AxiosRequestConfig): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, AxiosRequestConfig>(url, config ? config : {}, AxiosSingleInstance.getInstance().get);
}

export function post<T = any, P = any>(url: string, param: P): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, P>(url, param, AxiosSingleInstance.getInstance().post);
}

export function put<T = any, P = any>(url: string, param: P): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, P>(url, param, AxiosSingleInstance.getInstance().put);
}

export function deleted<T = any>(url: string, config?: AxiosRequestConfig): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, AxiosRequestConfig>(url, config ? config : {}, AxiosSingleInstance.getInstance().delete);
}

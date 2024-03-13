import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AxiosSingleInstance} from '../common/http';
import {GatewayResponse} from './response';
import {GatewayRequest} from './request';

function httpMethodWrapper<T = any>(httpMethod: (...args: any[]) => Promise<AxiosResponse<T>>, ...args: any[]) {
    return new Promise<GatewayResponse<T>>((resolve) => {
        try {
            httpMethod(...args)
                .then((response: AxiosResponse) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    const errorMsg = `[HTTP METHOD ERROR]: ${JSON.stringify(error)}`;
                    console.log(errorMsg);
                    resolve({
                        statusCode: 400,
                        resultCode: 500,
                        body: errorMsg
                    });
                });
        } catch (error) {
            const errorMsg = `[SCRIPT ERROR]: ${JSON.stringify(error)}`;
            console.log(errorMsg);
            resolve({
                statusCode: 400,
                resultCode: 500,
                body: errorMsg
            });
        }
    });
}

export function get<T = any, P = any>({url, config}: GatewayRequest<P>): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T>(AxiosSingleInstance.getInstance().get, url, config ? (config as AxiosRequestConfig) : {});
}

export function post<T = any, P = any>({url, body, config}: GatewayRequest<P>): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T>(AxiosSingleInstance.getInstance().post, url, body as P, config);
}

export function put<T = any, P = any>({url, body, config}: GatewayRequest<P>): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T>(AxiosSingleInstance.getInstance().put, url, body as P, config);
}

export function deleted<T = any, P = any>({url, config}: GatewayRequest<P>): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T>(AxiosSingleInstance.getInstance().delete, url, config ? (config as AxiosRequestConfig) : {});
}

import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AxiosSingleInstance} from '../common/http';
import {GatewayResponse} from './response';
import {GatewayRequest} from './request';

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

export function get<T = any, P = any>({url, body}: GatewayRequest<P>): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, AxiosRequestConfig>(url, body ? (body as AxiosRequestConfig) : {}, AxiosSingleInstance.getInstance().get);
}

export function post<T = any, P = any>({url, body}: GatewayRequest<P>): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, P>(url, body as P, AxiosSingleInstance.getInstance().post);
}

export function put<T = any, P = any>({url, body}: GatewayRequest<P>): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, P>(url, body as P, AxiosSingleInstance.getInstance().put);
}

export function deleted<T = any, P = any>({url, body}: GatewayRequest<P>): Promise<GatewayResponse<T>> {
    return httpMethodWrapper<T, AxiosRequestConfig>(url, body ? (body as AxiosRequestConfig) : {}, AxiosSingleInstance.getInstance().delete);
}

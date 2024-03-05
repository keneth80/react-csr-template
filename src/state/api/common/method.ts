import {AxiosResponse} from 'axios';
import {AxiosSingleInstance} from '../common/http';

export function get<T = any, P = any>(url: string, param: P): Promise<T> {
    return new Promise(() => {});
}

export function post<T = any, P = any>(url: string, param: P): Promise<T> {
    return new Promise(() => {});
}

export function put<T = any, P = any>(url: string, param: P): Promise<T> {
    return new Promise(() => {});
}

export function deleted<T = any, P = any>(url: string, param: P): Promise<T> {
    return new Promise(() => {});
}

export function customErrorInterceptor(response: AxiosResponse) {
    if (response && response.data) {
        if (response.data.code === 1) {
            return response;
        } else {
            return Promise.reject({
                error: response,
                message: response.data.message || response.data.codeMessage,
                code: response.data.code
            });
        }
    }
    return new Promise(() => {});
}

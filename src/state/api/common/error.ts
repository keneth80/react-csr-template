import {AxiosError, isAxiosError, InternalAxiosRequestConfig} from 'axios';

export const onError = (error: AxiosError | Error): Promise<AxiosError> => {
    if (isAxiosError(error)) {
        const {method, url} = error.config as InternalAxiosRequestConfig;
        if (error.response) {
            const {statusCode, message} = error.response.data;
            console.log(`[API ERROR]: ${method?.toUpperCase()} ${url} | ${statusCode} : ${message}`);
            dispatchEvent(
                new CustomEvent('api_error', {
                    detail: {
                        statusCode,
                        message
                    }
                })
            );
        }
    } else {
        console.log(`[API Error]: ${error.message}`);
    }
    return Promise.reject(error);
};

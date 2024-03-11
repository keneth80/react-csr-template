import {AxiosResponse} from 'axios';

export interface GatewayResponse<T> {
    statusCode: number;
    resultCode: number;
    body: T;
}

export const onResponse = (res: AxiosResponse): AxiosResponse => {
    const {method, url} = res.config;
    // const {statusCode, resultCode, body} = res.data;
    // TODO: 현재는 테스트 url로 하고 있어 statusCode, resultCode, body 형식이 없음
    const response = {
        statusCode: 200,
        resultCode: 1,
        body: res.data
    };
    res.data = response;
    const {statusCode, resultCode, body} = response;
    if (statusCode === 200 && (resultCode === 1 || resultCode === 0)) {
        console.log(`[API RESPONSE]: ${method?.toUpperCase()} ${url} | ${resultCode} : ${JSON.stringify(body)}`);
    } else {
        console.log(`[API ERROR]: ${method?.toUpperCase()} ${url} | ${resultCode} : ${body}`);
    }

    return res;
};

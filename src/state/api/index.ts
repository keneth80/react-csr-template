import {makeAxios, setResponseInterceptor, setRequestInterceptorByHeaderToken} from './common/http';
import {onResponse} from './common/response';
import {onError} from './common/error';

export function apiInstanceInitialize(configuration?: any, executeCallbacks?: () => void) {
    makeAxios(configuration);
    setRequestInterceptorByHeaderToken('toekn');
    setResponseInterceptor(onResponse, onError);
    if (executeCallbacks) executeCallbacks();
}

export function getTempData() {
    return new Promise((resolve, reject) => {
        resolve([
            {
                uid: 123,
                userName: 'kenneth',
                email: 'pretty9967@naver.com'
            }
        ]);
    });
}

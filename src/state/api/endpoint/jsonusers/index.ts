import {get} from '../../common/method';
import {JsonUserRequest} from './request';
import {JsonUserResponse} from './response';

const prefix = 'https://jsonplaceholder.typicode.com';

export function getJsonUserList() {
    return get<Array<JsonUserResponse>>(prefix + '/users');
}

export function getJsonUserById({userId}: JsonUserRequest) {
    return get<JsonUserResponse>(prefix + `/users/${userId}`);
}

import {get} from '../../common/method';
import {GatewayResponse} from '../../common/response';
import {JsonUserRequest} from './request';
import {JsonUserResponse} from './response';

const prefix = 'https://jsonplaceholder.typicode.com';

export function getJsonUserList(): Promise<GatewayResponse<Array<JsonUserResponse>>> {
    return get<Array<JsonUserResponse>>(prefix + '/users');
}

export function getJsonUserById({userId}: JsonUserRequest): Promise<GatewayResponse<JsonUserResponse>> {
    return get<JsonUserResponse>(prefix + `/users/${userId}`);
}

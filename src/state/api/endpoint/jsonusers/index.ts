import {get} from '../../common/method';
import {GatewayResponse} from '../../common/response';
import {GatewayRequestParam} from '../../common/request';
import {JsonUserRequest} from './request';
import {JsonUserResponse} from './response';

const prefix = 'https://jsonplaceholder.typicode.com';

export function getJsonUserList(): Promise<GatewayResponse<Array<JsonUserResponse>>> {
    return get<Array<JsonUserResponse>>({url: prefix + '/users'});
}

export function getJsonUserById({param}: GatewayRequestParam<JsonUserRequest>): Promise<GatewayResponse<JsonUserResponse>> {
    const {userId} = param;
    return get<JsonUserResponse>({url: prefix + `/users/${userId}`});
}

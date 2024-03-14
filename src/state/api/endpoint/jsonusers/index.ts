import {get, post} from '../../common/method';
import {GatewayResponse} from '../../common/response';
import {GatewayRequestParam} from '../../common/request';
import {JsonUserRequest, JsonPostRequest} from './request';
import {JsonUserResponse, JsonPostResponse} from './response';

const prefix = 'https://jsonplaceholder.typicode.com';

export function getJsonUserList(): Promise<GatewayResponse<Array<JsonUserResponse>>> {
    return get<Array<JsonUserResponse>>({url: prefix + '/users'});
}

export function getJsonUserById({param}: GatewayRequestParam<JsonUserRequest>): Promise<GatewayResponse<JsonUserResponse>> {
    const {userId} = param;
    return get<JsonUserResponse>({url: prefix + `/users/${userId}`});
}

export function addJsonPosts({param: request}: GatewayRequestParam<JsonPostRequest>): Promise<GatewayResponse<JsonPostResponse>> {
    return post<JsonPostResponse, JsonPostRequest>({url: prefix + `/posts`, body: request});
}

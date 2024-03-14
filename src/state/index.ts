import {atom, selector, selectorFamily, useRecoilStateLoadable} from 'recoil';
import {v1} from 'uuid';
import {getJsonUserById, getJsonUserList, addJsonPosts} from './api/endpoint/jsonusers';
import {JsonPostRequest} from './api/endpoint/jsonusers/request';
import {JsonPostResponse} from './api/endpoint/jsonusers/response';

export const envState = atom({
    key: `envState/${v1()}`,
    default: {}
});

export const userState = atom({
    key: `userState/${v1()}`,
    default: {}
});

export const tempUsersState = atom({
    key: `tempUsersState/${v1()}`,
    default: []
});

export const modalVisibleState = atom({
    key: `modalVisibleState/${v1()}`,
    default: {
        params: null,
        isVisivle: false
    }
});

// https://jsonplaceholder.typicode.com/users

export const getUser = selectorFamily({
    key: `jsonuser/get/${v1()}`,
    get: (userId: number) => async () => {
        if (!userId) return '';

        const {body} = await getJsonUserById({param: {userId}});
        return body;
    }
});

interface Param extends JsonPostRequest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const updateUser = selectorFamily<string | JsonPostResponse, Param>({
    key: `jsonuser/update/${v1()}`,
    get: (user) => async () => {
        if (!user.userId) return '';

        const {body} = await addJsonPosts({param: user});
        return body;
    }
});

export const getUserList = selector({
    key: `jsonusers/get/${v1()}`,
    get: async () => {
        const {body} = await getJsonUserList();
        return body;
    },
    set: ({set}, newValue: any) => {
        set(tempUsersState, newValue);
    }
});

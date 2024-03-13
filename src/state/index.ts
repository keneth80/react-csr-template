import {atom, selector, selectorFamily} from 'recoil';
import {v1} from 'uuid';
import {getJsonUserById, getJsonUserList} from './api/endpoint/jsonusers';

export const envState = atom({
    key: `envState/${v1()}`,
    default: {}
});

export const tempUserState = atom({
    key: `tempUserState/${v1()}`,
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

export const tempUser = selectorFamily({
    key: `jsonuser/get/${v1()}`,
    get: (userId: number) => async () => {
        if (!userId) return '';

        const {body} = await getJsonUserById({param: {userId}});
        return body;
    }
});

export const tempUsersSelector = selector({
    key: `jsonusers/get/${v1()}`,
    get: async () => {
        const {body} = await getJsonUserList();
        return body;
    },
    set: ({set}, newValue: any) => {
        set(tempUsersState, newValue);
    }
});

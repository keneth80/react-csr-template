import {atom, selector, selectorFamily} from 'recoil';
import axios from 'axios';
import {getJsonUserById} from '../state/api/endpoint/json-users';

export const envState = atom({
    key: 'envState',
    default: {}
});

export const tempUserState = atom({
    key: 'tempUserState',
    default: {}
});

export const tempUsersState = atom({
    key: 'tempUsersState',
    default: []
});

export const modalVisibleState = atom({
    key: 'modalVisibleState',
    default: {
        params: null,
        isVisivle: false
    }
});

// https://jsonplaceholder.typicode.com/users

export const tempUser = selectorFamily({
    key: 'jsonuser/get',
    get: (userId: number) => async () => {
        if (!userId) return '';

        const {body} = await getJsonUserById({userId});
        return body;
    }
});

export const tempUsersSelector = selector({
    key: 'jsonusers/get',
    get: async () => {
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        return data;
    },
    set: ({set}, newValue: any) => {
        set(tempUsersState, newValue);
    }
});

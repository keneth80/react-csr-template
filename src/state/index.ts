import {atom, selector, selectorFamily} from 'recoil';
import axios from 'axios';

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
    get: (userId: string) => async () => {
        if (!userId) return '';

        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return data;
    },
    set: (params) => {
        return ({set}, user) => {
            set(tempUserState, user);
        };
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

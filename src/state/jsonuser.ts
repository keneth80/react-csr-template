import {useState, useEffect} from 'react';
import {atom, selector, selectorFamily, useRecoilStateLoadable} from 'recoil';
import {v1} from 'uuid';
import {getJsonUserById, getJsonUserList, addJsonPosts} from './api/endpoint/jsonusers';
import {JsonPostRequest} from './api/endpoint/jsonusers/request';
import {JsonPostResponse, JsonUserResponse} from './api/endpoint/jsonusers/response';

export const userState = atom({
    key: `jsonUserState/${v1()}`,
    default: {}
});

export const userListState = atom<JsonUserResponse[]>({
    key: `jsonUserListState/${v1()}`,
    default: []
});

interface Param extends JsonPostRequest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

function userMapper(value: JsonUserResponse) {
    let returnValue: JsonUserResponse = {};
    try {
        returnValue = {
            ...value
        };
    } catch (error) {
        console.log('[ERROR][userMapper]: ', error);
    }
    return returnValue;
}

function userListMapper(value: JsonUserResponse[]) {
    const returnValue: JsonUserResponse[] = [];
    for (let i = 0; i < value.length; i++) {
        returnValue.push(userMapper(value[i] as JsonUserResponse));
    }
    return returnValue;
}

// https://jsonplaceholder.typicode.com/users

export const getUser = selectorFamily({
    key: `jsonuser/get/${v1()}`,
    get: (userId: number) => async () => {
        if (!userId) return '';

        const {body} = await getJsonUserById({param: {userId}});
        return body;
    }
});

export const getUserList = selector({
    key: `jsonusers/get/${v1()}`,
    get: async ({get}) => {
        get(userListState);
        const {body} = await getJsonUserList();
        return userListMapper(body as JsonUserResponse[]);
    },
    set: ({set}, newValue: any) => {
        set(userListState, newValue);
    }
});

const userListSelector = selector<JsonUserResponse[]>({
    key: `userListSelector/${v1()}`,
    get: async ({get}) => {
        get(userListState);
        const {body} = await getJsonUserList();
        return userListMapper(body as JsonUserResponse[]);
    },
    set: ({set}, changedList) => {
        set(userListState, changedList);
    }
});

const useJsonUserList = () => {
    const [users, setRecoilState] = useState<JsonUserResponse[]>([]);
    const [loadable, setUpdateUser] = useRecoilStateLoadable(userListSelector);

    useEffect(() => {
        if (loadable.state === 'hasValue') {
            setRecoilState(loadable.contents);
        } else if (loadable.state === 'hasError') {
            console.log(loadable.contents);
        }
    }, [loadable]);

    const updateUserData = async (user: Param) => {
        if (!user.userId) return '';

        const {body} = await addJsonPosts({param: user});
        if ((body as JsonPostResponse).id) {
            const {body: list} = await getJsonUserList();
            setUpdateUser(userListMapper(list as JsonUserResponse[]));
        }
    };

    return {users, updateUserData};
};

export default useJsonUserList;

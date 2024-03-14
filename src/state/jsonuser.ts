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
        const list = get(userListState);
        console.log('getUserList : ', list);
        const {body} = await getJsonUserList();
        return body;
    },
    set: ({set}, newValue: any) => {
        set(userListState, newValue);
    }
});

export const updateUser = selectorFamily<string | JsonPostResponse, Param>({
    key: `jsonuser/update/${v1()}`,
    get: (user) => async () => {
        if (!user.userId) return '';

        const {body} = await addJsonPosts({param: user});
        return body;
    }
});

const userListSelector = selector<JsonUserResponse[]>({
    key: `userListSelector/${v1()}`,
    get: async ({get}) => {
        const list = get(userListState);
        console.log('getUserList : ', list);
        const {body} = await getJsonUserList();
        return body as JsonUserResponse[];
    },
    set: ({set}, changedList) => {
        console.log('userListSelector.set :', userListState, changedList);
        set(userListState, changedList);
    }
});

const useJsonUserList = () => {
    const [users, setRecoilState] = useState<JsonUserResponse[]>([]);
    const [loadable, setUpdateUser] = useRecoilStateLoadable(userListSelector);

    useEffect(() => {
        console.log('useJsonUserList.useEffect : ', loadable);
        if (loadable.state === 'hasValue') {
            setRecoilState(loadable.contents);
        } else if (loadable.state === 'hasError') {
            console.log(loadable.contents);
        }
    }, [loadable]);

    console.log('useJsonUserList.loadable : ', loadable);

    const updateUserData = async (user: Param) => {
        if (!user.userId) return '';

        const {body} = await addJsonPosts({param: user});
        console.log('resturn body : ', body);
        if ((body as JsonPostResponse).id) {
            const {body: list} = await getJsonUserList();
            console.log('resturn list : ', list);
            setUpdateUser(list as JsonUserResponse[]);
        }
    };

    return {users, updateUserData};
};

export default useJsonUserList;

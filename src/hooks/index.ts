import {useState, useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {useLocation} from 'react-router';
import {modalVisibleState} from '../state';
import {routeList, RouteItem} from '../route';

export function useInputDataCheck<T = any>(initialFormData: T): [T, (e: any) => void, (e: any) => void] {
    const [form, setForm] = useState<T>(initialFormData);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        // TODO: debounce 걸어야함.
        setForm((form) => ({...form, [name]: value}));
    }, []);

    const onReset = useCallback(() => setForm(initialFormData), [initialFormData]);
    return [form, onChange, onReset];
}

export function useToggleModal() {
    const [{isVisivle}, setModalVisible] = useRecoilState(modalVisibleState);

    // 모달 열기 함수
    const openModal = () => {
        setModalVisible({
            isVisivle: true,
            params: null
        });
    };

    return {isVisivle, openModal};
}

export function useRouteName() {
    const location = useLocation();
    const currentRoute = routeList.find((route: RouteItem) => route.path === location.pathname);

    return currentRoute;
}

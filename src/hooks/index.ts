import {useState, useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {modalVisibleState} from '../state';

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

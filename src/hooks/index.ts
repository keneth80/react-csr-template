import React, {useState, useCallback} from 'react';

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

export function usePopup() {}

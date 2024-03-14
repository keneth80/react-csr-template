import {atom} from 'recoil';
import {v1} from 'uuid';

export const envState = atom({
    key: `envState/${v1()}`,
    default: {}
});

export const modalVisibleState = atom({
    key: `modalVisibleState/${v1()}`,
    default: {
        params: null,
        isVisivle: false
    }
});

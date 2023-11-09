export interface LoginState {
    userId: string;
    userPw: string;
}

const loginActionCode = {
    LOGIN: 1
};

export type loginAction = (typeof loginActionCode)[keyof typeof loginActionCode];

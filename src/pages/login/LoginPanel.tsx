import React from 'react';
import style from './LoginPanel.module.scss';
import {useInputDataCheck} from '../../hooks';

export interface LoginSubmitEvent {
    userId: string;
    userPw: string;
}

type LoginPanelProps = {
    onSubmit: (event: LoginSubmitEvent) => void;
};

function LoginPanel({onSubmit}: LoginPanelProps) {
    const [{userId, userPw}, onChange] = useInputDataCheck({
        userId: '',
        userPw: ''
    });

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('onClickHandler : ', event, userId, userPw);
        onSubmit({
            userId,
            userPw
        });
    };

    return (
        <div className={style['input-container']}>
            <input name="userId" placeholder="계정 아이디" onChange={onChange} value={userId} />
            <input name="userPw" placeholder="계정 비밀번호" onChange={onChange} value={userPw} />
            <button onClick={onClickHandler}>확인</button>
        </div>
    );
}

export default LoginPanel;

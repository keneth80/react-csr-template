import LoginPanel, {LoginSubmitEvent} from './login/LoginPanel';

export default function Login() {
    const onSubmitHandler = (event: LoginSubmitEvent) => {
        console.log('onSubmitHandler : ', event);
    };

    return (
        <div>
            <LoginPanel onSubmit={onSubmitHandler} />
        </div>
    );
}

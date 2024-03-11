import {useRecoilState, useRecoilValueLoadable} from 'recoil';
import {envState, tempUsersSelector} from './state';
import './App.css';
import PageRouter from './route';

function App() {
    const [envInfo, setEnvInfo] = useRecoilState(envState);

    const tempUsersLoaderble = useRecoilValueLoadable(tempUsersSelector);

    console.log('envInfo : ', setEnvInfo, envInfo, tempUsersLoaderble.state, tempUsersLoaderble.contents);
    return (
        <div className="app">
            <main>
                <PageRouter />
            </main>
        </div>
    );
}

export default App;

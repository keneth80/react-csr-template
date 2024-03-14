import {useRecoilState, useRecoilValueLoadable} from 'recoil';
import {envState, getUserList} from './state';
import './App.css';
import PageRouter from './route';

function App() {
    const [envInfo, setEnvInfo] = useRecoilState(envState);

    const userListLoaderble = useRecoilValueLoadable(getUserList);

    console.log('envInfo : ', setEnvInfo, envInfo, userListLoaderble.state, userListLoaderble.contents);
    return (
        <div className="app">
            <main>
                <PageRouter />
            </main>
        </div>
    );
}

export default App;

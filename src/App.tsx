import {useRecoilState} from 'recoil';
import {envState} from './state';
import PageRouter from './route';
import './App.css';

function App() {
    const [envInfo, setEnvInfo] = useRecoilState(envState);

    console.log('envInfo : ', setEnvInfo, envInfo);
    return (
        <div className="app">
            <main>
                <PageRouter />
            </main>
        </div>
    );
}

export default App;

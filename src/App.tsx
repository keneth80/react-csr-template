import {useRecoilState, useResetRecoilState} from 'recoil';
import {envState} from './state';
import './App.css';
import PageRouter from './route';

function App() {
    const [envInfo, setEnvInfo] = useRecoilState(envState);
    // reset api
    const resetEnvInfo = useResetRecoilState(envState);
    console.log('envInfo : ', envInfo, setEnvInfo, resetEnvInfo);
    return (
        <div className="app">
            <main>
                <PageRouter />
            </main>
        </div>
    );
}

export default App;

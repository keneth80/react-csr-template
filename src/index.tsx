import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {apiInstanceInitialize} from './state/api';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

apiInstanceInitialize();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
/**
 * recoil 비동기 통신을 위해서는 Recoil root 내부에 suspense 가 선언되어 있어야한다.
 * 없을 시 warning 이 뜸.
 */
root.render(
    <RecoilRoot>
        <React.StrictMode>
            <BrowserRouter>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <App />
                </React.Suspense>
            </BrowserRouter>
        </React.StrictMode>
    </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

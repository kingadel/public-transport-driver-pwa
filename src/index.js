import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ColorModeProvider} from "./providers/ColorModeProvider";
import {BrowserRouter} from "react-router-dom";
import * as serviceWorker from './serviceWorker';


export const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    console.error = function () {
    }
    console.log = function () {
    }
    console.info = function () {
    }
    console.warn = function () {
    }
    console.verbose = function () {
    }
}

export let WorkerConfig = {
    serviceWorkerInitialized: false,
    serviceWorkerUpdated: false,
    serviceWorkerRegistration: null,
}


const Providers = ({children}) => {
    return (
        // <Provider store={store}>
                <ColorModeProvider>
                        {children}
                </ColorModeProvider>
        // </Provider>
    )
}

ReactDOM.render(
    <BrowserRouter>
        <Providers>
            <App/>
        </Providers>
    </BrowserRouter>,
    document.getElementById('root')
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


const configuration = {
    onUpdate: (registration) => {
        if (registration && registration.waiting) {
            console.log("update available")
            if (window.confirm('New version available!  refresh to update your app?')) {
                registration.waiting.postMessage({type: 'SKIP_WAITING'});
                window.location.reload();
            }
        }
    }
};
serviceWorker.register(configuration)

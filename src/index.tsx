import 'babel-plugin-relay/macro';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import App from './pages/_app';
import { relayEnv } from './relayEnv';

const history = createBrowserHistory();

ReactDOM.render(<App history={history} relayEnv={relayEnv} />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './css/styles.css';
import App from './components/App.js'

ReactDOM.render(<App/>, document.querySelector('#main'));
serviceWorker.unregister();

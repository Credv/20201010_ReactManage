import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import memoryUtils from './utils/memoryUtils'
import {getUser} from './utils/storageUtils'
import * as serviceWorker from './serviceWorker';
const user = getUser()
memoryUtils.user=user
ReactDOM.render(
    
    <App />
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

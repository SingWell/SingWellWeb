import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import {Router, Route, browserHistory, Root, IndexRoute} from 'react-router';
import { BrowserRouter } from 'react-router-dom'

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();

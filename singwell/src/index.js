import React from 'react';
import { ReactDOM, render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import {Router, Route, browserHistory, Root, IndexRoute} from 'react-router';
import { BrowserRouter } from 'react-router-dom'


render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));


// ReactDOM.render((
// 	<BrowserRouter>
//     	<App />
//   	</BrowserRouter>),
// 	<App />, document.getElementById('root')
	/*<Router history={browserHistory}>
	  <Route path="/" component={Root}>
	    <IndexRoute component={AddOrganization} />
	    <Route path="/organization/:id" component={Organizations} />
	  </Route>
	</Router>*/
// );
registerServiceWorker();

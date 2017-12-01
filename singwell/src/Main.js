import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Organizations from './Components/Organizations'
import AddOrganization from './Components/AddOrganization'
import AddChoir from './Components/AddChoir'
import Choir from './Components/Choir'
import AddEvent from './Components/AddEvent'

import $ from 'jquery';


class Main extends Component {


	render() {
	  return (
	  	<main>
		    <Switch>
		      <Route exact path='/' component={AddOrganization} />
		      <Route exact path='/organizations/:orgID' component={Organizations} />
		      <Route exact path='/organizations/:orgID/choirs' component={AddChoir} />
		      <Route exact path='/organizations/:orgID/choirs/:choirID' component={Choir} />
		      <Route exact path='/organizations/:orgID/events' component={AddEvent} />

	    	</Switch>
	  	</main>
	  );
	}

}

export default Main

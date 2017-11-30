import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Organizations from './Components/Organizations'
import AddOrganization from './Components/AddOrganization'
import AddChoir from './Components/AddChoir'
import Choir from './Components/Choir'
import CreateProfile from './Components/CreateProfile'
import Profile from './Components/Profile'
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
		      <Route exact path='/profile/create' component={CreateProfile} />
		      <Route exact path='/users/1' component={Profile} />
		      <Route exact path='/organizations/:orgID/choirs/:choirID/events' component={AddEvent} />
	    	</Switch>
	  	</main>
	  );
	}

}

export default Main

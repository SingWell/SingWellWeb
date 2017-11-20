import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Organizations from './Components/Organizations'
import AddOrganization from './Components/AddOrganization'
import AddChoir from './Components/AddChoir'

import $ from 'jquery';


class Main extends Component {


	render() {
	  return (
	  	<main>
		    <Switch>
		      <Route exact path='/' component={AddOrganization} />
		      <Route exact path='/organizations/:id' component={Organizations} />
		      <Route path='/organizations/:id/choirs' component={AddChoir} />

	    	</Switch>
	  	</main>
	  );
	}

}

export default Main

 // <Route exact path='/' component={Home}/>
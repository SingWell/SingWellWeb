import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Organizations from './Components/Organizations'
import AddOrganization from './Components/AddOrganization'
import AddChoir from './Components/AddChoir'
import EditChoir from './Components/EditChoir'
import Choir from './Components/Choir'
import Profile from './Components/Profile'
import AddEvent from './Components/AddEvent'
import Event from './Components/Event'
import CreateProfile from './Components/CreateProfile'
import Login from './Components/Login'
import EditOrganization from './Components/EditOrganization'
import EditProfile from './Components/EditProfile'
import EditEvent from './Components/EditEvent'
import MusicLibrary from './Components/MusicLibrary'
import MusicPage from './Components/MusicPage'
import AddMusic from './Components/AddMusic'
import AddMusicResource from './Components/AddMusicResource'
import Register from './Components/Register'

import $ from 'jquery';


class Main extends Component {


	render() {
	  return (
	  	<main>
		    <Switch>
		      <Route exact path='/' component={Login} />
		      <Route exact path='/login' component={Login} />
		      <Route exact path='/organizations' component={AddOrganization} />
		      <Route exact path='/organizations/:orgID' component={Organizations} />
		      <Route exact path='/organizations/:orgID/choirs' component={AddChoir} />
		      <Route exact path='/organizations/:orgID/choirs/:choirID' component={Choir} />
		      <Route exact path='/profile/create' component={CreateProfile} />
		      <Route exact path='/viewprofile' component={Profile} />
		      <Route exact path='/organizations/:orgID/choirs/:choirID/events' component={AddEvent} />
		      <Route exact path='/organizations/:orgID/events/' component={AddEvent} />
		      <Route exact path='/organizations/:orgID/events/:eventID' component={Event} />
		      <Route exact path='/profile/:userID/edit' component={EditProfile} />
		      <Route exact path='/profile/:userID' component={Profile} />
		      <Route exact path='/organizations/:orgID/choirs/:choirID/edit' component={EditChoir} />
		      <Route exact path='/organizations/:orgID/edit' component={EditOrganization} />
		      <Route exact path='/organizations/:orgID/events/:eventID/edit' component={EditEvent} />
		      <Route exact path='/organizations/:orgID/music/:musicID' component={MusicPage} />
		      <Route exact path='/organizations/:orgID/music/' component={AddMusic} />
		      <Route exact path='/organizations/:orgID/musicResource/:musicID' component={AddMusicResource} />
		      <Route exact path='/register' component={Register} />

	    	</Switch>
	  	</main>
	  );
	}

}

export default Main

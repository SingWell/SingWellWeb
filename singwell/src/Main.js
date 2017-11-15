import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Organizations from './Components/Organizations'
import AddOrganization from './Components/AddOrganization'
import $ from 'jquery';
// import Home from './Home'


class Main extends Component {

	componentWillMount() {
    	$.ajax({
	      type: "GET",
	      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/",
	      dataType: 'json',
	      cache: false, 
	      success: function(data) {
	        this.setState({orgGet: data}, function(){
	          console.log(this.state);
	        })
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.log(err);
	      }
	    });
	  }


	render() {
	  return (
	  	<main>
		    <Switch>
		      <Route exact path='/' component={AddOrganization} />
		      <Route path='/organizations' component={Organizations} />
	    	</Switch>
	  	</main>
	  );
	}

}

export default Main

 // <Route exact path='/' component={Home}/>
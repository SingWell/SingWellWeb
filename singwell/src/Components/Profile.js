import React, { Component } from 'react';
import $ from 'jquery';
import CreateProfile from './CreateProfile';
import MuiThemeProvider from 'material-ui/styles';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import Card from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


class Profile extends Component {

	constructor(){
		super();
	}

	componentWillMount() {
		this.setState ( {
        userGet:{
          firstname: "john",
          lastname: "smith",
          bio: "this is my bio"
        }
      });

    /*$.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/profile/",
        dataType: 'json',
        cache: false, 
        success: function(data) {
          this.setState({userGet: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });*/

	}

    

	render() {

		return (
			<h1>Profile</h1>

		)

	}


}

export default Profile
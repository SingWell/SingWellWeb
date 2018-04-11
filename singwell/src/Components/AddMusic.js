import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, List, ListItem, ListItemContent, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import { SelectField, Option } from 'react-mdl-extra';
import { getColorClass, getTextColorClass } from '../css/palette';
import { Card, CardTitle, CardMenu, TextField, CardText, RaisedButton, FlatButton } from 'material-ui/';

import '../css/AddChoir.css'

import Moment from 'react-moment';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

// import WeekdayPicker from "react-weekday-picker";

class AddMusic extends Component {

	componentWillMount() {
		this.setState ( {
			newMusic:{},
			fireRedirect: false,
			cancelRedirect: false,
			musicID: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
		});

	}

	handleCancel(e) {
		this.setState({cancelRedirect: true})
	}
	

	handleSubmit(e){
		console.log(this.refs.title.inputRef.value)
		this.setState({newMusic:{
			title: this.refs.title.inputRef.value,
			composer: this.refs.composer.inputRef.value,
			arranger: this.refs.arranger.inputRef.value,
			publisher: this.refs.publisher.inputRef.value,
			instrumentation: this.refs.instrumentation.inputRef.value,
			organization: this.props.match.params.orgID
		}}, function() {
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/musicRecords/",
		      dataType: 'json',
		      headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
		      data: this.state.newMusic,
		      success: function(data) {
		        this.setState(
		        	{
		        		organization: this.props.match.params.orgID,
		        		musicPost: data,
		        		musicID: data.id,
		        		fireRedirect: true
		        	}, function(){
		          console.log(this.state);
		        })
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.log(err);
		        console.log(xhr.responseText);
		      }
		    });
		});
  		e.preventDefault();
  	}

  render() {

  	

  	const { from } = this.props.location.state || '/';
  	const { fireRedirect } = this.state;
  	const { cancelRedirect } = this.state;
  	const { musicID } = this.state;
  	const { buttonClasses } = this.state


    return (
        <div className={"formContainer"} >
        <div className={"form"}>
    	<Card shadow={0} >
		    <CardTitle title="ADD MUSIC" className={"title"}/>
		    <CardText className={"timePickerForm"}>
			       <TextField
					    onChange={() => {}}
					    floatingLabelText="Title..."
					    ref="title"
					    style={{width: '100%'}}
					/>
					<TextField
					    onChange={() => {}}
					    floatingLabelText="Composer..."
					    ref="composer"
					    style={{width: '100%'}}
					/>
					<TextField
					    onChange={() => {}}
					    floatingLabelText="Arranger..."
					    ref="arranger"
					    style={{width: '100%'}}
					/>
					<TextField
					    onChange={() => {}}
					    floatingLabelText="Publisher..."
					    ref="publisher"
					    style={{width: '100%'}}
					/>
					<TextField
					    onChange={() => {}}
					    floatingLabelText="Instrumentation..."
					    ref="instrumentation"
					    style={{width: '100%'}}
					/>
					<br/>
					<br/>
					<RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)} />
		      		<FlatButton label="Cancel" onClick={this.handleCancel.bind(this)} />		  
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/' + this.props.match.params.orgID + '/music/' + musicID}/>
		        )} 
		        {cancelRedirect && (
		          <Redirect to={from || '/organizations/' + this.props.match.params.orgID + '/music/' + musicID}/>
		        )} 
		    </CardText>
		</Card>
		</div>
		</div>
      
    );
  }


}

export default AddMusic;

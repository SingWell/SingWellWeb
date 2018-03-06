import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList, Textfield,
    FooterDropDownSection } from  'react-mdl';
import { SelectField, Option } from 'react-mdl-extra';
import { getColorClass, getTextColorClass } from '../css/palette';

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
			musicID: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
		});

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
  	const { musicID } = this.state;
  	const { buttonClasses } = this.state


    return (
    	<Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Add Music</CardTitle>
		    <CardText className={"timePickerForm"}>
		       <form onSubmit={this.handleSubmit.bind(this)}>
			       <Textfield
					    onChange={() => {}}
					    label="Title..."
					    floatingLabel
					    ref="title"
					    style={{width: '200px'}}
					/>
					<Textfield
					    onChange={() => {}}
					    label="Composer..."
					    floatingLabel
					    ref="composer"
					    style={{width: '200px'}}
					/>
					<Textfield
					    onChange={() => {}}
					    label="Arranger..."
					    floatingLabel
					    ref="arranger"
					    style={{width: '200px'}}
					/>
					<Textfield
					    onChange={() => {}}
					    label="Publisher..."
					    floatingLabel
					    ref="publisher"
					    style={{width: '200px'}}
					/>
					<Textfield
					    onChange={() => {}}
					    label="Instrumentation..."
					    floatingLabel
					    ref="instrumentation"
					    style={{width: '200px'}}
					/>
					
		      		<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/' + this.props.match.params.orgID + '/music/' + musicID}/>
		        )} 
		    </CardText>
		    <CardActions border>
		        <Button colored accent onClick={() => this.props.history.push('/organizations/'+ this.props.match.params.orgID)}>Cancel</Button>
		    </CardActions>
		</Card>


      
    );
  }


}

export default AddMusic;

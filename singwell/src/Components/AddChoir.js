import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList, Textfield,
    FooterDropDownSection } from  'react-mdl';
import { SelectField, Option } from 'react-mdl-extra';
import { getColorClass, getTextColorClass } from '../css/palette';

import { MDLSelectField } from 'react-mdl-select';


class AddChoir extends Component {

	constructor() {
		super();
		
	}

	componentWillMount() {
		this.setState ( {
			newChoir:{},
			fireRedirect: false,
			choirID: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`
		});
	}

	static defaultProps = {
		days: [
			{
				name: "Monday",
				number: 1
			},
			{
				name: "Tuesday",
				number: 2
			},
			{
				name: "Wednesday",
				number: 3
			},
			{
				name: "Thursday",
				number: 4
			},
			{
				name: "Friday",
				number: 5
			},
			{
				name: "Saturday",
				number: 6
			},
			{
				name: "Sunday",
				number: 7
			},
		]
	}

	handleSubmit(e){
		this.setState({newChoir:{
			name: this.refs.name.inputRef.value,
			meeting_day: this.refs.meetingDay.value,
			meeting_day_start_hour: this.refs.meetingStartTime.inputRef.value,
			meeting_day_end_hour: this.refs.meetingEndTime.inputRef.value,
			organization: this.props.match.params.orgID,
			choristers: [
				1
			]
		}}, function() {
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/choirs/",
		      dataType: 'json',
		      data: this.state.newChoir,
		      success: function(data) {
		        this.setState(
		        	{
		        		choirPost: data,
		        		choirID: data.id,
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
  	const { choirID } = this.state;
  	const { buttonClasses } = this.state

  	let dayOptions = this.props.days.map(day => {
  		return <option key={day.name} value={day.number}>{day.name}</option>
  	});

    return (
    	<Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Add Choir</CardTitle>
		    <CardText>
		       <form onSubmit={this.handleSubmit.bind(this)}>
			       <Textfield
					    onChange={() => {}}
					    label="Name..."
					    floatingLabel
					    ref="name"
					    style={{width: '200px'}}
					/>
					<br/>
		      		<select ref= "meetingDay">
		      			{dayOptions}
		      		</select>
		      		<br/>
		      		<Textfield
					    onChange={() => {}}
					    label="Meeting Start Time..."
					    floatingLabel
					    ref="meetingStartTime"
					    style={{width: '200px'}}
					/>
					<Textfield
					    onChange={() => {}}
					    label="Meeting End Time..."
					    floatingLabel
					    ref="meetingEndTime"
					    style={{width: '200px'}}
					/>
			      		
					<br/>
		      		<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/' + this.props.match.params.orgID + '/choirs/' + choirID}/>
		        )} 
		    </CardText>
		    <CardActions border>
		        <Button colored accent onClick={() => this.props.history.push('/organizations/'+ this.props.match.params.orgID)}>Cancel</Button>
		    </CardActions>
		</Card>


      
    );
  }
}

export default AddChoir;

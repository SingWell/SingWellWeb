import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router'
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList, Textfield,
    FooterDropDownSection } from  'react-mdl';
import { Dropdown, SelectField, Option } from 'react-mdl-extra';
import { getColorClass, getTextColorClass } from '../css/palette';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import Moment from 'react-moment';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';



class AddEvent extends Component {

	constructor(props) {
		super(props);
		const { defaultTime, focused, showTimezone, timezone } = props;
	    let hour = '';
	    let minute = '';
	    if (!defaultTime) {
	      // [hour, minute] = timeHelper.current().split(/:/);
	    } else {
	      [hour, minute] = defaultTime.split(/:/);
	    }

	    this.state = {
	      hour,
	      minute,
	      focused,
	      timezone,
	      showTimezone,
	    };

	    this.onFocusChange = this.onFocusChange.bind(this);
	    this.onHourChange = this.onHourChange.bind(this);
	    this.onMinuteChange = this.onMinuteChange.bind(this);
	    this.onTimeChange = this.onTimeChange.bind(this);
	    this.handleFocusedChange = this.handleFocusedChange.bind(this);	
	}

	onHourChange(hour) {
	    this.setState({ hour });
	  }

	  onMinuteChange(minute) {
	    this.setState({ minute });
	  }

	  onTimeChange(time) {
	    const [hour, minute] = time.split(':');
	    this.setState({ hour, minute });
	  }


	  onFocusChange(focused) {
	    this.setState({ focused });
	  }

	  handleFocusedChange() {
	    const { focused } = this.state;
	    this.setState({ focused: !focused });
	  }

	componentWillMount() {
		this.setState ( {
			newEvent:{},
			fireRedirect: false,
			eventID: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
			choirGet: []
		});

		$.ajax({
	        type: "GET",
	        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/choirs/",
	        dataType: 'json',
	        cache: false, 
	        success: function(data) {
	          this.setState({choirGet: data});
	        }.bind(this),
	        error: function(xhr, status, err) {
	          console.log(err);
	        }
	      });

	}


	


	handleSubmit(e){
		this.setState({newEvent:{
			// name: this.refs.name.inputRef.value,
			// description: this.refs.description.inputRef.value,
			// address: this.refs.streetAddress.inputRef.value + ", " + this.refs.city.inputRef.value + ", " + this.refs.state.value + " " + this.refs.zipcode.inputRef.value,
			// admins: [1]
		}}, function() {
			console.log(this.state.newOrganization)
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/",
		      dataType: 'json',
		      data: this.state.newEvent,
		      success: function(data) {
		        this.setState(
		        	{
		        		eventPost: data,
		        		eventID: data.id,
		        		fireRedirect: true 
		        	});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.log(err);
		      }
		    });
		});
  		e.preventDefault();
  	}

  render() {
  	const { from } = this.props.location.state || '/';
  	const { fireRedirect } = this.state;
  	const { eventID } = this.state;
  	const { buttonClasses } = this.state
  	const {
      hour,
      minute,
      focused,
      timezone,
      showTimezone,
    } = this.state;


    let choirs;
    choirs = this.state.choirGet.map(choir => {
        console.log(choir)
        return (
        	<option key={choir.id} value={choir.id}>{choir.name}</option>
            
        );
    });



    return (

    	<Card shadow={0} style={{ margin: '10px', height: '700px'}}>
		    <CardTitle>Add Event</CardTitle>
		    <CardText>
		       <form onSubmit={this.handleSubmit.bind(this)} style={{height: '700px'}}>
			       <Textfield
					    onChange={() => {}}
					    label="Event name..."
					    floatingLabel
					    ref="name"
					    style={{width: '200px'}}
					/>
					<br/>
					<label>Date of Event</label>
					<br/>
					<DayPickerInput onDayChange={day => console.log(day)} />
		      		<br/>
		      		<br/>
		      		<label>Event Time:</label>
		      		<TimePicker
			          focused={focused}
			          timezone={timezone}
			          onFocusChange={this.onFocusChange}
			          onHourChange={this.onHourChange}
			          onMinuteChange={this.onMinuteChange}
			          onTimeChange={this.onTimeChange}
			          showTimezone={showTimezone}
			          time={hour && minute ? `${hour}:${minute}` : null}
			        />
			        <br/>
			        <Textfield
					    onChange={() => {}}
					    label="Location..."
					    floatingLabel
					    ref="location"
					    style={{width: '200px'}}
					/>
					<br/>
					<label>Choir:</label> 
					<br/>
					<select ref= "choir">
		      			{choirs}
		      		</select>
		      		<br/>
		      		<br/>
		      		<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/' + eventID}/>
		        )} 
		    </CardText>
		</Card>
     
    );
  }
}

export default AddEvent;

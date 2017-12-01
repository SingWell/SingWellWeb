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
import moment from 'moment';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'

// import ReactMaterialDatePicker from 'react-material-datepicker'

import DatePicker from 'material-ui/DatePicker';



class AddEvent extends Component {

	constructor(props) {
		super(props);
		const { defaultTime, focused, showTimezone, timezone } = props;
	    let hour = '';
	    let minute = '';
	    let date = '';
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
	      choir: {},
	      date
	    };

	    this.onFocusChange = this.onFocusChange.bind(this);
	    this.onHourChange = this.onHourChange.bind(this);
	    this.onMinuteChange = this.onMinuteChange.bind(this);
	    this.onTimeChange = this.onTimeChange.bind(this);
	    this.handleFocusedChange = this.handleFocusedChange.bind(this);	

	    this.callbackFunction = this.callbackFunction.bind(this);
	    this.onDateChange = this.onDateChange.bind(this);
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

	  callbackFunction(selected) {
	   	 this.setState({choir: selected})

	  }

	  onDateChange(event, date) {
	  	this.setState({date: moment(date).format("YYYY-MM-DD")});
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
		console.log(+this.state.choir.value)
		this.setState({newEvent:{
			name: this.refs.name.inputRef.value,
			date: this.state.date,
			time: this.state.hour + ":" + this.state.minute + ":00",
			location: this.refs.location.inputRef.value,
			choirs: [
				+this.state.choir.value
			],
			organization: this.props.match.params.orgID
		}}, function() {
			console.log(this.state.newEvent)
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/events/",
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
	console.log(this.state.choirGet)

    let choirs;
    choirs = this.state.choirGet.map(choir => {
        console.log(choir)
        return (
        	<option key={choir.id} dataValue={choir.id}>{choir.name}</option>
            
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
					{/* <DayPickerInput onDayChange={day => console.log(day)} /> */}
					<DatePicker floatingLabelText="Date of Event..." container="inline" onChange={this.onDateChange}/>
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
					/>
					<br/>
					<ReactMaterialSelect label="Choir..." onChange={this.callbackFunction}>
		                {choirs}
		            </ReactMaterialSelect>
		      		<br/>
		      		<br/>
		      		<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/' + this.props.match.params.orgID }/>
		        )} 
		    </CardText>
		</Card>
     
    );
  }
}

export default AddEvent;

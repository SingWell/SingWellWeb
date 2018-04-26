import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router'
import { getColorClass, getTextColorClass } from '../css/palette';

import 'react-day-picker/lib/style.css';

import moment from 'moment';
//import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

//import 'react-material-select/lib/css/reactMaterialSelect.css'

import DatePicker from 'material-ui/DatePicker'
import { FlatButton, RaisedButton, TextField, SelectField, MenuItem, Card, CardTitle, CardText, TimePicker } from 'material-ui/'



class AddEvent extends Component {

	constructor(props) {
		super(props);
		const { defaultTime, focused, showTimezone, timezone } = props;
	    let hour = '';
	    let minute = '';
	    let date = '';
	    let name = '';
	    let choirs = [];
	    let startTime12 = '';
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
	      //choir: {},
	      date,

	      name, 
	      choirs,

	      startTime12
	    };

	    this.onFocusChange = this.onFocusChange.bind(this);
	    this.onHourChange = this.onHourChange.bind(this);
	    this.onMinuteChange = this.onMinuteChange.bind(this);
	    this.onTimeChange = this.onTimeChange.bind(this);
	    this.handleFocusedChange = this.handleFocusedChange.bind(this);	

	    this.callbackFunction = this.callbackFunction.bind(this);
	    this.onDateChange = this.onDateChange.bind(this);

	    this.onLocationChange = this.onLocationChange.bind(this);
	    this.handleNameChange = this.handleNameChange.bind(this);
	    this.onChoirChange = this.onChoirChange.bind(this);

	    this.baseState = this.state;

	   	this.handleChangeStartTimePicker = this.handleChangeStartTimePicker.bind(this);

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

	  onLocationChange(event, value) {
	  	this.setState({
	  		location: value
	  	})
	  }

	  handleNameChange(event, value) {
		this.setState({
			name: value
		})
	  }

	  onChoirChange(event, index, values) { 
	  	console.log(values);
	  	this.setState({
	  		choirs: values
	  	})
	  }

	  handleChangeStartTimePicker(event, date){
    	this.setState({startTime12: date});
  	  };

	  //handleChange = (event, index, values) => this.setState({values});


	  choirItems(values) {
		return this.state.choirGet.map((choir) => (
			<MenuItem
				key={choir.id}
				insetChildren={true}
				checked={values && values.indexOf(choir) > -1}
				value={choir.id - 1}
				primaryText={choir.name}
			/>
		));
	  }

	componentWillMount() {
		this.setState ( {
			newEvent:{},
			submitRedirect: false,
			cancelRedirect: false,
			eventID: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
			choirGet: []
		});

		$.ajax({
	        type: "GET",
	        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/?organization=" + this.props.match.params.orgID,
	        dataType: 'json',
	        cache: false, 
	        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
	        success: function(data) {
	          this.setState({
	          	choirGet: data
	          }, function() {
	        	console.log(this.state);
	        });
	        }.bind(this),
	        error: function(xhr, status, err) {
	          	console.log(err);
				console.log(xhr.responseText);
				console.log(this);
				console.log(xhr);
	        }
	      });

	}

	handleSubmit(e){
		let startTimeString = this.state.startTime12 + " " ;
		let [sweekday, smonth, sday, syear, startTime, sextra] = startTimeString.split(" ");
		console.log(this.state.choirs)
		this.setState({newEvent:{
			name: this.state.name,
			date: this.state.date,
			//time: this.state.hour + ":" + this.state.minute + ":00",
			time: startTime,
			location: this.state.location,
			choirs: this.state.choirs,
			organization: this.props.match.params.orgID
		}}, function() {
			console.log(this.state.newEvent)
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/events/",
		      dataType: 'json',
		      data: this.state.newEvent,
		      success: function(data) {
		        this.setState(
		        	{
		        		organization: this.props.match.params.orgID,
		        		eventPost: data,
		        		eventID: data.id,
		        		submitRedirect: true
		        	});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.log(err);
		      }
		    });
		});
  		e.preventDefault();
  	}

  	handleCancel(e){
  		this.setState(
  			{cancelRedirect: true}
  		)
  	}

  render() {
  	const { from } = this.props.location.state || '/';
  	const { submitRedirect } = this.state;
  	const { cancelRedirect } = this.state;
  	//const { eventID } = this.state;
  	const { buttonClasses } = this.state;
  	const { choirs } = this.state;
  	const {
      hour,
      minute,
      focused,
      timezone,
      showTimezone,
    } = this.state;

	//console.log(this.state.choirGet)

    // let choirs;
    // choirs = this.state.choirGet.map(choir => {
    //     console.log(choir)
    //     return (
    //     	<option key={choir.id} dataValue={choir.id}>{choir.name}</option>
            
    //     );
    // });



    return (
    	<div className={"formContainer"} >
        <div className={"form"}>
    	<Card shadow={0}>
    		<CardTitle title="ADD EVENT" className={"title"}/>
		    <CardText>
		       {/*<form onSubmit={this.handleSubmit.bind(this)} style={{height: '700px'}}>*/}
			       <TextField
					    onChange={this.handleNameChange}
					    floatingLabelText="Event name..."
					    style={{width: '100%'}}
					    value={this.state.name}
					/>
					{/* <DayPickerInput onDayChange={day => console.log(day)} /> */}
					<DatePicker 
						floatingLabelText="Date of Event..." 
						container="inline" 
						onChange={this.onDateChange}
						style={{width: '100%'}}
					/>
		      		<br/>
		      		<br/>
		      		<TimePicker
		      			floatingLabelText = "Time of Event..."
		      			style={{width: '100%'}}
						format="ampm"
						value={this.state.time12}
						onChange={this.handleChangeStartTimePicker}
						minuteStep={5}
			        />
		      		{/*<label>Event Time:</label>
		      		<TimePicker
			          focused={focused}
			          timezone={timezone}
			          onFocusChange={this.onFocusChange}
			          onHourChange={this.onHourChange}
			          onMinuteChange={this.onMinuteChange}
			          onTimeChange={this.onTimeChange}
			          showTimezone={showTimezone}
			          time={hour && minute ? `${hour}:${minute}` : null}
			        />*/}
			        <br/>
			        <TextField
					    onChange={this.onLocationChange}
					    floatingLabelText="Location..."
					   	value={this.state.location}
					   	style={{width: '100%'}}
					/>
					<br/>
					{/*<ReactMaterialSelect label="Choir..." onChange={this.callbackFunction}>
		                {choirs}
		            </ReactMaterialSelect>*/}
		            <SelectField
		          		floatingLabelText="Choirs"
						value={choirs}
						style={{width: '100%'}}
						onChange={this.onChoirChange}
						multiple={true}
					>{this.choirItems(this.values)}
					</SelectField>
		      		<br/>
		      		<br/>
		      		<RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
		      		<FlatButton label="Cancel" onClick={this.handleCancel.bind(this)} />
		      	{/*</form>*/}
		      	{submitRedirect && (
		          <Redirect to={from || '/organizations/' + this.props.match.params.orgID + '/events/' + this.state.eventID }/>
		        )}
		        {cancelRedirect && (
		          <Redirect to={from || '/organizations/' + this.props.match.params.orgID} />  
		        )} 
		    </CardText>
		</Card>
		</div>
		</div>
     
    );
  }
}

export default AddEvent;

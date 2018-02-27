import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, Footer, FooterSection, FooterLinkList, Textfield,
    FooterDropDownSection } from  'react-mdl';
import { Option } from 'react-mdl-extra';
import { MenuItem, RaisedButton, SelectField } from 'material-ui/';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { getColorClass, getTextColorClass } from '../css/palette';

import '../css/AddChoir.css'

import TimePicker from 'react-times';
import 'react-times/css/material/default.css';
import 'object-diff';

class AddChoir extends Component {

	constructor(props) {
		super(props);
		const { defaultTime, focusedStart, focusedEnd, showTimezone, timezone } = props;
	    let hourStart = '';
	    let minuteStart = '';
	    let hourEnd = '';
	    let minuteEnd = '';
	    let defaultName = '';
	    if (!defaultTime) {
	      // [hour, minute] = timeHelper.current().split(/:/);
	    } else {
	      [hourStart, minuteStart] = defaultTime.split(/:/);
	    }

	    this.state = {
	      hourStart,
	      minuteStart,
	      focusedStart,
	      hourEnd,
	      minuteEnd,
	      focusedEnd,
	      timezone,
	      showTimezone,
	    };

	    this.onFocusChange = this.onFocusChange.bind(this);
	    this.onHourChange = this.onHourChange.bind(this);
	    this.onMinuteChange = this.onMinuteChange.bind(this);
	    this.onTimeChange = this.onTimeChange.bind(this);
	    this.handleFocusedChange = this.handleFocusedChange.bind(this);

	    this.onFocusChangeEnd = this.onFocusChangeEnd.bind(this);
	    this.onHourChangeEnd = this.onHourChangeEnd.bind(this);
	    this.onMinuteChangeEnd = this.onMinuteChangeEnd.bind(this);
	    this.onTimeChangeEnd = this.onTimeChangeEnd.bind(this);
	    this.handleFocusedChangeEnd = this.handleFocusedChangeEnd.bind(this);
	    			
	}

  onHourChange(hourStart) {
    this.setState({ hourStart });
  }

  onMinuteChange(minuteStart) {
    this.setState({ minuteStart });
  }

  onTimeChange(time) {
    const [hourStart, minuteStart] = time.split(':');
    this.setState({ hourStart, minuteStart });
  }


  onFocusChange(focusedStart) {
    this.setState({ focusedStart });
  }

  handleFocusedChange() {
    const { focusedStart } = this.state;
    this.setState({ focusedStart: !focusedStart });
  }

  onHourChangeEnd(hourEnd) {
    this.setState({ hourEnd });
  }

  onMinuteChangeEnd(minuteEnd) {
    this.setState({ minuteEnd });
  }

  onTimeChangeEnd(time) {
    const [hourEnd, minuteEnd] = time.split(':');
    this.setState({ hourEnd, minuteEnd });
  }


  onFocusChangeEnd(focusedEnd) {
    this.setState({ focusedEnd });
  }

  handleFocusedChangeEnd() {
    const { focusedEnd } = this.state;
    this.setState({ focusedEnd: !focusedEnd });
  }



	componentWillMount() {
		this.setState ( {
			newChoir:{},
			fireRedirect: false,
			choirID: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
			edit: false,
			values: {},
			title: "Add Choir"
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
		],
		customTriggerId: null,
		  defaultTime: null,
		  focused: false,
		  showTimezone: false
	}

	// handleChange(event, index, values){
	// 	this.setState({values});
	// }

	/*setWeekdays(values) {
		return this.props.days.map((day) => (
			<MenuItem
				key={day.number}
				//insetChildren={true}
				checked={values && values.indexOf(day) > -1}
				value={day.name}
				//primaryText={day.name}
			/>
		));
	}*/

	handleSubmit(e){
		this.setState({newChoir:{
			name: this.refs.name.inputRef.value,
			meeting_day: this.refs.meetingDay.value,
			meeting_day_start_hour: this.state.hourStart + ":" + this.state.minuteStart + ":00",
			meeting_day_end_hour: this.state.hourEnd + ":" + this.state.minuteEnd + ":00",
			organization: this.props.match.params.orgID,
			choristers: [
				1
			]
		}}, function() {
			console.log("inside post statement");
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/",
		      dataType: 'json',
		      headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
		      data: this.state.newChoir,
		      success: function(data) {
		        this.setState(
		        	{
		        		organization: this.props.match.params.orgID,
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
  	const { buttonClasses } = this.state;
   	const { values } = this.state;

  	const {
      hourStart,
      minuteStart,
      focusedStart,
      hourEnd,
      minuteEnd,
      focusedEnd,
      timezone,
      showTimezone,
    } = this.state;

  	let dayOptions = this.props.days.map(day => {
  		return <option key={day.name} value={day.number}>{day.name}</option>
  	});

    return (
    	<Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>{this.state.title}</CardTitle>
		    <CardText className={"timePickerForm"}>
		       <form onSubmit={this.handleSubmit.bind(this)}>
			       <Textfield
					    //onChange={() => {}}
					    label="Name..."
					    floatingLabel
					    ref="name"
					    style={{width: '200px'}}
					    required={true}
					    //onChange={this.onNameChange}
					    value={this.defaultName}
					/>
					<br/>
					<label>Meeting Day</label>
					<br/>
		      		<select ref= "meetingDay">
		      			{dayOptions}
		      		</select>
		      		{/*<SelectField
		      			floatingLabelText="Meeting Day"
						ref="state"
						value={this.state.values}
						maxHeight={200}
						style={{width: '200px', color: 'blue'}}
						//onChange={this.handleChange}
		      		>{this.setWeekdays(this.values)}
		      		</SelectField>*/}
		      		<br/>
		      		<br/>
		      		<label>Meeting Start Time:</label>
		      		<TimePicker
			          focused={focusedStart}
			          timezone={timezone}
			          onFocusChange={this.onFocusChange}
			          onHourChange={this.onHourChange}
			          onMinuteChange={this.onMinuteChange}
			          onTimeChange={this.onTimeChange}
			          showTimezone={showTimezone}
			          time={hourStart && minuteStart ? `${hourStart}:${minuteStart}` : null}
			        />
			        <br/>
		      		<br/>
			        <label>Meeting End Time:</label>
			        <TimePicker
			          focused={focusedEnd}
			          timezone={timezone}
			          onFocusChange={this.onFocusChangeEnd}
			          onHourChange={this.onHourChangeEnd}
			          onMinuteChange={this.onMinuteChangeEnd}
			          onTimeChange={this.onTimeChangeEnd}
			          showTimezone={showTimezone}
			          time={hourEnd && minuteEnd ? `${hourEnd}:${minuteEnd}` : null}
			        />
		      		<br/>
		      		<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      		{/*<RaisedButton type="Submit" label="Save" onclick={this.handleSubmit.bind(this)}/>*/}
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

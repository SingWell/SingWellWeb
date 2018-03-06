import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router'
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList, Textfield,
    FooterDropDownSection } from  'react-mdl';
import { Dropdown, SelectField, Option } from 'react-mdl-extra';
import { getColorClass, getTextColorClass } from '../css/palette';
import { MDLSelectField } from 'react-mdl-select';
import styles from '../css/login.css'




class AddOrganization extends Component {

	constructor(){
		super();
		
	}

	componentWillMount() {
		this.setState ( {
			newOrganization:{},
			fireRedirect: false,
			orgID: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`
		});
	}


	static defaultProps = {
		//         "name": "Alabama",
		//         "abbreviation": "AL"
		statesA:["AB", "BC"],
		states: [
		    {
		        "name": "Alabama",
		        "abbreviation": "AL"
		    },
		    {
		        "name": "Alaska",
		        "abbreviation": "AK"
		    },
		    {
		        "name": "American Samoa",
		        "abbreviation": "AS"
		    },
		    {
		        "name": "Arizona",
		        "abbreviation": "AZ"
		    },
		    {
		        "name": "Arkansas",
		        "abbreviation": "AR"
		    },
		    {
		        "name": "California",
		        "abbreviation": "CA"
		    },
		    {
		        "name": "Colorado",
		        "abbreviation": "CO"
		    },
		    {
		        "name": "Connecticut",
		        "abbreviation": "CT"
		    },
		    {
		        "name": "Delaware",
		        "abbreviation": "DE"
		    },
		    {
		        "name": "District Of Columbia",
		        "abbreviation": "DC"
		    },
		    {
		        "name": "Federated States Of Micronesia",
		        "abbreviation": "FM"
		    },
		    {
		        "name": "Florida",
		        "abbreviation": "FL"
		    },
		    {
		        "name": "Georgia",
		        "abbreviation": "GA"
		    },
		    {
		        "name": "Guam",
		        "abbreviation": "GU"
		    },
		    {
		        "name": "Hawaii",
		        "abbreviation": "HI"
		    },
		    {
		        "name": "Idaho",
		        "abbreviation": "ID"
		    },
		    {
		        "name": "Illinois",
		        "abbreviation": "IL"
		    },
		    {
		        "name": "Indiana",
		        "abbreviation": "IN"
		    },
		    {
		        "name": "Iowa",
		        "abbreviation": "IA"
		    },
		    {
		        "name": "Kansas",
		        "abbreviation": "KS"
		    },
		    {
		        "name": "Kentucky",
		        "abbreviation": "KY"
		    },
		    {
		        "name": "Louisiana",
		        "abbreviation": "LA"
		    },
		    {
		        "name": "Maine",
		        "abbreviation": "ME"
		    },
		    {
		        "name": "Marshall Islands",
		        "abbreviation": "MH"
		    },
		    {
		        "name": "Maryland",
		        "abbreviation": "MD"
		    },
		    {
		        "name": "Massachusetts",
		        "abbreviation": "MA"
		    },
		    {
		        "name": "Michigan",
		        "abbreviation": "MI"
		    },
		    {
		        "name": "Minnesota",
		        "abbreviation": "MN"
		    },
		    {
		        "name": "Mississippi",
		        "abbreviation": "MS"
		    },
		    {
		        "name": "Missouri",
		        "abbreviation": "MO"
		    },
		    {
		        "name": "Montana",
		        "abbreviation": "MT"
		    },
		    {
		        "name": "Nebraska",
		        "abbreviation": "NE"
		    },
		    {
		        "name": "Nevada",
		        "abbreviation": "NV"
		    },
		    {
		        "name": "New Hampshire",
		        "abbreviation": "NH"
		    },
		    {
		        "name": "New Jersey",
		        "abbreviation": "NJ"
		    },
		    {
		        "name": "New Mexico",
		        "abbreviation": "NM"
		    },
		    {
		        "name": "New York",
		        "abbreviation": "NY"
		    },
		    {
		        "name": "North Carolina",
		        "abbreviation": "NC"
		    },
		    {
		        "name": "North Dakota",
		        "abbreviation": "ND"
		    },
		    {
		        "name": "Northern Mariana Islands",
		        "abbreviation": "MP"
		    },
		    {
		        "name": "Ohio",
		        "abbreviation": "OH"
		    },
		    {
		        "name": "Oklahoma",
		        "abbreviation": "OK"
		    },
		    {
		        "name": "Oregon",
		        "abbreviation": "OR"
		    },
		    {
		        "name": "Palau",
		        "abbreviation": "PW"
		    },
		    {
		        "name": "Pennsylvania",
		        "abbreviation": "PA"
		    },
		    {
		        "name": "Puerto Rico",
		        "abbreviation": "PR"
		    },
		    {
		        "name": "Rhode Island",
		        "abbreviation": "RI"
		    },
		    {
		        "name": "South Carolina",
		        "abbreviation": "SC"
		    },
		    {
		        "name": "South Dakota",
		        "abbreviation": "SD"
		    },
		    {
		        "name": "Tennessee",
		        "abbreviation": "TN"
		    },
		    {
		        "name": "Texas",
		        "abbreviation": "TX"
		    },
		    {
		        "name": "Utah",
		        "abbreviation": "UT"
		    },
		    {
		        "name": "Vermont",
		        "abbreviation": "VT"
		    },
		    {
		        "name": "Virgin Islands",
		        "abbreviation": "VI"
		    },
		    {
		        "name": "Virginia",
		        "abbreviation": "VA"
		    },
		    {
		        "name": "Washington",
		        "abbreviation": "WA"
		    },
		    {
		        "name": "West Virginia",
		        "abbreviation": "WV"
		    },
		    {
		        "name": "Wisconsin",
		        "abbreviation": "WI"
		    },
		    {
		        "name": "Wyoming",
		        "abbreviation": "WY"
		    }
		]
	}


	handleSubmit(e){
		console.log()
		this.setState({newOrganization:{
			name: this.refs.name.inputRef.value,
			description: this.refs.description.inputRef.value,
			address: this.refs.streetAddress.inputRef.value + ", " + this.refs.city.inputRef.value + ", " + this.refs.state.value + " " + this.refs.zipcode.inputRef.value,
			phone_number: this.refs.phoneNumber.inputRef.value,
			email: this.refs.email.inputRef.value,
			admins: [1]
		}}, function() {
			console.log(this.state.newOrganization)
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/",
		      dataType: 'json',
		      headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
		      data: this.state.newOrganization,
		      success: function(data) {
		        this.setState(
		        	{
		        		orgPost: data,
		        		orgID: data.id,
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
  	const { orgID } = this.state;
  	const { buttonClasses } =this.state;


  	let stateOptions = this.props.states.map(state => {
  		return <option key={state.name} value={state.abbreviation}>{state.abbreviation}</option>
  	});

    return (
    	<div className={"materialContainer"} style={{overflowY: "auto"}}>
           <div className={"box"}>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className={"title"}>ADD ORGANIZATION</div>

              <Textfield
				    onChange={() => {}}
				    label="Name..."
				    floatingLabel
				    ref="name"
				    style={{width: '200px'}}
				/>
		      	<Textfield
				    onChange={() => {}}
				    label="Description..."
				    floatingLabel
				    ref="description"
				    rows={3}
				    style={{width: '200px'}}
				/>
		      	<Textfield
				    onChange={() => {}}
				    label="Street Address..."
				    floatingLabel
				    ref="streetAddress"
				    style={{width: '200px'}}
				/>
		      	<Textfield
				    onChange={() => {}}
				    label="City..."
				    floatingLabel
				    ref="city"
				    style={{width: '200px'}}
				/>
		      		<div>
			      		<label>State</label><br />
			      		<select ref= "state">
			      			{stateOptions}
			      		</select>
		      		</div>
		      		<Textfield
				    onChange={() => {}}
				    label="Zipcode..."
				    floatingLabel
				    ref="zipcode"
				    style={{width: '200px'}}
				/>
		      		<Textfield
				    onChange={() => {}}
				    label="Phone Number..."
				    floatingLabel
				    ref="phoneNumber"
				    style={{width: '200px'}}
				/>
		      		<Textfield
				    onChange={() => {}}
				    label="Email..."
				    floatingLabel
				    ref="email"
				    style={{width: '200px'}}
				/>

              <div className={"button login"}>
                 <button type="submit"><span>GO</span> <i className={"fa fa-check"}></i></button>
              </div>
            </form>
            {fireRedirect && (
		          <Redirect to={from || '/organizations/' + orgID}/>
		        )} 


           </div>

        </div>
   
     
    );
  }
}

{/* 
    	<Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Add Organization</CardTitle>
		    <CardText>
		       <form onSubmit={this.handleSubmit.bind(this)}>
		       <Textfield
				    onChange={() => {}}
				    label="Name..."
				    floatingLabel
				    ref="name"
				    style={{width: '200px'}}
				    required={true}
				/>
		      	<Textfield
				    onChange={() => {}}
				    label="Description..."
				    floatingLabel
				    ref="description"
				    rows={3}
				    style={{width: '200px'}}
				/>
		      	<Textfield
				    onChange={() => {}}
				    label="Street Address..."
				    floatingLabel
				    ref="streetAddress"
				    style={{width: '200px'}}
				/>
		      	<Textfield
				    onChange={() => {}}
				    label="City..."
				    floatingLabel
				    ref="city"
				    style={{width: '200px'}}
				/>
		      		<div>
			      		<label>State</label><br />
			      		<select ref= "state">
			      			{stateOptions}
			      		</select>
		      		</div>
		      		<Textfield
				    onChange={() => {}}
				    label="Zipcode..."
				    floatingLabel
				    ref="zipcode"
				    style={{width: '200px'}}
				/>
		      		<Textfield
				    onChange={() => {}}
				    label="Phone Number..."
				    floatingLabel
				    ref="phoneNumber"
				    style={{width: '200px'}}
				    required={true}
				/>
		      		<Textfield
				    onChange={() => {}}
				    label="Email..."
				    floatingLabel
				    ref="email"
				    style={{width: '200px'}}
				    required={true}
				/>
				<br/>
		      		<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/' + orgID}/>
		        )} 
		    </CardText>
		</Card> */}

export default AddOrganization;

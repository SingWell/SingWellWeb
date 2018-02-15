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




class EditOrganization extends Component {

	constructor(){
		super();

		let orgName = '';
		let orgAddress = '';
		let orgDescription = '';

		this.state = {
			orgName, 
			orgAddress,
			orgDescription
		}

	   this.handleNameChange = this.handleNameChange.bind(this);
	   this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	   this.handleAddressChange = this.handleAddressChange.bind(this);
	   this.handlePhoneChange = this.handlePhoneChange.bind(this);
	   this.handleEmailChange = this.handleEmailChange.bind(this);
		
	}

	handleNameChange() {
		this.setState({
			orgName: this.refs.name.inputRef.value
		})
	}

	handleDescriptionChange() {
		this.setState({
			orgDescription: this.refs.description.inputRef.value
		})
	}

	handleAddressChange() {
		this.setState({
			orgAddress: this.refs.streetAddress.inputRef.value
		})
	}

	handlePhoneChange() {
		this.setState({
			orgPhone: this.refs.phoneNumber.inputRef.value
		})
	}

	handleEmailChange() {
		this.setState({
			orgEmail: this.refs.email.inputRef.value
		})
	}

	componentWillMount() {
		this.setState ( {
			newOrganization:{},
			fireRedirect: false,
			orgID: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`
		});

		$.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID ,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({
				orgName: data.name, 
				orgAddress: data.address,
				orgDescription: data.description,
          	}, function() {
            console.log(this.state)
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err)
        }
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
			  type: "PATCH",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/",
		      dataType: 'json',
		      //headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
		      data: this.state.newOrganization,
		      success: function(data) {
		        this.setState(
		        	{
		        		orgPut: data,
		        		orgID: this.props.match.params.orgID,
		        		fireRedirect: true 
		        	},function(){
		        		console.log(this.state);
		        		console.log(this.state.newOrganization);
		        		console.log("success");
		        		console.log(xhr);
		        		console.log(xhr.responsetText);

		        	})
		      }.bind(this),
		      error: function(xhr, status, err) {
				console.log(err);
				console.log(xhr.responseText);
				console.log(this);
				console.log(xhr);
		      }.bind(this)
		    })
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

    	<Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Edit Organization</CardTitle>
		    <CardText>
		       <form onSubmit={this.handleSubmit.bind(this)}>
		       <Textfield
				    onChange={() => {}}
				    label="Name..."
				    floatingLabel
				    ref="name"
				    style={{width: '200px'}}
				    value={this.state.orgName}
				    onChange={this.handleNameChange}
				/>
		      		<Textfield
				    onChange={() => {}}
				    label="Description..."
				    floatingLabel
				    ref="description"
				    rows={3}
				    style={{width: '200px'}}
				    value={this.state.orgDescription}
				    onChange={this.handleDescriptionChange}
				/>
		      		<Textfield
				    onChange={() => {}}
				    label="Street Address..."
				    floatingLabel
				    ref="streetAddress"
				    style={{width: '200px'}}
				    value={this.state.orgAddress}
				    onChange={this.handleAddressChange}
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
				    value={this.state.orgPhone}
				    onChange={this.handlePhoneChange}
				/>
		      		<Textfield
				    onChange={() => {}}
				    label="Email..."
				    floatingLabel
				    ref="email"
				    style={{width: '200px'}}
				    value={this.state.orgEmail}
				    onChange={this.handleEmailChange}
				/>
				<br/>
		      		<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/' + orgID}/>
		        )} 
		    </CardText>
		</Card>
     
    );
  }
}

export default EditOrganization;

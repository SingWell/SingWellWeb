import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText } from  'react-mdl';
//import MuiThemeProvider from 'material-ui/styles';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MenuItem, TextField, RaisedButton, FlatButton, SelectField } from 'material-ui/'
import { getColorClass, getTextColorClass } from '../css/palette';


class CreateProfile extends Component {

	constructor(){
		super();

		let	email = ''; 
		let	phone = ''; 
		let	address = ''; 
		let	bio = ''; 
		let	city = ''; 
		let	zip = ''; 
		let	state = ''; 
		let	dob = ''; 

		this.state = {
			phone,
			address,
			bio,
			city,
			zip,
			state,
			dob
		}

		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleZipChange = this.handleZipChange.bind(this);
		this.handleBioChange = this.handleBioChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleDobChange = this.handleDobChange.bind(this);

	}

	static defaultProps ={
		instruments: [
		  'Bassoon',
		  'Cello',
		  'Clarinet',
		  'English Horn',
		  'Euphonium',
		  'Flute',
		  'French Horn',
		  'Guitar',
		  'Oboe',
		  'Organ',
		  'Percussion',
		  'Piano',
		  'Saxophone',
		  'String Bass',
		  'Trombone',
		  'Trumpet',
		  'Tuba',
		  'Viola',
		  'Violin'
		],
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

    //handleChange = (event, index, values) => this.setState({values});

    handlePhoneChange(event, value) {
		this.setState({
			phone: value
		})
	}

	handleAddressChange(event, value) {
		console.log(value)
		this.setState({
			address: value
		})
	}

	handleBioChange(event, value) {
		this.setState({
			bio: value 
		})
	}

	handleCityChange(event, value) {
		this.setState({
			city: value
		})
	}

	handleZipChange(event, value) {
		this.setState({
			zip: value
		})
	}

	handleStateChange(event, value) {
		console.log(value);
		let state = this.props.states[value].name
		this.setState({
			state: state
		})
	}

	handleDobChange(event, value) {
		this.setState({
			dob: value
		})
	}

	instrumentItems(values) {
	    return this.props.instruments.map((instrument) => (
			<MenuItem
				key={instrument}
				insetChildren={true}
				checked={values && values.indexOf(instrument) > -1}
				value={instrument}
				primaryText={instrument}
			/>
    	));
	}

	stateItems(values) {
		return this.props.states.map((state) => (
			<MenuItem
				key={state.name}
				insetChildren={true}
				checked={values && values.indexOf(state) > -1}
				value={state.abbreviation}
				primaryText={state.abbreviation}
			/>
		));
	}

	componentWillMount() {
		this.setState ( {
			fireRedirect: false,
			user: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`

		});
	}
  

	handleSubmit(e){
		this.setState({newProfile :{
			// fname: this.refs.fname.value,
			// lname: this.refs.lname.value,
			// email: this.refs.email.value,
			profile: {
				phone_number: this.state.phone,
				bio: this.state.bio, 
				address: this.state.address,
				city: this.state.city,
				state: this.state.state,
				zip_code: this.state.zip,
				//instruments: this.refs.instruments.value,
				date_of_birth: this.state.dob
		}}},
			function() {
			console.log(this.state)
			$.ajax({
			  type: "PATCH",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/" + this.props.match.params.userID + "/",
		      dataType: 'json',
		      data: this.state.newProfile,
		      success: function(data) {
		        this.setState(
		        	{
		        		profilePatch: data,
		        		//user: 1,
		        		fireRedirect: true 
		        	});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.log(err);
		        console.log(this.state)
				console.log(xhr.responseText);
				console.log(this);
				console.log(xhr);
		      }
		    });
		});
  		e.preventDefault();
  	}

  	render() {
	  	const { from } = this.props.location.state || '/';
	  	const { fireRedirect } = this.state;
	  	const { values } = this.state;

	    return (
	      <Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Create Profile </CardTitle>
		    <CardText>
		    	<Link to="/users/1">
		    		<FlatButton label="skip this step" />
		    	</Link>
		       {/*}	<TextField
				    onChange={() => {}}
				    floatingLabelText="First Name..."
				    ref="name"
				    style={{width: '200px'}}
				/>
		      	<TextField
				    onChange={() => {}}
				    floatingLabelText="Last Name..."
				    ref="description"
				    style={{width: '200px'}}
				/>*/}
				<TextField
				onChange={this.handleAddressChange}
					floatingLabelText="Address..."
					ref="address"
					style={{width: '200px'}}
				/>
				<TextField
					onChange={this.handleCityChange}
					floatingLabelText="City..."
					ref="city"
					style={{width: '200px'}}
				/>
				<SelectField
					floatingLabelText="State..."
					ref="state"
					value={this.state.values}
					maxHeight={200}
					style={{width: '200px'}}
					onChange={this.handleStateChange} >
						{this.stateItems(this.values)}
				</SelectField>
				<TextField
					onChange={this.handleZipChange}
					floatingLabelText="Zip..."
					ref="zipcode"
					type="number"
					style={{width: '200px'}}
				/>
		      	<TextField
				    onChange={this.handleBioChange}
				    floatingLabelText="Bio..."
				    ref="bio"
				    rows={3}
				    multiLine={true}
				    style={{width: '200px'}}
				/>
		      	{/*<TextField
				    onChange={() => {}}
				    floatingLabelText="Email..."
				    ref="city"
				    style={{width: '200px'}}
				/>*/}
				{/*<SelectField
			        multiple={true}
			        floatingLabelText="Select your Instruments..."
			        value={this.state.values}
			        onChange={this.handleChange}
			    >
			        {this.instrumentItems(this.values)}
				</SelectField>*/}

		      	<TextField
				    onChange={this.handlePhoneChange}
				    floatingLabelText="Phone Number..."
				    type="number"
				    ref="phone"
				    style={{width: '200px'}}
				/>
	      		<TextField
	      			onChange={this.handleDobChange}
			        id="date"
			        floatingLabelText="Birthday"
			        type="text"
			        hintText="mm/dd/yyyy"
			        //className={classes.textField}
			        inputlabelprops={{
			          shrink: true
			        }}
			    />
				<br/>
				{/*<input className={this.state.buttonClasses} type="submit" value="Submit" />*/}
				<RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
		      	{fireRedirect && (
		          <Redirect to={from || '/profile/' + this.props.match.params.userID}/>
		        )}
		    </CardText>
		</Card>

	    );
	  }
	}



export default CreateProfile

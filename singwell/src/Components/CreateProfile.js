import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText } from  'react-mdl';
//import MuiThemeProvider from 'material-ui/styles';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import { MenuItem, TextField, RaisedButton, FlatButton } from 'material-ui/'

class CreateProfile extends Component {

	constructor(){
		super();
		
	}

	componentWillMount() {
		this.setState ( {
			fireRedirect: false,
			user: null
		});
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

    handleChange = (event, index, values) => this.setState({values});

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
  

	handleSubmit(e){
		this.setState({profile:{
			//fname: this.refs.fname.value,
			//lname: this.refs.lname.value,
			//email: this.refs.email.value,
			phone_number: this.refs.phone.value,
			bio: this.refs.bio.value, 
			address: this.refs.address.value,
			city: this.refs.city.value,
			state: this.refs.state.value,
			zip_code: this.refs.state.value,
			//instruments: this.refs.instruments.value,
			date_of_birth: this.refs.dob.value,
		}},
			function() {
			console.log(this.state.profile)
			$.ajax({
			  type: "PUT",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/profile",
		      dataType: 'json',
		      data: this.state.profile,
		      success: function(data) {
		        this.setState(
		        	{
		        		profilePost: data,
		        		user: 1,
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
	  	const { values } = this.state;

	    return (
	      <Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Create Profile </CardTitle>
		    <CardText>
		      <form onSubmit={this.handleSubmit.bind(this)}>
		    	<Link to="/users/1">
		    		<FlatButton label="skip this step" />
		    	</Link>
		       	{/*<TextField
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
				/> */}
				<TextField
					floatingLabelText="Address..."
					ref="address"
					style={{width: '200px'}}
				/>
				<TextField
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
					onChange={this.handleChange}
				>{this.stateItems(this.values)}
				</SelectField>
				<TextField
					floatingLabelText="Zip..."
					ref="zipcode"
					type="number"
					style={{width: '200px'}}
				/>
		      	<TextField
				    onChange={() => {}}
				    floatingLabelText="Bio..."
				    ref="streetAddress"
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
				<SelectField
			        multiple={true}
			        floatingLabelText="Select your Instruments..."
			        value={this.state.values}
			        onChange={this.handleChange}
			    >
			        {this.instrumentItems(this.values)}
				</SelectField>

		      	<TextField
				    onChange={() => {}}
				    floatingLabelText="Phone Number..."
				    type="number"
				    ref="phone"
				    style={{width: '200px'}}
				/>
	      		<TextField
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
				<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      		{/*<RaisedButton type="Submit" label="Save" onclick={this.handleSubmit.bind(this)}/>*/}
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/1/'}/>
		        )}
		    </CardText>
		</Card>

	    );
	  }
	}



export default CreateProfile

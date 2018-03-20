import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardTitle } from  'react-mdl';
//import MuiThemeProvider from 'material-ui/styles';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MenuItem, TextField, RaisedButton, FlatButton, SelectField, CardText} from 'material-ui/'
import { getColorClass, getTextColorClass } from '../css/palette';



class EditProfile extends Component {

	constructor(props){
		super(props);

		/*let fname = ''; 
		let lname = ''; */
		let	email = ''; 
		let	phone = ''; 
		let	address = ''; 
		let	bio = ''; 
		let	city = ''; 
		let	zip = ''; 
		let	state = ''; 
		let	dob = ''; 

		this.state = {
			/*fname, 
			lname,
			email,*/
			phone,
			address,
			bio,
			city,
			zip,
			state,
			dob
		};

		/*this.handleFNameChange = this.handleFNameChange.bind(this);
		this.handleLNameChange = this.handleLNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);*/

		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleBioChange = this.handleBioChange.bind(this);
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleZipChange = this.handleZipChange.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleDobChange = this.handleDobChange.bind(this);

		//this.stateItems = this.stateItems.bind(this);

	}

	/*handleFNameChange() {
		console.log(this.refs.fname);
		this.setState({
			fname: this.refs.fname.inputRef.value
		})
	}

	handleLNameChange() {
		this.setState({
			lname: this.refs.lname.inputRef.value
		})
	}

	handleEmailChange() {
		this.setState({
			email: this.refs.email.inputRef.value
		})
	}*/

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

  	handleCancel(e){
		this.setState(
			{cancelRedirect: true}
		)
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
				value={state.name}
				primaryText={state.abbreviation}
			/>
		));
	}

	componentWillMount() {
		this.setState ({
			profileGet: {},
			updateProfile: {},
			fireRedirect: false,
			cancelRedirect: false,
			user: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`
		});
	}

	fetchList() {
		$.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/" + this.props.match.params.userID ,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
            this.setState({
          		email: data.email,
          		fname: data.first_name,
          		lname: data.last_name,
          		//profileGet: data.profile,
				phone: data.profile.phone_number, 
				address: data.profile.address,
				bio: data.profile.bio,
				city: data.profile.city,
				zip: data.profile.zip_code,
				state: data.profile.state,
				dob: data.profile.date_of_birth

          	}, function() {
            	console.log(this.state)
            	console.log(data)
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err)
        }
      	});
	}

	componentDidMount() {
		this.fetchList();
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


	handleSubmit(e){
		this.setState({updateProfile: {
			profile:{
				user: +this.props.match.params.userID,
				phone_number: this.state.phone,
				bio: this.state.bio, 
				address: this.state.address,
				city: this.state.city,
				state: this.state.state,
				zip_code: this.state.zip,
				//instruments: this.refs.instruments.value,
				date_of_birth: this.state.dob
		}
		}},
			function() {
			console.log(this.state.updateProfile)
			$.ajax({
			  type: "PATCH",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/" + this.props.match.params.userID + "/",
		      dataType: 'json',
		      data: this.state.updateProfile,
		      success: function(data) {
		        this.setState(
		        	{
		        		profilePatch: data,
		        		profilePatch2: this.state.updateProfile,
		        		//user: this.props.match.params.userID,
		        		fireRedirect: true
		        	});
		        console.log(data)
		        //console.log(this.state)
		        console.log(this.state.updateProfile)
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.log(err);
				//console.log(xhr.responseText);
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
	  	const { cancelRedirect } = this.state;
	  	const { values } = this.state;

	    return (
	    <div>
	      <Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Edit Profile</CardTitle>
		    <CardText>
		      {/*<form onSubmit={this.handleSubmit.bind(this)}>*/}
		       	{/*<TextField
				    onChange={() => {}}
				    floatingLabelText="First Name..."
				    ref="name"
				    style={{width: '200px'}}
				    value={this.state.tfname}
				    onChange={this.handleFNameChange.bind(this)}
				/>
		      	<TextField
				    floatingLabelText="Last Name..."
				    ref="description"
				    style={{width: '200px'}}
				    value={this.state.tlname}
				    onChange={this.handleLNameChange.bind(this)}
				/> 
				<TextField
					//onChange={() => {}}
					floatingLabelText="Email..."
					ref="email"
					style={{width: '200px'}}
					value={this.state.temail}
					onChange={this.handleEmailChange.bind(this)}
				/>*/}
				<TextField
					floatingLabelText="Address..."
					ref="address"
					style={{width: '200px'}}
					value={this.state.address}
					onChange={this.handleAddressChange}
				/>

				<TextField
					floatingLabelText="City..."
					ref="city"
					style={{width: '200px'}}
					value={this.state.city}
					onChange={this.handleCityChange}
				/>
				<SelectField
					floatingLabelText="State..."
					//ref="state"
					//value="AK"
					//maxHeight={200}
					value={this.state.state}
					style={{width: '200px'}}
					onChange={this.handleStateChange}
				>{this.stateItems(this.values)}
				</SelectField>
				<TextField
					floatingLabelText="Zip..."
					ref="zip"
					type="number"
					style={{width: '200px'}}
					value={this.state.zip}
					onChange={this.handleZipChange}
				/>
		      	<TextField
				    //onChange={() => {}}
				    floatingLabelText="Bio..."
				    //ref="bio"
				    ref={(input) => { this.bioInput = input; }}
				    rows={3}
				    multiLine={true}
				    style={{width: '200px'}}
				    value={this.state.bio}
				    onChange={this.handleBioChange}
				/>
				{/*<SelectField
			        multiple={true}
			        floatingLabelText="Select your Instruments..."
			        value={this.state.values}
			        onChange={this.handleInstrumentChange}
			    >
			        {this.instrumentItems(this.values)}
				</SelectField>*/}

		      	<TextField
				    onChange={() => {}}
				    floatingLabelText="Phone Number..."
				    ref="phone"
				    style={{width: '200px'}}
				    value={this.state.phone}
				    onChange={this.handlePhoneChange}
				/>
	      		<TextField
			        ref="dob"
			        floatingLabelText="Birthday"
			        style={{width: '200px'}}
			        hintText="mm/dd/yyyy"
			        value={this.state.dob}
			       	onChange={this.handleDobChange}
			    />
				<br/>
				<RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
		      	<FlatButton label="Cancel" onClick={this.handleCancel.bind(this)} />
				{/*<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      		{/*<RaisedButton type="Submit" label="Save" onclick={this.handleSubmit.bind(this)}/>
		      	</form>*/}
		      	{fireRedirect && (
		          <Redirect to={from || '/profile/' + this.props.match.params.userID}/>
		        )}
		        {cancelRedirect && (
		          <Redirect to={from || '/profile/' + this.props.match.params.userID} />  
		        )} 
		    </CardText>
		</Card>
		</div>
	    );
	  }
	}



export default EditProfile

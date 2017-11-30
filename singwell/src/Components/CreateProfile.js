import React, { Component } from 'react';
//import $ from 'jquery';
import { Redirect } from 'react-router';
import { Card, CardTitle, CardText } from  'react-mdl';
//import MuiThemeProvider from 'material-ui/styles';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import { MenuItem, TextField, RaisedButton } from 'material-ui/'

class CreateProfile extends Component {

	constructor(){
		super();
		
	}

	componentWillMount() {
		this.setState ( {
			fireRedirect: false,
			//orgID: null

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
		]
	}

    handleChange = (event, index, values) => this.setState({values});

	menuItems(values) {
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

	handleSubmit(e){
		this.setState({newUser:{
			//fname: this.refs.fname.value,
			//lname: this.refs.lname.value,
			email: this.refs.email.value,
			phone_number: this.refs.phone.value,
			bio: this.refs.bio.value, 
			address: this.refs.address.value,
			city: this.refs.city.value,
			state: this.refs.state.value,
			zipcode: this.refs.state.value,
			talents: this.refs.instruments.value,
			date_of_birth: this.refs.dob.value,
		}},
			this.props.createProfile(this.state.newUser)
		});

	
  		e.preventDefault();
  	}


  	render() {
	  	const { from } = this.props.location.state || '/';
	  	const { fireRedirect } = this.state;
	  	//const { orgID } = this.state;
	  	const { values } = this.state;

	    return (
	      <Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Create Profile</CardTitle>
		    <CardText>
		       <form onSubmit={this.handleSubmit.bind(this)}>
		       <TextField
				    onChange={() => {}}
				    floatingLabelText="First Name..."
				    ref="name"
				    style={{width: '200px'}}
				    required={true}
				/>
		      	<TextField
				    onChange={() => {}}
				    floatingLabelText="Last Name..."
				    ref="description"
				    style={{width: '200px'}}
				    required={true}
				/>
		      	<TextField
				    onChange={() => {}}
				    floatingLabelText="Bio..."
				    ref="streetAddress"
				    rows={3}
				    multiLine={true}
				    style={{width: '200px'}}
				/>
		      	<TextField
				    onChange={() => {}}
				    floatingLabelText="Email..."
				    ref="city"
				    style={{width: '200px'}}
				    required={true}
				/>
				<SelectField
			        multiple={true}
			        floatingLabelText="Select your Instruments"
			        value={this.state.values}
			        onChange={this.handleChange}
			    >
			        {this.menuItems(this.values)}
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
			        //defaultValue="2017-05-24"
			        //className={classes.textField}
			        inputlabelprops={{
			          shrink: true
			        }}
			    />
				<br/>
		      		{/*<input className={this.state.buttonClasses} type="submit" value="Submit" />*/}
		      		<RaisedButton type="Submit" label="Save" />
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/users/1'}/>
		        )}
		    </CardText>
		</Card>

	    );
	  }
	}


export default CreateProfile

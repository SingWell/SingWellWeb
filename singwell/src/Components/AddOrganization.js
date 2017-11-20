import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router'

class AddOrganization extends Component {

	constructor(){
		super();
		
	}

	componentWillMount() {
		this.setState ( {
			newOrganization:{},
			fireRedirect: false,
			orgID: null
			
		});
	}


	static defaultProps = {
		//         "name": "Alabama",
		//         "abbreviation": "AL"
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
		this.setState({newOrganization:{
			name: this.refs.name.value,
			description: this.refs.description.value,
			address: this.refs.streetAddress.value + ", " + this.refs.city.value + ", " + this.refs.state.value + " " + this.refs.zipcode.value,
			admins: [1]
		}}, function() {
			console.log(this.state.newOrganization)
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/",
		      dataType: 'json',
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


  	let stateOptions = this.props.states.map(state => {
  		return <option key={state.name} value={state.abbreviation}>{state.abbreviation}</option>
  	});

    return (
      <div>
      	<h3>Add Organization </h3>
      	<form onSubmit={this.handleSubmit.bind(this)}> 
      		<div>
	      		<label>Name</label><br />
	      		<input type="text" ref= "name" />
      		</div>
      		<div>
	      		<label>Description</label><br />
	      		<input type="text" ref= "description" />
      		</div>
      		<div>
	      		<label>Street Address</label><br />
	      		<input type="text" ref= "streetAddress" />
      		</div>
      		<div>
	      		<label>City</label><br />
	      		<input type="text" ref= "city" />
      		</div>
      		<div>
	      		<label>State</label><br />
	      		<select ref= "state">
	      			{stateOptions}
	      		</select>
      		</div>
      		<div>
	      		<label>Zipcode</label><br />
	      		<input type="text" ref= "zipcode" />
      		</div>
      		<div>
	      		<label>Phone Number</label><br />
	      		<input type="text" ref= "phoneNumber" />
      		</div>
      		<div>
	      		<label>Email</label><br />
	      		<input type="text" ref= "email" />
      		</div>
      		<input type="submit" value="Submit" />
      	</form>
      	{fireRedirect && (
          <Redirect to={from || '/organizations/' + orgID}/>
        )}
      </div>
    );
  }
}

export default AddOrganization;

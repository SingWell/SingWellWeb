import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router'

class AddChoir extends Component {

	constructor() {
		super();
		
	}

	componentWillMount() {
		this.setState ( {
			newChoir:{},
			fireRedirect: false,
			choirID: null
		});
	}

	handleSubmit(e){
		this.setState({newChoir:{
			name: this.refs.name.value,
			meeting_day: this.refs.meetingDay.value,
			meeting_day_start_hour: this.refs.meetingStartTime.value,
			meeting_day_end_hour: this.refs.meetingEndTime.value,
			organization: this.props.match.params.orgID,
			choristers: [
				1
			]
		}}, function() {
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/choirs/",
		      dataType: 'json',
		      data: this.state.newChoir,
		      success: function(data) {
		        this.setState(
		        	{
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

    return (
      <div>
      	<h3>Add Choir </h3>
      	<form onSubmit={this.handleSubmit.bind(this)}> 
      		<div>
	      		<label>Name</label><br />
	      		<input type="text" ref= "name" />
      		</div>
      		{/* <div>
	      		<label>Description</label><br />
	      		<input type="text" ref= "description" />
      		</div> */}
      		<div>
	      		<label>Meeting Day</label><br />
	      		<input type="text" ref= "meetingDay" />
      		</div>
      		<div>
	      		<label>Meeting Start Time</label><br />
	      		<input type="text" ref= "meetingStartTime" />
      		</div>
      		<div>
	      		<label>Meeting End Time</label><br />
	      		<input type="text" ref= "meetingEndTime" />
      		</div>
      		<input type="submit" value="Submit" />
      	</form>
      	{fireRedirect && (
          <Redirect to={from || '/organizations/' + this.props.match.params.orgID + '/choirs/' + choirID}/>
        )}
      </div>
    );
  }
}

export default AddChoir;

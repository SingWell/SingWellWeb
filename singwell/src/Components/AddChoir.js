import React, { Component } from 'react';
import $ from 'jquery';

class AddChoir extends Component {

	constuctor(){
		this.setState ( {
			newChoir:{}
		});
	}


	static defaultProps = {
		
	}


	handleSubmit(e){
		this.setState({newChoir:{
			name: this.refs.name.value,
			meeting_day: 1,
			meeting_day_start_hour: "11:00",
			meeting_day_end_hour: "12:00",
			organization: 1,
			choristers: [
				1
			]
		}}, function() {
			console.log(this.state.newChoir)
			$.ajax({
			  type: "POST",
		      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/1/choirs/",
		      dataType: 'application/json',
		      data: this.state.newChoir,
		      success: function(data) {
		        this.setState({choirPost: data}, function(){
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
      </div>
    );
  }
}

export default AddChoir;

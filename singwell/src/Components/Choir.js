import React, { Component } from 'react';
import $ from 'jquery';



class Choir extends Component {

  componentWillMount() {
    this.setState ( {
        choirGet:{}
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/choirs/" + this.props.match.params.choirID,
        dataType: 'json',
        cache: false, 
        success: function(data) {
          this.setState({choirGet: data}, function() {
            console.log(this.state)
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });
    }

  render() {


      return (
        <div className="Choir">
           <h1> {this.state.choirGet.name} </h1>
           <h2> {this.state.choirGet.meeting_day} </h2>
           <h2> {this.state.choirGet.meeting_day_start_hour} </h2>
           <h2> {this.state.choirGet.meeting_day_end_hour} </h2>
            


        </div>

      );
    }
}

export default Choir;

import React, { Component } from 'react';
import OrganizationItem from './OrganizationItem';
import $ from 'jquery';
import '../css/Organizations.css'



class Organizations extends Component {

  componentWillMount() {
    this.setState ( {
        orgGet:{}
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/",
        dataType: 'json',
        cache: false, 
        success: function(data) {
          this.setState({orgGet: data[0]});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });
  }

  render() {


  	// let organizationItem;
  	// if(this.state.orgGet ) {
  		// organizationItems = this.state.orgGet.map(organization => {
  			// return (
  			// 	<OrganizationItem key = {organization.name} organization={organization} />
  			// );
  		// });

  	// }
      return (
        <div className="Organizations">
         <h1> {this.state.orgGet.name} </h1>

           
        </div>
      );
    }
}

export default Organizations;

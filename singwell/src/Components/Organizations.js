import React, { Component } from 'react';
import OrganizationItem from './OrganizationItem';
import $ from 'jquery';



class Organizations extends Component {

  componentWillMount() {
    $.ajax({
      type: "GET",
      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/",
      dataType: 'json',
      cache: false, 
      success: function(data) {
        this.setState({orgGet: data}, function(){
          console.log(this.state);
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  render() {

  	let organizationItems;
  	if(this.state.orgGet) {
  		organizationItems = this.state.orgGet.map(organization => {
  			return (
  				<OrganizationItem key = {organization.name} organization={organization} />
  			);
  		});

  	}
      return (
        <div className="Organizations">
        	<h3> Latest Organizations </h3>
          {organizationItems}
        </div>
      );
    }
}

export default Organizations;

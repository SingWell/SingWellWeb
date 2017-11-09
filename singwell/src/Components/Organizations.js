import React, { Component } from 'react';
import OrganizationItem from './OrganizationItem';


class Organizations extends Component {
	


  render() {

  	let organizationItems;
  	console.log(this.props.organizations)
	if(this.props.organizations) {
		organizationItems = this.props.organizations.map(organization => {
			return (
				<OrganizationItem key= {organization.title} organization={organization} />
			);
		});

	}
  	console.log(this.props)
    return (
      <div className="Organizations">
      	<h3> Latest Organizations </h3>
        {organizationItems}
      </div>
    );
  }
}

export default Organizations;

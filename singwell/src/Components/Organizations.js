import React, { Component } from 'react';
import OrganizationItem from './OrganizationItem';



class Organizations extends Component {

  render() {

  	let organizationItems;
	if(this.props.organizations) {
		organizationItems = this.props.organizations.map(organization => {
			return (
				<OrganizationItem key= {organization.name} organization={organization} />
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

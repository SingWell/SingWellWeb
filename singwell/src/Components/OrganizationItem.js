import React, { Component } from 'react';


class OrganizationItem extends Component {
	


  render() {
  	console.log(this.props)
    return (
    	<ul className="Organization">
	      <li >
	      	{this.props.organization.name} 
	      </li>
	      <li >
	      	{this.props.organization.description} 
	      </li>
		</ul>
    );
  }
}

export default OrganizationItem;

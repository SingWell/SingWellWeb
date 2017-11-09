import React, { Component } from 'react';


class OrganizationItem extends Component {
	


  render() {
  	console.log(this.props)
    return (
      <li className="Organization">
      	<strong>{this.props.organization.title}:</strong> {this.props.organization.category}
      </li>
    );
  }
}

export default OrganizationItem;

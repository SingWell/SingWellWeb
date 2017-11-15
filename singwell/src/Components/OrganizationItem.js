import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrganizationItem extends Component {
	


  render() {
  	
  	console.log(this.props)
    return (
    	<ul className="Organization">
	      <li >
	      	<Link to={`/`}>{this.props.organization.name}</Link>
	      </li>
		</ul>
    );
  }
}

export default OrganizationItem;

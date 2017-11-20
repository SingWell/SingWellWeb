import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChoirItem extends Component {

  render() {
    return (
	      <li>
	      	<Link to={`/organizations/${this.props.orgID}/choirs/${this.props.choir.id}`}>{this.props.choir.name}</Link>
	      </li>
    );
  }
}

export default ChoirItem;

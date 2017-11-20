import React, { Component } from 'react';
import OrganizationItem from './OrganizationItem';
import classNames from 'classnames';
import $ from 'jquery';
import '../css/Organizations.css'
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';

import { getColorClass, getTextColorClass } from '../css/palette';




class Organizations extends Component {

  componentWillMount() {
    this.setState ( {
        orgGet:{}
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.id,
        dataType: 'json',
        cache: false, 
        success: function(data) {
          this.setState({orgGet: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });
    }

  render() {

      return (
        <div className="Organizations">
         <h1> {this.state.orgGet.name} </h1>
         <h2> {this.state.orgGet.description} </h2>

           
        </div>
      );
    }
}

export default Organizations;

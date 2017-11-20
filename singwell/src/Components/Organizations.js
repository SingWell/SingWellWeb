import React, { Component } from 'react';
import ChoirItem from './ChoirItem';
import classNames from 'classnames';
import $ from 'jquery';
import '../css/Organizations.css'
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';

import { getColorClass, getTextColorClass } from '../css/palette';
import { Link } from 'react-router-dom';




class Organizations extends Component {

  componentWillMount() {
    this.setState ( {
        orgGet:{},
        choirGet:[]
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID,
        dataType: 'json',
        cache: false, 
        success: function(data) {
          this.setState({orgGet: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/choirs/",
        dataType: 'json',
        cache: false, 
        success: function(data) {
          this.setState({choirGet: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });
    }

  render() {

        let choirItems;
        choirItems = this.state.choirGet.map(choir => {
            return (
                <ChoirItem key= {choir.id} choir={choir} orgID={this.props.match.params.orgID}/>
            );
        });


      return (
        <div className="Organizations">
         <h1> {this.state.orgGet.name} </h1>
         <h2> {this.state.orgGet.description} </h2>
         <h3> Choirs </h3>
         <ul className="Choirs">
            {choirItems}
            <li>
                <Link to={`/organizations/${this.props.match.params.orgID}/choirs/`}>Add Choir</Link>
              </li>
         </ul>
            


        </div>

      );
    }
}

export default Organizations;

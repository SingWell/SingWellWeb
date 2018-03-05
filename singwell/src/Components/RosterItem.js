import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';




class RosterItem extends Component {

  componentWillMount() {
    this.setState ( {

      });
  }

  render() {

    // need to link th username to their profile page

    return (

      <ListItem style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/profile/' + this.props.person.id)}>
        <ListItemContent avatar="person" >{this.props.person.first_name} {this.props.person.last_name}</ListItemContent>
      </ListItem>
    );
  }

}

export default RosterItem;

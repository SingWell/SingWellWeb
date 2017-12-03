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

      <ListItem>
        <ListItemContent avatar="person" >{this.props.person.username}</ListItemContent>
      </ListItem>
    );
  }

}

export default RosterItem;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';




class MusicLibraryItem extends Component {

  componentWillMount() {
    this.setState ( {

      });
  }

  render() {

    return (
      <ListItem twoLine style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/organizations/' + this.props.music.organization)}>
        <ListItemContent avatar="person" subtitle={this.props.music.composer}>{this.props.music.title}</ListItemContent>
      </ListItem>
    );
  }

}

export default MusicLibraryItem;

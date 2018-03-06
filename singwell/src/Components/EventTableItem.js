import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';



class EventTableItem extends Component {

  render() {

    return (

      <TableRow key={this.props.programItem.id}>
                      <TableRowColumn>{this.props.programItem.field_title}</TableRowColumn>
                      <TableRowColumn><Link to={'/organizations/' + this.props.orgID + '/music/' + this.props.programItem.music_record}>{this.props.programItem.title}</Link></TableRowColumn>
                      <TableRowColumn>{this.props.programItem.notes}</TableRowColumn>
      </TableRow>
    );
  }

}

export default EventTableItem;

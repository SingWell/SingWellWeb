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


// TODO: Change to ProgramTableItem
class EventTableItem extends Component {

  render() {

    return (

      <TableRow key={this.props.programItem.id}>
                      <TableRowColumn style={{fontSize: '16pt'}}>{this.props.programItem.field_title}</TableRowColumn>
                      <TableRowColumn style={{fontSize: '16pt'}}><Link style={{color: 'rgb(0, 0, 240)'}} to={'/organizations/' + this.props.orgID + '/music/' + this.props.programItem.music_record}>{this.props.programItem.title}</Link></TableRowColumn>
                      <TableRowColumn style={{fontSize: '16pt'}}>{this.props.programItem.notes}</TableRowColumn>
      </TableRow>
    );
  }

}

export default EventTableItem;

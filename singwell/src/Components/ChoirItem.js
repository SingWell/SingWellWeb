import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';




class ChoirItem extends Component {

  render() {

    return (
      <Cell col={6}>
        <Card shadow={0} style={{margin: '10px auto'}} onClick={() => this.props.history.push('/organizations/' + this.props.choir.organization + '/choirs/' + this.props.choir.id)}>
            <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>{this.props.choir.name}</CardTitle>
            <CardText>
                Meeting Day: {this.props.choir.meeting_day}
                <br/>
                Start Time: {this.props.choir.meeting_day_start_hour}
                <br/>
                End Time: {this.props.choir.meeting_day_end_hour}
            </CardText>
        </Card>
      </Cell>
    );
  }
  // onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/choirs/' + this.props.choir.id)}
  // <li>
  //         <Link to={`/organizations/${this.props.orgID}/choirs/${this.props.choir.id}`}>{this.props.choir.name}</Link>
  //       </li>
}

export default ChoirItem;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';




class ChoirItem extends Component {

  componentWillMount() {
    this.setState ( {
        weekday: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
      });
  }

  render() {
    const { weekday } = this.state

    return (
      <Cell col={6}>
        <Card shadow={0} style={{margin: '10px auto'}} onClick={() => this.props.history.push('/organizations/' + this.props.choir.organization + '/choirs/' + this.props.choir.id)}>
            <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>{this.props.choir.name}</CardTitle>
            <CardText>
                Meeting Day: {this.state.weekday[this.props.choir.meeting_day - 1]}
                <br/>
                Start Time: {this.props.choir.meeting_day_start_hour}
                <br/>
                End Time: {this.props.choir.meeting_day_end_hour}
            </CardText>
        </Card>
      </Cell>
    );
  }

}

export default ChoirItem;

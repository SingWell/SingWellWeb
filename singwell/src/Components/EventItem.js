import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';

import moment from 'moment';


class ChoirItem extends Component {

  componentWillMount() {
    
  }

  render() {
    // console.log(eventItem)
    // let eventItems = this.state.eventGet.map(event => {
    //         if(typeof(events[moment(event.date).date()]) !== "undefined") {
    //             events[moment(event.date).date()].push(event.name + "&&&" + event.id)
    //             // events[moment(event.date).date()].push({"name":event.name, "id":event.id})
               
    //         } else {
    //             events[moment(event.date).date()] = [event.name + "&&&" + event.id]
    //             // events[moment(event.date).date()] = [{"name":event.name, "id":event.id}]
    //         }
            
    //     });

    return (
      <Cell col={3}>
        <Card shadow={0} style={{margin: '10px auto', minHeight:"0px"}} onClick={() => this.props.history.push('/organizations/' + this.props.event.organization + "/events/" + this.props.event.id)}>
            <CardTitle style={{}}>{this.props.event.name}</CardTitle>
            <CardText>
                Date: {moment(this.props.event.date).format("MMM Do, YYYY") }
                <br/>
                Location: {this.props.event.location}
                <br/>
                Start Time: {moment(this.props.event.time, "H:m:s").format('LT') }
            </CardText>
        </Card>
      </Cell>
    );
  }

}

export default ChoirItem;

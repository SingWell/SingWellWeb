import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import { IconButton, FontIcon } from 'material-ui/';
import ImageEdit from 'material-ui/svg-icons/image/edit';



import moment from 'moment';

class ChoirItem extends Component {

  componentWillMount() {
    this.setState ( {
        weekday: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
      });
  }

  render() {
    const { weekday } = this.state
    console.log(this.props.choir)
    return (
      <Cell col={6}>

        {/*<Card shadow={0} style={{margin: '10px auto'}} onClick={() => this.props.history.push('/choirs/' + this.props.choir.id)}>
            <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://storage.googleapis.com/material-design/publish/material_v_12/assets/0Bx4BSt6jniD7Sy1kVWlTS1NnNGM/style-imagery-bestpractices-focus5.png) center / cover'}}>{this.props.choir.name}</CardTitle>
            <CardText>*/}

        <Card shadow={0} style={{margin: '10px auto'}} onClick={() => this.props.history.push('/organizations/' + this.props.choir.organization + '/choirs/' + this.props.choir.id)}>
             <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://storage.googleapis.com/material-design/publish/material_v_12/assets/0Bx4BSt6jniD7Sy1kVWlTS1NnNGM/style-imagery-bestpractices-focus5.png) center / cover'}}>{this.props.choir.name}</CardTitle>
          
                <CardText>
                Meeting Day: {this.state.weekday[this.props.choir.meeting_day - 1]}
                <br/>
                Start Time: {moment(this.props.choir.meeting_day_start_hour, "H:m:s").format('LT')}
                <br/>
                End Time: {moment(this.props.choir.meeting_day_end_hour, "H:m:s").format('LT')}
            </CardText>
        </Card>
      </Cell>
    );
  }

}

export default ChoirItem;

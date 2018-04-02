import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, Icon, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import { IconButton, FontIcon, Card, Dialog, FlatButton, RaisedButton } from 'material-ui/';
import ActionDelete from 'material-ui/svg-icons/action/delete';


class RosterItem extends Component {

  constructor(props) {
    super(props)

    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillMount() {
    this.setState ( {
        open: false,
        //choirGet: {}
      });

     // $.ajax({
     //    type: "GET",
     //    url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.choirID,
     //    dataType: 'json',
     //    cache: false, 
     //    headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
     //    success: function(data) {
     //      this.setState({
     //        choirGet: data
     //      }, function() {
     //        console.log(this.state)
     //      });
     //    }.bind(this),
     //    error: function(xhr, status, err) {
     //      console.log(err);
     //      //console.log(xhr.responseText);
     //      console.log(this);
     //      console.log(xhr);
     //    }
     //  });

  }

  handleEdit() {
    console.log("edit");
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open:false});
  }

  handleSubmit(e) {
    this.setState({
      open: false

    });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];

    // need to link th username to their profile page

    return (
      <Card style={{width: '300px'}}>
      <Dialog
          title="Are you sure?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Removing a choir member cannot be undone.
        </Dialog>
      <ListItem style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/profile/' + this.props.person.id)}>
        <ListItemContent avatar="person" >{this.props.person.first_name} {this.props.person.last_name}</ListItemContent>
        
      </ListItem>
      {/*<IconButton label="Alert" style={{display: 'block', float: 'right'}} tooltip="edit"  onClick={this.handleOpen}>
          <ActionDelete />
      </IconButton>*/}

      
      
      </Card>
    );
  }

}

export default RosterItem;

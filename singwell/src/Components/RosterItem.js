import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, Icon, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import { IconButton, FontIcon, Card, Dialog, FlatButton, RaisedButton } from 'material-ui/';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import '../css/RosterItem.css';



class RosterItem extends Component {

  constructor(props) {
    super(props)

    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  componentWillMount() {
    this.setState ( {
        open: false,
        base64: ''
        //choirGet: {}
      });
    
    console.log(this.props.person.profile)
    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/pictures/?id=" + this.props.person.profile.user + "&picture_type=profile",
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({image: "data:image/jpeg;base64," + data})
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({image: "https://is1-ssl.mzstatic.com/image/thumb/Purple111/v4/ec/13/72/ec137292-f2be-9f55-3be7-bbdffb73f49a/mzl.vrvgkxus.png/600x600bf.jpg"})
          console.log(err);
        }.bind(this)
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

      handleOpen = () => {
        this.setState({open: true});
      };


      handleClose = () => {
        this.setState({open: false});
      };


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

      function formatPhoneNumber(s) {
        var s2 = (""+s).replace(/\D/g, '');
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
      }
{/* */}
    return (


      
      <li className="mn-pymk-list__card display-flex flex-column" onClick={() => this.props.history.push('/profile/' + this.props.person.id)} style={{cursor: 'pointer'}}>
          <div className="pymk-card">

  
   
              <a className="pymk-card__imageember-view"><img className="lazy-image EntityPhoto-circle-7 loaded" src={this.state.image}/></a>

              <div className="pymk-card__details text-align-center">
                  <a className="text-align-center">    
                      <span className="pymk-card__name pymk-card__name--card-layout">
                        {this.props.person.first_name} {this.props.person.last_name}
                      </span>
                      <span className="pymk-card__occupation pymk-card__occupation--card-layout">
                        {this.props.person.email}
                      </span>
                      <span className="pymk-card__occupation pymk-card__occupation--card-layout" style={{marginTop: '10pt'}}>
                        {formatPhoneNumber(this.props.person.profile.phone_number)}
                      </span>
                  </a>
              </div>
           </div>
      </li>



    );
  }

}

export default RosterItem;
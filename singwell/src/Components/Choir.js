import React, { Component } from 'react';
import $ from 'jquery';
import { List, ListItem, ListItemContent, Tooltip, Layout, Header, HeaderRow, FABButton,
 Icon, HeaderTabs, Tab, Content } from  'react-mdl';
import { getColorClass, getTextColorClass } from '../css/palette';
import classNames from 'classnames';

import 'react-day-picker/lib/style.css';
import { IconButton, FontIcon, Dialog, FlatButton, RaisedButton, SelectField, MenuItem, DropDownMenu } from 'material-ui/';
import { Grid } from 'material-ui/';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import '../css/Choir.css'


import RosterItem from './RosterItem';
import EventItem from './EventItem';

import moment from 'moment'


class Choir extends Component {

  constructor(props) {
      super(props);

      let displayOrgMembers = [];
      let newMemberObj = {};
      let currentRoster = [];
      let newMember = '';

      this.state = {
          activeHeaderTab: 0,
          newMemberObj,
          currentRoster,
          displayOrgMembers,
          newMember
      };

      this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);

      this.handleOpen = this.handleOpen.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleMemberChange = this.handleMemberChange.bind(this);
  }

  handleOpen() {
      this.setState({
        open: true
      })
  }

  handleCancel() {
      this.setState({
        open: false
      })
  }


  handleMemberChange(event, value) {
    //value is the index in displayOrgMembers array
    console.log(value);
    let member = this.state.displayOrgMembers[value];
    console.log(member);
    this.setState({
        newMember: +value,
        newMemberObj: member
    })
    //console.log(this.state.newMemberObj);
  }

  curateList() {
      let orgMembers = this.state.orgMembers //members of current organization
      let choristers = this.state.choirGet.choristers;
      //let users = this.state.userGet; //members of current choir (with profile objects)

      //list of organization members WITHOUT those already in current choir
      let members = orgMembers.filter(val => !choristers.includes(val));
      console.log(members); //members we need to display 

      let addableUsers = [];
     
      for(var i=0; i < members.length; i++){
        for(var j=0; j<this.state.userGet.length; j++){
          if(members[i] === this.state.userGet[j].id)
            addableUsers.push(this.state.userGet[j]);
        }
      }

      console.log(addableUsers);
      this.setState({
        displayOrgMembers: addableUsers
        //currentRoster: roster
      });

      //console.log(this.state.displayOrgMembers);
  }

  //handleChange = (event, index, values) => this.setState({values});

  userItems(values) {
    //need to map each user (aka the user id) in displayOrgMembers to a menu item 
    //the key should be the 
    console.log(this.state.displayOrgMembers);
    return this.state.displayOrgMembers.map((user) => (
      <MenuItem
        key={user.id}
        insetChildren={true}
        checked={values && values.indexOf(user) > -1}
        value={this.state.displayOrgMembers.indexOf(user)} //index in displayOrgMembers of current user 
        //value={user.id}
        primaryText={user.first_name + " " + user.last_name} //index in 
      />

    ))
  }

  componentWillMount() {
    this.setState ( {
        choirGet:{},
        rosterGet:[],
        userGet: {},
        orgMembers: {},
        weekday: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        open: false,
        choirEventsGet: []
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({
            choirGet: data
          }, function() {
            console.log(this.state)
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID + "/events/",
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({choirEventsGet: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID + "/roster/",
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({
            rosterGet: data,
          }, function() {
            console.log(this.state)
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/",
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({
            userGet: data,
          }, function() {
            this.curateList();
            console.log(this.state);;
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });    

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({orgMembers: data.members}, function() {
            this.curateList();
            console.log(this.state);
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });  


    }

    handleSubmit(e) {
      console.log(this.state.newMemberObj); 
      // this.setState({
      //   open: false,
      //   newRosterItem: this.state.newMemberObj
        
      // }, function () {
      //    $.ajax({
      //       type: "POST",
      //       url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID + "/roster/",
      //       dataType: 'json',
      //       //headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
      //       data: this.state.newRosterItem,
      //       success: function(data) {
      //         this.setState(
      //           {
      //             rosterPost: data,
      //           })
      //       }.bind(this),
      //       error: function(xhr, status, err) {
      //         console.log(err);
      //         console.log(xhr.responseText);
      //         console.log(this);
      //         console.log(xhr);
      //       }.bind(this)
      //   })

      // }
      // )
      
      // let index=this.state.newMember
      // let newMemberObject = this.state.newMemberList[index]
      // let newUserID = this.state.newMemberList[index].id
      // let newUsersCurrentChoirs = this.state.newMemberList[index].choirs;
      // newUsersCurrentChoirs.push(+this.props.match.params.choirID);
      // let newChoristers = this.state.choirGet.choristers
      //newChoristers.push(newUserID);
      this.setState({
          open: false,
          // newChoirMember: {
          //     //patching to user object 
          //     choirs: newUsersCurrentChoirs
          // },
          // newChoir: {
          //     //patching to choir object 
          //     choristers: newChoristers
          // },
          newRosterItem: {
            user_id: this.state.newMemberObj.id,
            email: this.state.newMemberObj.email,
            first_name: this.state.newMemberObj.first_name,
            last_name:this.state.newMemberObj.last_name,
            admin_of_organizations: this.state.newMemberObj.admin_of_organizations,
            owned_organizations: this.state.newMemberObj.owned_organizations,
            choirs: this.state.newMemberObj.choirs,
            member_of_organizations: this.state.newMemberObj.member_of_organizations,
            profile:{
              user: this.state.newMemberObj.profile.user,
              phone_number: this.state.newMemberObj.profile.phone_number,
              address: this.state.newMemberObj.profile.address,
              bio: this.state.newMemberObj.profile.bio,
              city: this.state.newMemberObj.profile.city,
              zip_code: this.state.newMemberObj.profile.zip_code,
              state: this.state.newMemberObj.profile.state,
              date_of_birth: this.state.newMemberObj.profile.date_of_birth,
              age: this.state.newMemberObj.profile.age,
              profile_picture_link: this.state.newMemberObj.profile.profile_picture_link
            }}
        }, function() {
          //   console.log(this.state.newChoirMember);
          //   $.ajax({
          //       type: "PATCH",
          //       url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/" + newUserID + "/",         
          //       dataType: "json",
          //       //headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
          //       data: this.state.newChoirMember,
          //       success: function(data) {
          //         this.setState(
          //           {
          //             memberPatch: data
          //           }, function(){
          //             console.log(this.state);
          //             console.log(this.state.newChoir);
          //           })
          //       }.bind(this),
          //       error:function(xhr, status, err) {
          //         console.log(err);
          //         console.log(xhr.responseText);
          //         console.log(this);
          //         console.log(xhr);
          //       }.bind(this)
          // })

          //   $.ajax({
          //       type: "PATCH",
          //       url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID + "/",         
          //       dataType: "json",
          //       //headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
          //       data: this.state.newChoir,
          //       success: function(data) {
          //         this.setState(
          //           {
          //             choirPatch: data
          //           }, function(){
          //             console.log(this.state);
          //             console.log(this.state.choirGet);
          //             console.log(this.state.newChoir);
          //           })
          //       }.bind(this),
          //       error:function(xhr, status, err) {
          //         console.log(err);
          //         console.log(xhr.responseText);
          //         console.log(this);
          //         console.log(xhr);
          //       }.bind(this)
          //   })

            $.ajax({
                type: "POST",
                url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID + "/roster/",
                dataType: 'json',
                //headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                data: this.state.newRosterItem,
                success: function(data) {
                  this.setState(
                    {
                      rosterPost: data,
                    })
                }.bind(this),
                error: function(xhr, status, err) {
                  console.log(err);
                  console.log(xhr.responseText);
                  console.log(this);
                  console.log(xhr);
                }.bind(this)
            })

        })
        console.log(this.state.rosterPost)
        e.preventDefault();
  }


    onChangeHeaderTab(tabId) {
        this.setState({
            activeHeaderTab: tabId
        });
    }


    renderTabOverview() {
      let eventItems = [];
        this.state.choirEventsGet = this.state.choirEventsGet.sort(function(a, b) {
            a["datetime"] = a["date"] + " " + a["time"]
            b["datetime"] = b["date"] + " " + b["time"]

            return (+moment.utc(a["datetime"])) - (+moment.utc(b["datetime"]))
        })

        this.state.choirEventsGet.map( event => {
            if(moment(event["date"] + " " + event["time"]).isAfter(Date.now())) { 
                eventItems.push(event)
            } 
        })

        eventItems = eventItems.reverse()

        eventItems = eventItems.map(event => {
            return (
                <EventItem key= {event.id} event={event} orgID={this.props.match.params.orgID} history={this.props.history}/>
            );
        });

      const { weekday } = this.state
        return (
          <div>
            {/* <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                <Icon name="keyboard_arrow_left" />
            </FABButton> */}
            <List className="title__padding">
              <ListItem>
                <ListItemContent icon="today"><b>Meeting Day:</b> {this.state.weekday[this.state.choirGet.meeting_day - 1]}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="timer"><b>Rehersal Start:</b> {moment(this.state.choirGet.meeting_day_start_hour, "H:m:s").format('LT')}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="timer_off"><b>Rehersal End:</b> {moment(this.state.choirGet.meeting_day_end_hour, "H:m:s").format('LT')}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="person"><b>Director:</b> {this.state.choirGet.director_name}</ListItemContent>
              </ListItem>
              <Tooltip label="Edit Choir" large>
                  <ListItem>
                    <ListItemContent style={{cursor: "pointer"}} icon="edit" onClick={() => this.props.history.push('/organizations/'+ this.props.match.params.orgID + '/choirs/' + this.props.match.params.choirID + '/edit/')}></ListItemContent>
                  </ListItem>
              </Tooltip>
            </List>
            <h4 className="title__padding">
                    Upcoming Events:
            </h4>
            {/*<Grid component="section" className="section--center" shadow={0} noSpacing>
                    {eventItems.slice(0,3)}
            </Grid>*/}
          </div>
        );
    }

    renderRoster() {

      let rosterItems;
        rosterItems = this.state.rosterGet.map(person => {
            return (
                <RosterItem key= {person.id} person={person} history={this.props.history}/>
            );
        });

      const value = this.state;

      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleCancel}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          onClick={this.handleSubmit}
        />,
      ];

        return (
          <div>
            {/* <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                <Icon name="keyboard_arrow_left" />
            </FABButton> */}
            <div>
              <RaisedButton label="Add Member" onClick={this.handleOpen} style={{margin: "10pt 0pt 10pt 75pt"}}/>
              <Dialog
                title={this.state.choirGet.name} 
                actions={actions}
                modal={true}
                open={this.state.open}
              >
              <SelectField
                  floatingLabelText="Select Member to Add..."
                  onChange={this.handleMemberChange}
                  value={this.state.newMember}
              >
              {this.userItems(this.values)}
              </SelectField>
              </Dialog>
            </div>

            <ul className="title__padding mn-pymk-list__cards">
              { rosterItems }
            </ul>
            </div>
        );
    }

    



    renderActiveTabContent() {
        switch (this.state.activeHeaderTab) {
            case 0: return this.renderTabOverview();
            case 1: return this.renderRoster();
            default: return <div>Nothing to see here :-)</div>;
        }
    }





  render() {
    
    
    return (

      <div className={classNames('mdl-demo', 'mdl-base')}>
                    <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
                        <Header className={getColorClass('primary')} title="Material Design Lite" scroll>
                            <HeaderRow className="mdl-layout--large-screen-only" />
                            <HeaderRow className="mdl-layout--large-screen-only title__padding">
                                <h3>{this.state.choirGet.name}</h3>
                            </HeaderRow>
                            <FABButton className="back-button"  colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                                <Icon name="keyboard_arrow_left" />
                            </FABButton>
                            <HeaderTabs className={getTextColorClass('primary-dark'), 'title__padding'} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
                                <Tab>Overview</Tab>
                                <Tab>Roster</Tab>
                            </HeaderTabs>
                        </Header>
                        <Content component="main">
                            <div className="react-mdl-layout__tab-panel">
                                {this.renderActiveTabContent()}
                            </div>
                        </Content>
                  </Layout>
                    
      </div>
      );
    }
}

export default Choir;

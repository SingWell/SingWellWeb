import React, { Component } from 'react';
import $ from 'jquery';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText,
    Menu, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import { getColorClass, getTextColorClass } from '../css/palette';
import classNames from 'classnames';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { IconButton, FontIcon, Dialog, FlatButton, RaisedButton, SelectField, MenuItem, DropDownMenu } from 'material-ui/';
import ImageEdit from 'material-ui/svg-icons/image/edit';


import RosterItem from './RosterItem'

import moment from 'moment'


class Choir extends Component {

  constructor(props) {
      super(props);

      let newMemberList = [];
      let memberOfChoirs = [];
      let newMember = '';

      this.state = {
          activeHeaderTab: 0,
          newMemberList,
          memberOfChoirs,
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
      console.log(this.state.newMemberList[value])
      this.setState({
          newMember: value
      })
      console.log("hello: " + this.state.newMember);
  }

  curateList() {
      let users = this.state.userGet
      let currentOrg = +this.state.choirGet.organization
      for(var u in users){
          for(var v in users[u].member_of_organizations){
              if(currentOrg == users[u].member_of_organizations[v]){
                  let user_in_org = users[u]
                  this.state.newMemberList.push(user_in_org);
              }
          }
      }
      console.log(this.state);
  }

  userItems(values) {
    return this.state.newMemberList.map((user) => (
      <MenuItem
        key={user.id}
        insetChildren={true}
        checked={values && values.indexOf(user) > -1}
        value={this.state.newMemberList.indexOf(user)}
        primaryText={user.first_name + " " + user.last_name}
      />
    ));
  }

  componentWillMount() {
    this.setState ( {
        choirGet:{},
        rosterGet:[],
        userGet: {},
        weekday: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        open: false
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({choirGet: data}, function() {
            console.log(this.state)
          });
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
            memberOfChoirs: data.choirs,

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
          this.setState({userGet: data}, function() {
            this.curateList();
            console.log(this.state);;
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });    


    }

    handleSubmit(e) {
      let index=this.state.newMember
      let newMemberObject = this.state.newMemberList[index]
      let newUserID = this.state.newMemberList[index].id
      let newUsersCurrentChoirs = this.state.newMemberList[index].choirs;
      newUsersCurrentChoirs.push(+this.props.match.params.choirID);
      let newChoristers = this.state.choirGet.choristers
      newChoristers.push(newUserID);
      this.setState({
          open: false,
          newChoirMember: {
              //patching to user object 
              choirs: newUsersCurrentChoirs
          },
          newChoir: {
              //patching to choir object 
              choristers: newChoristers
          },
          newRosterItem: {
            user_id: +newUserID,
            email: this.state.newMemberList[index].email,
            first_name: this.state.newMemberList[index].first_name,
            last_name:this.state.newMemberList[index].last_name,
            admin_of_organizations: this.state.newMemberList[index].admin_of_organizations,
            owned_organizations: this.state.newMemberList[index].owned_organizations,
            choirs: this.state.newMemberList[index].choirs,
            member_of_organizations: this.state.newMemberList[index].member_of_organizations,
            profile:{
              user: this.state.newMemberList[index].profile.user,
              phone_number: this.state.newMemberList[index].profile.phone_number,
              address: this.state.newMemberList[index].profile.address,
              bio: this.state.newMemberList[index].profile.bio,
              city: this.state.newMemberList[index].profile.city,
              zip_code: this.state.newMemberList[index].profile.zip_code,
              state: this.state.newMemberList[index].profile.state,
              date_of_birth: this.state.newMemberList[index].profile.date_of_birth,
              age: this.state.newMemberList[index].profile.age,
              profile_picture_link: this.state.newMemberList[index].profile.profile_picture_link
            }}
        }, function() {
            console.log(this.state.newChoirMember);
            $.ajax({
                type: "PATCH",
                url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/" + newUserID + "/",         
                dataType: "json",
                //headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                data: this.state.newChoirMember,
                success: function(data) {
                  this.setState(
                    {
                      memberPatch: data
                    }, function(){
                      console.log(this.state);
                      console.log(this.state.newChoir);
                    })
                }.bind(this),
                error:function(xhr, status, err) {
                  console.log(err);
                  console.log(xhr.responseText);
                  console.log(this);
                  console.log(xhr);
                }.bind(this)
          })

            $.ajax({
                type: "PATCH",
                url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID + "/",         
                dataType: "json",
                //headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                data: this.state.newChoir,
                success: function(data) {
                  this.setState(
                    {
                      choirPatch: data
                    }, function(){
                      console.log(this.state);
                      console.log(this.state.choirGet);
                      console.log(this.state.newChoir);
                    })
                }.bind(this),
                error:function(xhr, status, err) {
                  console.log(err);
                  console.log(xhr.responseText);
                  console.log(this);
                  console.log(xhr);
                }.bind(this)
            })

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

        e.preventDefault();
  }


    onChangeHeaderTab(tabId) {
        this.setState({
            activeHeaderTab: tabId
        });
    }


    renderTabOverview() {
      const { weekday } = this.state
        return (
          <div>
            <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                <Icon name="keyboard_arrow_left" />
            </FABButton>
            <List>
              <ListItem>
                <ListItemContent icon="today">{this.state.weekday[this.state.choirGet.meeting_day - 1]}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="timer">{moment(this.state.choirGet.meeting_day_start_hour, "H:m:s").format('LT')}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="timer_off">{moment(this.state.choirGet.meeting_day_end_hour, "H:m:s").format('LT')}</ListItemContent>
              </ListItem>
              <IconButton style={{display: 'inline-block'}} tooltip="edit" tooltipPosition="top-center" onClick={() => this.props.history.push('/choirs/' +this.props.match.params.choirID + '/edit/')}>
                  <ImageEdit />
              </IconButton>
            </List>
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

      const values = this.state;

      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleCancel}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          //disabled={true}
          onClick={this.handleSubmit}
        />,
      ];

        return (
          <div>
            <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                <Icon name="keyboard_arrow_left" />
            </FABButton>
            <div>
              <RaisedButton label="Add Member" onClick={this.handleOpen} />
              <Dialog
                title="Add Member to Choir"
                actions={actions}
                modal={true}
                open={this.state.open}
              >
              <SelectField
                  floatingLabelText="Select Name..."
                  onChange={this.handleMemberChange}
                  value={this.state.newMember}
              >
              {this.userItems(this.values)}
              </SelectField>
              </Dialog>
            </div>

            <List>
              { rosterItems }
            </List>
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
                            <HeaderRow className="mdl-layout--large-screen-only">
                                <h3>{this.state.choirGet.name}</h3>
                            </HeaderRow>
                            <HeaderRow className="mdl-layout--large-screen-only" />
                            <HeaderTabs className={getTextColorClass('primary-dark')} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
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

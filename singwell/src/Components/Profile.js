import React, { Component } from 'react';
import $ from 'jquery';
import CreateProfile from './CreateProfile';
import MuiThemeProvider from 'material-ui/styles';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import Card from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, Icon, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions, Tooltip,
    Menu, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import { getColorClass, getTextColorClass } from '../css/palette';
import classNames from 'classnames';

import TextField from 'material-ui/TextField';
import ChoirItem from './ChoirItem';

import { IconButton, FontIcon } from 'material-ui/';
import ImageEdit from 'material-ui/svg-icons/image/edit';


import ReactDOM from 'react-dom';


import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';

import RaisedButton from 'material-ui/RaisedButton';



class Profile extends Component {

  constructor(props) {
        super(props);

        this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);

        this.state = {
            activeHeaderTab: 0,
            choirItems: [],
            choirGet: [],
            userGet:{},
            profile: {},
            choirsFlag: false,
            organizations: [],

            user: '',
            phone_number: '',
            address: '',
            bio: '',
            city: '',
            state: '',
            zip: '',
            date_of_birth: '',
            age: '',

            value: 1,
        };

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit() {
      if(this.state.userGet.profile == null)
        this.props.history.push('/profile/' + this.props.match.params.userID + '/create/')
      else
        this.props.history.push('/profile/' + this.props.match.params.userID + '/edit/')

    }

	componentWillMount() {
		this.setState ( {
        userGet:{},
    });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/" + this.props.match.params.userID ,
        dataType: 'json',
        cache: false, 
        //headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({userGet: data});
          //console.log(this.state.userGet.profile.bio)
          this.setState({profile: data.profile})
          this.setState({organizations: data.member_of_organizations})
          console.log(this.state.organizations)
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/?user=" + this.props.match.params.userID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({choirGet: data});
          console.log(this.state)
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

        
    }

    onChangeHeaderTab(tabId) {
        this.setState({
            activeHeaderTab: tabId,
        });
    }

    
    renderTabOverview() {            
        
        let choirItems = [];
        choirItems = this.state.choirGet.map(choir => {
            return (
                <ChoirItem key= {choir.id} choir={choir} orgID={this.props.match.params.orgID} history={this.props.history}/>
            );
        });

        return (
          <div >
            {/* <FABButton style={{margin: '10px'}} colored ripple onClick={() => this.props.history.goBack()}>
                <Icon name="keyboard_arrow_left" />
            </FABButton> */}
            <List style={{paddingLeft: '90px'}}>
              <ListItem>
                <ListItemContent icon="account_circle">{this.state.profile && this.state.profile.bio}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="email">{this.state.userGet.email}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="home">{this.state.profile.address}, {this.state.profile.city}, {this.state.profile.state} {this.state.profile.zip_code}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="cake">{this.state.profile.date_of_birth}</ListItemContent>
              </ListItem>
              <Tooltip label="Edit Profile" large >
                  <ListItem>
                    <ListItemContent style={{cursor: "pointer"}} icon="edit" onClick={() => this.props.history.push('/profile/' + this.props.match.params.userID + '/edit/')}></ListItemContent>
                  </ListItem>
              </Tooltip>
            </List>
            
            <h5 style= {{marginLeft: "110px"}}>
              Choirs:
            </h5>
            <Grid component="section" className="section--center" shadow={0} noSpacing>  
                 {choirItems} 
                
            </Grid> 

          </div>
        );
    }

    renderActiveTabContent() {
        switch (this.state.activeHeaderTab) {
            case 0: return this.renderTabOverview();
            default: return <div>Nothing to see here :-)</div>;
        }
    }

    handleChange = (value) => {

      this.props.history.push('/organizations/' + value)
      // this.setState({value})
    };

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = (value) => {
      console.log(value)
      this.setState({open: false}); 
      this.props.history.push('/organizations/' + value)
    }

    render() {

      let orgItems = this.state.organizations.map((org) => (
        <MenuItem 
          key={org.id}
          value={org.id} 
          onClick={() => this.handleChange(org.id)}>
          {org.name}
        </MenuItem>
      ));
    
    return (
      <div>
      
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          {orgItems}
        </Drawer>
      <div className={classNames('mdl-demo', 'mdl-base')}>

                    <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
                        <Header className={getColorClass('primary')} title="Material Design Lite" scroll>

                            <FABButton style={{position: 'absolute', margin: '13.33px'}}  colored ripple onClick={this.handleToggle}>
                                <Icon name="menu" />
                            </FABButton>
                            <HeaderRow className="mdl-layout--large-screen-only" />
                            <HeaderRow className="mdl-layout--large-screen-only title__padding"  >
                                <h3>{this.state.userGet.first_name} {this.state.userGet.last_name}</h3>
                                
                            </HeaderRow>  
                            <FABButton className="back-button"  colored ripple onClick={() => this.props.history.goBack()}>
                                <Icon name="keyboard_arrow_left" />
                            </FABButton>
                            <HeaderTabs  className={getTextColorClass('primary-dark'), 'title__padding'} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
                                <Tab>Overview</Tab>
                            </HeaderTabs>
                        </Header>
                        <Content component="main">
                            <div className="react-mdl-layout__tab-panel">
                                {this.renderActiveTabContent()}
                            </div>
                            
                        </Content>

                  </Layout>
                    
      </div>
      </div>
      );
    }


}

export default Profile
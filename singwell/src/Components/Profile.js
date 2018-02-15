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
    Button, FABButton, IconButton, Icon, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import { getColorClass, getTextColorClass } from '../css/palette';
import classNames from 'classnames';

import TextField from 'material-ui/TextField';
import ChoirItem from './ChoirItem';




class Profile extends Component {

	constructor(props) {
        super(props);

        this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);
        this.getChoirs = this.getChoirs.bind(this);

        this.state = {
            activeHeaderTab: 0,
            choirItems: [],
            choirGet: {}
        };
    }

	componentWillMount() {
		this.setState ( {
        userGet:{},

      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/" + this.props.match.params.userID + "/",
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({userGet: data});
          this.getChoirs();
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

    getChoirs() {
        // let choirItems;
        if(this.state.UserGet !== "undefined") {
            this.state.choirItems = this.state.userGet.choirs.map(choir => {
            console.log(choir)
            $.ajax({
              type: "GET",
              url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + choir + "/",
              dataType: 'json',
              cache: false, 
              headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
              success: function(data) {
                this.setState({choirGet: data});
                this.state.choirItems.push( <ChoirItem key= {this.state.choirGet.id} choir={this.state.choirGet} orgID={this.state.choirGet.organization} history={this.props.history}/> );
                console.log(this.state.choirItems)                    
              }.bind(this),
              error: function(xhr, status, err) {
                console.log(err);
              }
            });
            
        });

        }
        
    }

    renderTabOverview() {
        // console.log(this.state.userGet)
        

            
        

        return (
          <div >
            <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.goBack()}>
                <Icon name="keyboard_arrow_left" />
            </FABButton>
            <List>
              <ListItem>
                <ListItemContent icon="account_circle">{this.state.userGet.username}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="email">{this.state.userGet.email}</ListItemContent>
              </ListItem>
            </List>


            <Grid component="section" className="section--center" shadow={0} noSpacing>  
                {this.state.choirItems.shift()}
              
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

    render() {
    
    
    return (

      <div className={classNames('mdl-demo', 'mdl-base')}>
                    <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
                        <Header className={getColorClass('primary')} title="Material Design Lite" scroll>
                            <HeaderRow className="mdl-layout--large-screen-only" />
                            <HeaderRow className="mdl-layout--large-screen-only">
                                <h3>{this.state.userGet.first_name} {this.state.userGet.last_name}</h3>
                            </HeaderRow>
                            <HeaderRow className="mdl-layout--large-screen-only" />
                            <HeaderTabs className={getTextColorClass('primary-dark')} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
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
      );
    }

    




}

export default Profile
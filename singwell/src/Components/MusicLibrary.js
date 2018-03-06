import React, { Component } from 'react';
import classNames from 'classnames';
import $ from 'jquery';
import '../css/Organizations.css'
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';

import { getColorClass, getTextColorClass } from '../css/palette';
import { Link } from 'react-router-dom';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import moment from 'moment';

import MusicLibraryItem from './MusicLibraryItem'

class MusicLibrary extends Component {

    componentWillMount() {
    this.setState ( {
        orgGet:{},
        musicGet: []
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({orgGet: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/musicRecords/?organization=" + this.props.match.params.orgID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({musicGet: data});
          console.log(this.state.musicGet)
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    }



    constructor(props) {
        super(props);

        this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);

        this.state = {
            activeHeaderTab: 0
        };
    }


    onChangeHeaderTab(tabId) {
        this.setState({
            activeHeaderTab: tabId
        });
    }

    renderTabOverview() {

        let musicLibraryItems;
        musicLibraryItems = this.state.musicGet.map(music => {
            return (
                <MusicLibraryItem key= {music.id} music={music} history={this.props.history}/>
            );
        });

        return (
            <div>
                <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                    <Icon name="keyboard_arrow_left" />
                </FABButton>
                <List>
                  { musicLibraryItems }
                </List>
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
                                <h3>{this.state.orgGet.name}</h3>
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

export default MusicLibrary;

import React, { Component } from 'react';
import $ from 'jquery';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import { getColorClass, getTextColorClass } from '../css/palette';
import classNames from 'classnames';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import MusicResourceItem from './MusicResourceItem';

import RosterItem from './RosterItem'

import moment from 'moment'

import YouTube from 'react-youtube';


class MusicPage extends Component {

  constructor(props) {
        super(props);

        this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);
        this.renderPDF = this.renderPDF.bind(this);

        this.state = {
            activeHeaderTab: 0
        };
    }

  componentWillMount() {
    this.setState ( {
        musicGet:{},
        musicResourceGet: [],
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/musicRecords/" + this.props.match.params.musicID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({musicGet: data});
          this.setState({musicResourceGet: data.music_resources})
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });
    }

    renderPDF(id) {
        $.ajax({
          type: "GET",
          url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/resource/?resource_id=" + id + "&record_id=" + this.props.match.params.musicID,
          dataType: 'json',
          cache: false, 
          headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
          success: function(data) {
            console.log(this.data)
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(err);
          }
        });
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
            <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/musicResource/' + this.props.match.params.musicID)}>
                <Icon name="file_upload" />
            </FABButton>
            <List>
              <ListItem>
                <ListItemContent icon="person">{this.state.musicGet.composer}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="label">{this.state.musicGet.arranger}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="star">{this.state.musicGet.publisher}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="music_note">{this.state.musicGet.instrumentation}</ListItemContent>
              </ListItem>
            </List>
            </div>
        );
    }

    _onReady(event) {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }

    renderMusicResources() {

        let musicResourceItems = [];
        musicResourceItems = this.state.musicResourceGet.map(item => {
            return (
                <MusicResourceItem key={item.resource_id} musicResource={item} musicID={this.props.match.params.musicID} orgID={this.props.match.params.orgID} history={this.props.history} />
            );
        });

        return (
          <div>
            <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                <Icon name="keyboard_arrow_left" />
            </FABButton>
            <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/musicResource/' + this.props.match.params.musicID)}>
                <Icon name="file_upload" />
            </FABButton>
            <div style={{padding: "25px"}}>
              <h4> The Chainsmokers - Sick Boy</h4>
              <div className="video-wrapper">
                <YouTube
                    videoId="eACohWVwTOc"
                    opts={
                      {
                        height: '390',
                        width: '100%',
                        padding: '25px'
                      }
                    }
                    onReady={this._onReady}
                  />
              </div>
              {musicResourceItems}


            </div>
          </div>
        );
    }

    renderActiveTabContent() {
        switch (this.state.activeHeaderTab) {
            case 0: return this.renderTabOverview();
            case 1: return this.renderMusicResources();
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
                                <h3>{this.state.musicGet.title}</h3>
                            </HeaderRow>
                            <HeaderRow className="mdl-layout--large-screen-only" />
                            <HeaderTabs className={getTextColorClass('primary-dark')} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
                                <Tab>Overview</Tab>
                                <Tab>Music Resources</Tab>
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

export default MusicPage;

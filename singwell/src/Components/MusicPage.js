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
import YoutubeItem from './YoutubeItem';

import RosterItem from './RosterItem'

import moment from 'moment'

import YouTube from 'react-youtube';

import EventItem  from './EventItem';


class MusicPage extends Component {

  constructor(props) {
        super(props);

        this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);


        this.state = {
            activeHeaderTab: 0
        };
    }

  componentWillMount() {
      this.setState ( {
          musicGet:{},
          musicResourceGet: [],
          eventsGet: []
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
            this.setState({eventsGet: data.events})
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
        let nextEventItem;
        let nextEvents = [];

        let previousEvents = [];
        let previousEventItem

        this.state.eventsGet = this.state.eventsGet.sort(function(a, b) {
            a["datetime"] = a["date"] + " " + a["time"]
            b["datetime"] = b["date"] + " " + b["time"]
            return (+moment.utc(a["datetime"])) - (+moment.utc(b["datetime"]))
        })

        this.state.eventsGet.map( event => {
            if(moment(event["date"] + " " + event["time"]).isBefore(Date.now())) { 
                previousEvents.push(event)
            } else if(moment(event["date"] + " " + event["time"]).isAfter(Date.now())) {
                nextEvents.push(event)
            }
        })

        previousEvents = previousEvents.reverse()
        nextEvents = nextEvents.reverse()

        previousEventItem = previousEvents.map(event => {
                return (
                    <EventItem key= {event.id} event={event} orgID={this.props.match.params.orgID} history={this.props.history}/>
                );
        });

        nextEventItem = nextEvents.map(event => {
                return (
                    <EventItem key= {event.id} event={event} orgID={this.props.match.params.orgID} history={this.props.history}/>
                );
        });


      const { weekday } = this.state
        return (
          <div>
            <List className="title__padding">
              <ListItem>
                <ListItemContent icon="person"><b>Composer: </b>{this.state.musicGet.composer}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="label"><b>Arranger: </b>{this.state.musicGet.arranger}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="star"><b>Producer: </b>{this.state.musicGet.publisher}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="music_note"><b>Instrumentation: </b>{this.state.musicGet.instrumentation}</ListItemContent>
              </ListItem>
            </List>
            <h4 className="title__padding">
                    Last Used:
            </h4>
            <Grid component="section" className="section--center" shadow={0} noSpacing style={{boxShadow: "none"}}>
                    {previousEventItem[0]}
            </Grid>
            <h4 className="title__padding">
                    Next Use:
            </h4>
            <Grid component="section" className="section--center" shadow={0} noSpacing style={{boxShadow: "none"}}>
                    {nextEventItem[0]}
            </Grid>
          </div>
        );
    }

    _onReady(event) {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }

    renderMusicResources() {

        let musicResourceItems = [];
        let youtubeItems = [];
        let mxlItems= [];
        this.state.musicResourceGet.map(item => {
            if(item.type === "file" && item.extension === "pdf") {
                musicResourceItems.push(
                    <MusicResourceItem key={item.resource_id} musicResource={item} musicID={this.props.match.params.musicID} orgID={this.props.match.params.orgID} history={this.props.history} />
                )
            } else if (item.type === "youtube_link") {
                youtubeItems.push(
                    <YoutubeItem key={item.resource_id} youtubeItem={item} musicID={this.props.match.params.musicID} orgID={this.props.match.params.orgID} history={this.props.history} />
                )
            } else if (item.type ==="file" && item.extension === "mxl") {
                let href = "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/resource/?resource_id=" + item.resource_id + "&record_id=" + this.props.match.params.musicID
                mxlItems.push(
                    <h4><a href={href} download={item.title} target="_blank">{item.title}</a></h4>
                )
            }

        })
        console.log(youtubeItems)
        console.log(musicResourceItems)


        // musicResourceItems = this.state.musicResourceGet.map(item => {
        //     return (
        //         <MusicResourceItem key={item.resource_id} musicResource={item} musicID={this.props.match.params.musicID} orgID={this.props.match.params.orgID} history={this.props.history} />
        //     );
        // });

        return (
          <div>
          
            <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/musicResource/' + this.props.match.params.musicID)}>
                <Icon name="file_upload" />
            </FABButton>
            <div style={{display: "flex", alignItems: 'center', flexDirection: "column"}}>
            
              <div className="video-wrapper">
                {youtubeItems}
              </div>
              {musicResourceItems}

              {mxlItems}


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
                            <HeaderRow className="mdl-layout--large-screen-only title__padding">
                                <h3>{this.state.musicGet.title}</h3>
                            </HeaderRow>
                            <FABButton className="back-button"  colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                                <Icon name="keyboard_arrow_left" />
                            </FABButton>
                            <HeaderTabs className={getTextColorClass('primary-dark'), "title__padding"} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
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

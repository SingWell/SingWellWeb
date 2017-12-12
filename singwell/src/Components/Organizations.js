import React, { Component } from 'react';
import ChoirItem from './ChoirItem';
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






class Organizations extends Component {

  componentWillMount() {
    this.setState ( {
        orgGet:{},
        choirGet:[],
        eventGet: [],
        events: {},
        geocode: {}
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({orgGet: data});
          // geocodeAddress(data.address)
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/choirs/",
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({choirGet: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/events/",
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({eventGet: data});
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


/* geocodeAddress(address) {
        this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

          if (status === google.maps.GeocoderStatus.OK) {
            console.log(results)
            this.map.setCenter(results[0].geometry.location);
            this.marker.setPosition(results[0].geometry.location);

          }

          this.map.setCenter({
            lat: latitude,
            lng: longitude
          });

          this.marker.setPosition({
            lat: latitude,
            lng: longitude
          });

        }.bind(this));
      } */

    onChangeHeaderTab(tabId) {
        this.setState({
            activeHeaderTab: tabId
        });
    }


    renderTabOverview() {
        return (
            <div>
                <List>
                  <ListItem>
                    <ListItemContent icon="home">{this.state.orgGet.address}</ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemContent icon="description">{this.state.orgGet.description}</ListItemContent>
                  </ListItem>
                </List>
            </div>
        );
    }

    renderChoirs() {
        let choirItems;
        choirItems = this.state.choirGet.map(choir => {
            console.log(choir)
            return (
                <ChoirItem key= {choir.id} choir={choir} orgID={this.props.match.params.orgID} history={this.props.history}/>
            );
        });
        return (
                <div>
                    <Grid component="section" className="section--center" shadow={0} noSpacing>
                    <Cell col={12}>
                        <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/choirs/')}>
                            <Icon name="add" />
                        </FABButton>
                    </Cell>
                    
                        {choirItems}
                        
                    </Grid>
                </div>
            );

    }


    renderEvents() {
        const {events} = this.state
        this.state.events = {};
        let eventItems = this.state.eventGet.map(event => {
            console.log(event.id)
            if(typeof(events[moment(event.date).date()]) !== "undefined") {
                events[moment(event.date).date()].push(event.name + "&&&" + event.id)
                // events[moment(event.date).date()].push({"name":event.name, "id":event.id})
               
            } else {
                events[moment(event.date).date()] = [event.name + "&&&" + event.id]
                // events[moment(event.date).date()] = [{"name":event.name, "id":event.id}]
            }
            
        });
        console.log(events)


        function renderDay(day) {
          const date = day.getDate();
          const dateStyle = {
            position: 'absolute',
            color: 'lightgray',
            bottom: 0,
            right: 0,
            fontSize: 20,
          };
          const containerStyle = { 
            margin:'2px',
            border: '1px solid #3a87ad',
            borderRadius: '3px',
            position: 'relative',
            display: 'block',
            cursor: 'pointer'
         };
         const textStyle = {
            fontSize: '0.8em', 
            textAlign: 'left',
            margin: '1.5px',
         }
          const cellStyle = {
            height: 150,
            width: 160,
            position: 'relative',
          };

          return (
            <div style={cellStyle}>
              <div style={dateStyle}>{date}</div>
              {events[date] &&
                events[date].map((name, i) => (
                  <div onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/events/' + name.split("&&&")[1])} key={i} style={containerStyle}>
                    <div style={textStyle}> {name.split("&&&")[0]} </div>
                  </div>
                ))}
            </div>
          );
        }

        return (
            <div>
                    <Grid component="section" className="section--center" shadow={0} noSpacing>
                    <Cell col={12}>
                        <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/events')}>
                            <Icon name="add" />
                        </FABButton>
                    </Cell>
                    
                        <DayPicker
                          canChangeMonth={false}
                          className="Birthdays"
                          renderDay={renderDay.bind(this)}
                        />
                                  
                    </Grid>
                </div>
        );
    }

    renderActiveTabContent() {
        switch (this.state.activeHeaderTab) {
            case 0: return this.renderTabOverview();
            case 1: return this.renderChoirs();
            case 2: return this.renderEvents();
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
                                <Tab>Choirs</Tab>
                                <Tab>Events</Tab>
                            </HeaderTabs>
                        </Header>
                        <Content component="main">
                            <div className="react-mdl-layout__tab-panel">
                                {this.renderActiveTabContent()}
                            </div>
                            {/* <Footer size="mega">
                                <FooterSection type="middle">
                                    <FooterDropDownSection title="Features">
                                        <FooterLinkList>
                                            <a href="#">About</a>
                                            <a href="#">Terms</a>
                                            <a href="#">Partners</a>
                                            <a href="#">Updates</a>
                                        </FooterLinkList>
                                    </FooterDropDownSection>
                                    <FooterDropDownSection title="Details">
                                        <FooterLinkList>
                                            <a href="#">Specs</a>
                                            <a href="#">Tools</a>
                                            <a href="#">Resources</a>
                                        </FooterLinkList>
                                    </FooterDropDownSection>
                                    <FooterDropDownSection title="Technology">
                                        <FooterLinkList>
                                            <a href="#">How it works</a>
                                            <a href="#">Patterns</a>
                                            <a href="#">Usage</a>
                                            <a href="#">Products</a>
                                            <a href="#">Contracts</a>
                                        </FooterLinkList>
                                    </FooterDropDownSection>
                                    <FooterDropDownSection title="FAQ">
                                        <FooterLinkList>
                                            <a href="#">Questions</a>
                                            <a href="#">Answers</a>
                                            <a href="#">Contact Us</a>
                                        </FooterLinkList>
                                    </FooterDropDownSection>
                                </FooterSection>
                                <FooterSection type="bottom" logo="More Information">
                                    <FooterLinkList>
                                        <a href="https://developers.google.com/web/starter-kit/">Web Starter Kit</a>
                                        <a href="#">Help</a>
                                        <a href="#">Privacy & Terms</a>
                                    </FooterLinkList>
                                </FooterSection>
                            </Footer> */}
                        </Content>
                    </Layout>
                    
                </div>

        );
    }
}

export default Organizations;

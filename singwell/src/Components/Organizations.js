import React, { Component } from 'react';
import ChoirItem from './ChoirItem';
import EventItem from './EventItem';
import classNames from 'classnames';
import $ from 'jquery';
import '../css/Organizations.css'
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';

import { getColorClass, getTextColorClass } from '../css/palette';
import { Link } from 'react-router-dom';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import moment from 'moment';

import { IconButton, FontIcon } from 'material-ui/';
import ImageEdit from 'material-ui/svg-icons/image/edit';

// import MapContainer from './MapContainer'

import GoogleMapReact from 'google-map-react';

const google = window.google

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Organizations extends Component {

    static defaultProps = {
        center: {lat: 33.0181518, lng: -96.71720429999999},
        zoom: 12
      };

  componentWillMount() {
    this.setState ( {
        orgGet:{},
        choirGet:[],
        eventGet: [],
        events: {},
        geocode: {},
        center: {}
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({orgGet: data});
          this.geocodeAddress(data.address)
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/?organization=" + this.props.match.params.orgID,
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
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/events/?organization=" + this.props.match.params.orgID,
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

    geocodeAddress(address) {

        this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

              if (status === google.maps.GeocoderStatus.OK) {
                    this.state.center = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
                    console.log(this.state.center)

                    // this.setState({
                    //   foundAddress: results[0].formatted_address,
                    //   isGeocodingError: false
                    // });

              }

        }.bind(this));
    }



    componentDidMount() {
        
        this.geocoder = new google.maps.Geocoder();

        
        
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
        let eventItems;
        eventItems = this.state.eventGet.map(event => {
            console.log(event)
            {/* sort(function (left, right) {
                            return moment.utc(left.timeStamp).diff(moment.utc(right.timeStamp))
                        }) */}
            return (
                <EventItem key= {event.id} event={event} orgID={this.props.match.params.orgID} history={this.props.history}/>
            );
        });

        return (
            <div>
            <div>
                <h4 style = {{marginLeft: '20px'}}>
                    Announcements:
                </h4>
                
                <Grid component="section" className="section--center"  noSpacing>
                    <Cell col={6}>
                        <Card shadow={0} style={{margin: '10px auto', minHeight:"0px"}}>
                            <CardTitle style={{}}>Announcement 1</CardTitle>
                            <CardText>
                                Pig ham prosciutto ground round brisket biltong spare ribs jowl meatloaf rump drumstick salami doner capicola tri-tip.
                            </CardText>
                        </Card>
                    </Cell>
                    <Cell col={6}>
                        <Card shadow={0} style={{margin: '10px auto', minHeight:"0px"}}>
                            <CardTitle style={{}}>Announcement 2</CardTitle>
                            <CardText>
                                Bacon ipsum dolor amet fatback pork belly pork loin ribeye, cupim short ribs jowl frankfurter buffalo leberkas.
                            </CardText>

                        </Card>
                    </Cell>    
                
                </Grid>

                <h4 style = {{marginLeft: '20px'}}>
                    Upcoming Events:
                </h4>
                <Grid component="section" className="section--center" shadow={0} noSpacing>
                        {console.log(eventItems)}
                        {eventItems.slice(0,3)}
                <Cell col={12}>
                    <List>
                      <ListItem>
                        <ListItemContent icon="home">{this.state.orgGet.address}</ListItemContent>
                      </ListItem>
                      <ListItem>
                        <ListItemContent icon="description">{this.state.orgGet.description}</ListItemContent>
                      </ListItem>
                      <IconButton style={{display: 'inline-block'}} tooltip="edit" tooltipPosition="top-center" onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/edit/')}>
                        <ImageEdit />
                      </IconButton>
                    </List>

                        <div className="map" style={{height: "300px"}}>
                        <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyDs9ev97Ko6vAon6w5wxflxhJBdcDhzXT0" }}
                                defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}
                              >
                                <AnyReactComponent
                                  lat={this.state.center.lat}
                                  lng={this.state.center.lng}
                                  text={this.state.orgGet.description}
                                />
                              </GoogleMapReact>
                            {/* <MapContainer initialCenter={{lat: 55, lng: -93}}/> */}
                        </div>
                </Cell>
                </Grid>
                        
            </div>
            <div>
            </div>
            </div>
        );
    }

    renderChoirs() {
        let choirItems;
        choirItems = this.state.choirGet.map(choir => {
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

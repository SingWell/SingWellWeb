import React, { Component } from 'react';
import ChoirItem from './ChoirItem';
import EventItem from './EventItem';
import classNames from 'classnames';
import $ from 'jquery';
import '../css/Organizations.css';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell, Tooltip,
    Button, FABButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';

import { getColorClass, getTextColorClass } from '../css/palette';
import { Link } from 'react-router-dom';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import moment from 'moment';

import { IconButton, FontIcon, SelectField, TextField } from 'material-ui/';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import MusicLibraryItem from './MusicLibraryItem'

// import MapContainer from './MapContainer'

import GoogleMapReact from 'google-map-react';

const google = window.google

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const fromMonth = new Date(currentYear, currentMonth);
const toMonth = new Date(currentYear + 10, 11);

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
        eventsTest: {},
        geocode: {},
        center: {},
        musicGet: {},
        title: '',
        composer: '',
        arranger: '',
        instrumentation: '',
        musicLibraryItems: [],
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
        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleComposerChange = this.handleComposerChange.bind(this);
        this.handleArrangerChange = this.handleArrangerChange.bind(this);
        this.handleInstrumentationChange = this.handleInstrumentationChange.bind(this);

        this.state = {
            activeHeaderTab: 0,
            monthData: currentMonth,
            month: fromMonth,
            year: currentYear
        };
        console.log(this.state.monthData, this.state.year)
    }


    onChangeHeaderTab(tabId) {
        this.setState({
            activeHeaderTab: tabId
        });
    }

    renderTabOverview() {
        let eventItems = [];
        this.state.eventGet = this.state.eventGet.sort(function(a, b) {
            a["datetime"] = a["date"] + " " + a["time"]
            b["datetime"] = b["date"] + " " + b["time"]

            return (+moment.utc(a["datetime"])) - (+moment.utc(b["datetime"]))
        })

        this.state.eventGet.map( event => {
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

        return (
            <div >
                <h4 className="title__padding">
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

                <h4 className="title__padding">
                    Upcoming Events:
                </h4>
                <Grid component="section" className="section--center" shadow={0} noSpacing>
                        {eventItems.slice(0,3)}
                        <Cell col={12}>
                            <List className="title__padding">
                              <ListItem>
                                <ListItemContent icon="home">{this.state.orgGet.address}</ListItemContent>
                              </ListItem>
                              <ListItem>
                                <ListItemContent icon="description">{this.state.orgGet.description}</ListItemContent>
                              </ListItem>
                              <ListItem>
                                <ListItemContent icon="phone">{this.state.orgGet.phone_number}</ListItemContent>
                              </ListItem>
                              <ListItem>
                                <ListItemContent icon="email">{this.state.orgGet.email}</ListItemContent>
                              </ListItem>
                              <ListItem>
                                <ListItemContent icon="link"><a style={{color: "rgb(0, 0, 240)"}} href={this.state.orgGet.website_url}>{this.state.orgGet.website_url}</a></ListItemContent>
                              </ListItem>
                              <Tooltip label="Edit Org" large>
                                  <ListItem>
                                    <ListItemContent style={{cursor: "pointer"}} icon="edit" onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/edit/')}></ListItemContent>
                                  </ListItem>
                              </Tooltip>
                            </List>

                        </Cell>
                </Grid>
                        
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


    handleYearMonthChange(month) {
        console.log(month)
            this.setState({ month });
            this.setState({
                year: moment(month).year(),
                monthData:moment(month).month()
            })
            console.log(this.state.year, this.state.monthData)
          }

    renderEvents() {
        console.log(this.state.monthData)
        const {events} = this.state
        this.state.events = {};
        let eventItems = this.state.eventGet.map(event => {
            // console.log(event.id)
            // console.log(moment(event.date).year())
            // console.log(moment(event.date).month())
            // console.log(moment(event.date).date())
            if(typeof(events[moment(event.date).date()]) !== "undefined") {
                events[moment(event.date).date()].push(event.name + "&&&" + event.id)
               
            } else {
                events[moment(event.date).date()] = [event.name + "&&&" + event.id]
            }
            
        });
        console.log(events)


        const {eventsTest} = this.state
        this.state.eventsTest = {};
        for(let i = 2016; i < 2020; i++) {
            eventsTest[i] = {}
            for(let j = 0; j < 12; j++) {
                eventsTest[i][j] = {}
            }
        }

        // you know that generic comment we all know about the one about dont touch this code because i dont even 
        // know what it does
        // example below:

        this.state.eventGet.map(event => {
            if(typeof(eventsTest[moment(event.date).year()]) === "undefined") {
                eventsTest[moment(event.date).year()] = {}
                if(typeof(eventsTest[moment(event.date).year()][moment(event.date).month()]) === "undefined") {
                    eventsTest[moment(event.date).year()][moment(event.date).month()] = {}
                    if(typeof(eventsTest[moment(event.date).year()][moment(event.date).month()][moment(event.date).date()]) !== "undefined") {
                        eventsTest[moment(event.date).year()][moment(event.date).month()][moment(event.date).date()].push(event.name + "&&&" + event.id)
                       
                    } else {
                        eventsTest[moment(event.date).year()][moment(event.date).month()][moment(event.date).date()] = [event.name + "&&&" + event.id]
                    }
                } 
            } else {
                if(typeof(eventsTest[moment(event.date).year()][moment(event.date).month()]) === "undefined") {
                    eventsTest[moment(event.date).year()][moment(event.date).month()] = {}
                    if(typeof(eventsTest[moment(event.date).year()][moment(event.date).month()][moment(event.date).date()]) !== "undefined") {
                        eventsTest[moment(event.date).year()][moment(event.date).month()][moment(event.date).date()].push(event.name + "&&&" + event.id)
                       
                    } else {
                        eventsTest[moment(event.date).year()][moment(event.date).month()][moment(event.date).date()] = [event.name + "&&&" + event.id]
                    }
                } else {
                    if(typeof(eventsTest[moment(event.date).year()][moment(event.date).month()][moment(event.date).date()]) !== "undefined") {
                        eventsTest[moment(event.date).year()][moment(event.date).month()][moment(event.date).date()].push(event.name + "&&&" + event.id)
                       
                    } else {
                        eventsTest[moment(event.date).year()][moment(event.date).month()][moment(event.date).date()] = [event.name + "&&&" + event.id]
                    }
                }
            }
        });

        console.log(eventsTest)


        function YearMonthForm({ date, localeUtils, onChange }) {
              const months = localeUtils.getMonths();

              const years = [];
              for (let i = fromMonth.getFullYear() - 1; i <= toMonth.getFullYear(); i += 1) {
                years.push(i);
              }

              const handleChange = function handleChange(e) {
                const { year, month } = e.target.form;

                // this.setState({
                //     "year": year.value,
                //     "monthData": month.value
                // })

                // console.log(this.state.month, this.state.year)
                onChange(new Date(year.value, month.value));
              };

              return (
                <form className="`DayPicker`-Caption">
                  <select name="month" onChange={handleChange} value={date.getMonth()}>
                    {months.map((month, i) => (
                      <option key={month} value={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name="year" onChange={handleChange} value={date.getFullYear()}>
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </form>
              );
            }

        

        function renderDay(day) {
          const date = day.getDate();
          const dateStyle = {
            position: 'absolute',
            // color: 'lightgray',
            bottom: 0,
            right: '5px',
            fontSize: 20,
          };
          const containerStyle = { 
            // width: '100%',
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
            width: 150,
            position: 'relative',
            borderStyle: 'solid',
            borderWidth: '1px'
          };

          // console.log(this.state)

          {/* return (
            <div style={cellStyle}>
              <div style={dateStyle}>{date}</div>
              {events[date] &&
                events[date].map((name, i) => (
                  <div onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/events/' + name.split("&&&")[1])} key={i} style={containerStyle}>
                    <div style={textStyle}> {name.split("&&&")[0]} </div>
                  </div>
                ))}
            </div>
          ); */}

          return (
            <div style={cellStyle}>
              <div style={dateStyle}>{date}</div>
              {eventsTest[this.state.year][this.state.month.getMonth()][date] &&
                eventsTest[this.state.year][this.state.month.getMonth()][date].map((name, i) => (
                  <div onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/events/' + name.split("&&&")[1])} key={i} style={containerStyle}>
                    <div style={textStyle}> {name.split("&&&")[0]} </div>
                  </div>
                ))}
            </div>
          );
        }

        return (
            <div className="title__margin">
                    <Grid component="section" className="section--center" noSpacing>
                    <Cell col={12}>
                        <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/events')}>
                            <Icon name="add" />
                        </FABButton>
                    </Cell>
                    <Cell col={12}>
                        <DayPicker
                          canChangeMonth={true}
                          className="Birthdays"
                          renderDay={renderDay.bind(this)}
                          month={this.state.month}
                          fromMonth={fromMonth}
                          toMonth={toMonth}
                          captionElement={({ date, localeUtils }) => (
                            <YearMonthForm
                              date={date}
                              localeUtils={localeUtils}
                              onChange={this.handleYearMonthChange}
                            />
                          )}
                        />    
                    </Cell>   
                    </Grid>
                </div>
        );
    }


    handleTitleChange(event, value) {
        this.setState({
            title: value
        })
        this.filterMusicLibrary()
    }

    handleComposerChange(event, value) {
        this.setState({
            composer: value
        })
        this.filterMusicLibrary()
    }

    handleArrangerChange(event, value) {
        this.setState({
            arranger: value
        })
        this.filterMusicLibrary()
    }

    handleInstrumentationChange(event, value) {
        this.setState({
            instrumentation: value
        })
        this.filterMusicLibrary()
    }

    filterMusicLibrary() {
        const filteredMusicItems = this.state.musicGet.filter((music) =>
            (!this.state.title || music.title && music.title.toLowerCase().includes(this.state.title.toLowerCase())) &&
            (!this.state.composer || music.composer && music.composer.toLowerCase().includes(this.state.composer.toLowerCase())) &&
            (!this.state.arranger || music.arranger && music.arranger.toLowerCase().includes(this.state.arranger.toLowerCase())) &&
            (!this.state.instrumentation || music.instrumentation && music.instrumentation.toLowerCase().includes(this.state.instrumentation.toLowerCase()))
          );
          return filteredMusicItems.map((music) =>
            <MusicLibraryItem key={music.id} music={music} history={this.props.history}/>
          );
    }

    renderMusicLibrary() {

        return (
            <div className="title__padding">
                <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/music')}>
                    <Icon name="add" />
                </FABButton>
                <Grid component="section" className="section--center"  noSpacing>
                    <Cell col={3}>
                        <TextField
                            floatingLabelText="Piece Title..."
                            required={true}
                            onChange={this.handleTitleChange}
                            value={this.state.title}
                        />    
                    </Cell>
                    <Cell col={3}>
                        <TextField
                            floatingLabelText="Composer..."
                            required={true}
                            onChange={this.handleComposerChange}
                            value={this.state.composer}
                        />
                    </Cell>    
                    <Cell col={3}>
                        <TextField
                            floatingLabelText="Arranger..."
                            required={true}
                            onChange={this.handleArrangerChange}
                            value={this.state.arranger}
                        />
                    </Cell>
                    <Cell col={3}>
                        <TextField
                            floatingLabelText="Instrumentation..."
                            required={true}
                            onChange={this.handleInstrumentationChange}
                            value={this.state.instrumentation}
                        />
                    </Cell>  
                
                </Grid>
                
                <ul className="title__padding mn-pymk-list__cards">
                  { this.filterMusicLibrary() }
                </ul>
            </div>
        );

    }

    renderActiveTabContent() {
        switch (this.state.activeHeaderTab) {
            case 0: return this.renderTabOverview();
            case 1: return this.renderChoirs();
            case 2: return this.renderEvents();
            case 3: return this.renderMusicLibrary();
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
                                <h3>{this.state.orgGet.name}</h3>
                            </HeaderRow>
                            <HeaderRow className="mdl-layout--large-screen-only" />
                            <HeaderTabs className={getTextColorClass('primary-dark'), "title__padding"} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
                                <Tab>Overview</Tab>
                                <Tab>Choirs</Tab>
                                <Tab>Events</Tab>
                                <Tab>Music Library</Tab>
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

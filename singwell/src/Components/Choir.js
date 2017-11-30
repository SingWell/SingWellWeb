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




class Choir extends Component {

  constructor(props) {
        super(props);

        this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);

        this.state = {
            activeHeaderTab: 0
        };
    }

  componentWillMount() {
    this.setState ( {
        choirGet:{},
        weekday: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        birthdays: {
          3: ['Mirko', 'Gianni'],
          8: ['Elena'],
          9: ['Irene'],
          12: ['Paolo', 'Giorgia'],
          18: ['Claudia'],
          22: ['Maria', 'Luigi'],
          25: ['Simone'],
          26: ['Marta'],
        }
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/choirs/" + this.props.match.params.choirID,
        dataType: 'json',
        cache: false, 
        success: function(data) {
          this.setState({choirGet: data}, function() {
            console.log(this.state)
          });
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
            <List>
              <ListItem>
                <ListItemContent icon="today">{this.state.weekday[this.state.choirGet.meeting_day - 1]}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="timer">{this.state.choirGet.meeting_day_start_hour}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="timer_off">{this.state.choirGet.meeting_day_end_hour}</ListItemContent>
              </ListItem>
            </List>
            </div>
        );
    }

    renderEvents() {
      const {birthdays} =this.state
        function renderDay(day) {
          const date = day.getDate();
          const dateStyle = {
            position: 'absolute',
            color: 'lightgray',
            bottom: 0,
            right: 0,
            fontSize: 20,
          };
          const birthdayStyle = { fontSize: '0.8em', textAlign: 'left' };
          const cellStyle = {
            height: 50,
            width: 60,
            position: 'relative',
          };
          return (
            <div style={cellStyle}>
              <div style={dateStyle}>{date}</div>
              {birthdays[date] &&
                birthdays[date].map((name, i) => (
                  <div key={i} style={birthdayStyle}>
                    🎁 {name}
                  </div>
                ))}
            </div>
          );
        }

        return (
            <div>
                    <Grid component="section" className="section--center" shadow={0} noSpacing>
                    <Cell col={12}>
                        <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/choirs/' + this.props.match.params.choirID + '/events')}>
                            <Icon name="add" />
                        </FABButton>
                    </Cell>
                    
                        <DayPicker
                          canChangeMonth={true}
                          className="Birthdays"
                          renderDay={renderDay}
                        />
                                  
                    </Grid>
                </div>
        );
    }



    renderActiveTabContent() {
        switch (this.state.activeHeaderTab) {
            case 0: return this.renderTabOverview();
            case 1: return this.renderEvents();
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
                                <Tab>Events</Tab>
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

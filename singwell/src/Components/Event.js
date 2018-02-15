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

import TextField from 'material-ui/TextField';

import AutoComplete from 'material-ui/AutoComplete';

import moment from 'moment'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton';


const musicLibrary = [
  "Lift Up Your Hearts - VOZ 580",
  "Canticle of the Sun - RS2 677",
  "Mass of Renewal",
  "(Mass Part) - SS1 #21",
  "Jesus, the Lord - VOZ 509",
  "Wesley: Lead Me Lord",
  "Bread of Life - VOZ 814",
  "Lord of All Nations - RS2 810",
  "We Are Called - RS2 902"
];




class Event extends Component {

  constructor(props) {
        super(props);

        this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);

        this.state = {
            activeHeaderTab: 0,
            music: [],
            key: "",
            value: "",
            checkboxes: false
        };

        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

     

      


    handleSubmit(e){
            // e.preventDefault();
            console.log(this.state.key, this.state.value)
            var key = this.state.key
            var obj = {}
            obj[key] = this.state.value
            this.state.music.push(obj)
            console.log(this.state)
            
            this._generateRows()
            
        }

  componentWillMount() {
    this.setState ( {
        eventGet:{},
        music: [
          {"Choral Prelude" : "Lift Up Your Hearts - VOZ 580"},
          {"Entrance": "Canticle of the Sun - RS2 677"},
          {"Entrance 2" : "Wesley: Lead Me Lord"},
          // "Mass of Renewal",
          // "(Mass Part) - SS1 #21",
          // "Jesus, the Lord - VOZ 509",
          // "Wesley: Lead Me Lord",
          // "Bread of Life - VOZ 814",
          // "Lord of All Nations - RS2 810",
          // "We Are Called - RS2 902"
        ]

      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/events/" + this.props.match.params.eventID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({eventGet: data}, function() {
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


    _generateRows(){
        return this.state.music.map(el => {
          var arr = []
          Object.keys(el).forEach((key) => {
            arr.push(key)
            arr.push(el[key])
          })
          return <TableRow key={arr[1]}>
                    <TableRowColumn>{arr[0]}</TableRowColumn>
                    <TableRowColumn>{arr[1]}</TableRowColumn>
                </TableRow>
          })
      }

    renderTabOverview() {
        return (
          <div>
            <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                <Icon name="keyboard_arrow_left" />
            </FABButton>
            <List>
              <ListItem>
                <ListItemContent icon="today">{moment(this.state.eventGet.date).format("MMM Do, YYYY") }</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="timer">{moment(this.state.eventGet.time, "H:m:s").format('LT')}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="home">{this.state.eventGet.location}</ListItemContent>
              </ListItem>
            </List>
            </div>
        );
    }


    handleKeyChange = (searchText) => {

      this.setState({key: searchText});
    }

    handleValueChange = (searchText) => {
      this.setState({value: searchText});
    }

    handleSelect  = (chosenRequest, index) => { 
      if(index === -1) {
          this.handleSubmit()
          this.setState( { value: '', key: '' }) 
      }
          
    }

    renderProgram() {


        

        return (
          <div style={{marginLeft: '20px'}}>
            <FABButton style={{margin: '10px', float: "right"}} colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                <Icon name="keyboard_arrow_left" />
            </FABButton>
            <div >
            <br/>
              <Table>
                  <TableHeader adjustForCheckbox={this.state.checkboxes} displaySelectAll={this.state.checkboxes}>
                      {/* <TableRow>
                          <TableHeaderColumn>Key</TableHeaderColumn>
                          <TableHeaderColumn>Value</TableHeaderColumn>
                      </TableRow> */}
                      <TableRow key="input">
                          <TableRowColumn>
                            <AutoComplete
                                floatingLabelText="Key"
                                filter={AutoComplete.caseInsensitiveFilter}
                                dataSource={musicLibrary}
                                onNewRequest={this.handleSelect}
                                onUpdateInput={this.handleKeyChange}
                                searchText={this.state.key}
                                fullWidth={true}
                              />
                          </TableRowColumn>
                          <TableRowColumn>
                              <AutoComplete
                                floatingLabelText="Value"
                                filter={AutoComplete.caseInsensitiveFilter}
                                dataSource={musicLibrary}
                                onNewRequest={this.handleSelect}
                                onUpdateInput={this.handleValueChange}
                                searchText={this.state.value}
                                fullWidth={true}
                              />
                          </TableRowColumn>
                      </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={this.state.checkboxes}>
                      
                      {this._generateRows()}
                  </TableBody>
              </Table> 
            </div>
          </div>
        );

    }

    renderActiveTabContent() {
        switch (this.state.activeHeaderTab) {
            case 0: return this.renderTabOverview();
            case 1: return this.renderProgram();
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
                                <h3>{this.state.eventGet.name}</h3>
                            </HeaderRow>
                            <HeaderRow className="mdl-layout--large-screen-only" />
                            <HeaderTabs className={getTextColorClass('primary-dark')} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
                                <Tab>Overview</Tab>
                                <Tab>Program</Tab>
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

export default Event;

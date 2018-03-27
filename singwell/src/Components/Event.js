import React, { Component } from 'react';
import $ from 'jquery';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions, Tooltip,
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
import ImageEdit from 'material-ui/svg-icons/image/edit';

import { Link } from 'react-router-dom';

import EventTableItem from './EventTableItem';


class Event extends Component {

  constructor(props) {
        super(props);

        this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);

        this.state = {
            activeHeaderTab: 0,
            music: [],
            key: "",
            value: "",
            checkboxes: false,
            musicGet: [],
            musicLibrary: [],
            rows: [],
        };

        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleNoteschange = this.handleNotesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }


    handleSubmit(e){
            this.setState({programItem:{
                "music_record": this.state.musicRecordID,
                "order": this.state.program.length + 1,
                "notes": this.state.notes,
                "field_title": this.state.key
            }}, function() {
                console.log(this.state.programItem)
                $.ajax({
                  type: "POST",
                  url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/events/" + this.props.match.params.eventID + "/program/",
                  dataType: 'json',
                  cache: false, 
                  headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                  data: this.state.programItem,
                  success: function(data) {
                      this.state.program.push(data)
                      this.forceUpdate()
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.log(err);
                  }
                });
                // console.log(this.state.key, this.state.value)
                // var key = this.state.key
                // var obj = {}
                // obj[key] = this.state.value
                // this.state.music.push(obj)
                // console.log(this.state)
                
                


            });
            // e.preventDefault()

            
            
        }

  componentWillMount() {
    this.setState ( {
        eventGet:{},
        eventPost: {},
        program: [],
        keys: [],
        music: [
          {"Choral Prelude" : "Lift Up Your Hearts - VOZ 580"},
          {"Entrance": "Canticle of the Sun - RS2 677"},
          {"Entrance 2" : "Wesley: Lead Me Lord"},
        ]
      });

    $.ajax({
        type: "GET",
        url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/events/" + this.props.match.params.eventID,
        dataType: 'json',
        cache: false, 
        headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
        success: function(data) {
          this.setState({
              eventGet: data,
              program: data.program_music
          }, function() {
              this.state.program.map(programItem => {
                  this.state.keys.push(programItem.field_title)
              })
              this.state.keys = $.unique(this.state.keys)
              console.log(this.state.keys)
              console.log(this.state.eventGet)
              // this.state.rows = this._generateRows();
          })
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
          this.setState({musicGet: data}, function() {
            console.log(this.state.musicGet)
            this.state.musicGet.map(musicPiece => {
              console.log(musicPiece)
              this.state.musicLibrary.push({title: musicPiece.title, id: musicPiece.id})
            });

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
        return this.state.program.map(programItem => {
          return <TableRow key={programItem.id}>
                    <TableRowColumn>{programItem.field_title}</TableRowColumn>
                    <TableRowColumn>{programItem.title}</TableRowColumn>
                    <TableRowColumn>{programItem.notes}</TableRowColumn>
                </TableRow>
          })
      }

    renderTabOverview() {
        return (
          <div className="title__padding">
            <List>
              <ListItem>
                <ListItemContent icon="today"><b>Event Date: </b>{moment(this.state.eventGet.date).format("MMM Do, YYYY") }</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="timer"><b>Event Time: </b>{moment(this.state.eventGet.time, "H:m:s").format('LT')}</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="home"><b>Event Location: </b>{this.state.eventGet.location}</ListItemContent>
              </ListItem>
              <Tooltip label="Edit Event" large>
                  <ListItem>
                    <ListItemContent style={{cursor: "pointer"}} icon="edit" onClick={() => this.props.history.push('/organizations/'+ this.props.match.params.orgID + '/events/' + this.props.match.params.eventID + '/edit/')}></ListItemContent>
                  </ListItem>
              </Tooltip>
            </List>
            
            </div>
        );
    }


    handleKeyChange = (searchText) => {
      this.setState({key: searchText});
    }

    handleValueChange = (searchText) => {
      console.log(searchText)
      this.setState({
        value: searchText,
      });
    }

    handleNotesChange = (searchText) => {
      console.log(searchText)
      this.setState({notes: searchText});
    }

    handleSelect  = (chosenRequest, index) => { 
      console.log(chosenRequest, index)
      this.setState({
        musicRecordID: chosenRequest.id
      })
      if(index === -1) {
          this.handleSubmit()
          this.setState( { value: '', key: '', notes: '' }) 
      }
          
    }

    renderProgram() {

          this.state.rows = this.state.program.map(programItem => {
            return (
                <EventTableItem programItem={programItem} key={programItem.id} orgID={this.props.match.params.orgID}></EventTableItem>
              )
            {/* return <TableRow key={programItem.id}>
                      <TableRowColumn>{programItem.field_title}</TableRowColumn>
                      <TableRowColumn><Link to={'/organizations/' + this.props.match.params.orgID + '/music/' + programItem.music_record}>{programItem.title}</Link></TableRowColumn>
                      <TableRowColumn>{programItem.notes}</TableRowColumn>
                  </TableRow> */}
          })

      
        return (
          <div className="title__padding" style={{paddingRight: '20px'}}>
            <div >
            <br/>
              <Table>
                  <TableHeader adjustForCheckbox={this.state.checkboxes} displaySelectAll={this.state.checkboxes}>
                      <TableRow key="input">
                          <TableRowColumn>
                            <AutoComplete
                                floatingLabelText="Key..."
                                filter={AutoComplete.caseInsensitiveFilter}
                                dataSource={this.state.keys}
                                onNewRequest={this.handleSelect}
                                onUpdateInput={this.handleKeyChange}
                                searchText={this.state.key}
                                fullWidth={true}
                                style={{marginTop: '0'}}
                              />
                          </TableRowColumn>
                          <TableRowColumn>
                              <AutoComplete
                                floatingLabelText="Piece Title..."
                                filter={AutoComplete.caseInsensitiveFilter}
                                dataSource={this.state.musicLibrary}
                                dataSourceConfig={ {text: 'title', value: 'id'} }
                                onNewRequest={this.handleSelect}
                                onUpdateInput={this.handleValueChange}
                                searchText={this.state.value}
                                fullWidth={true}
                                style={{marginTop: '0'}}
                              />
                          </TableRowColumn>
                           <TableRowColumn>
                              <AutoComplete
                                floatingLabelText="Notes..."
                                filter={AutoComplete.caseInsensitiveFilter}
                                dataSource={['']}
                                onNewRequest={this.handleSelect}
                                onUpdateInput={this.handleNotesChange}
                                searchText={this.state.notes}
                                fullWidth={true}
                                style={{marginTop: '0'}}
                              />
                              
                          </TableRowColumn>
                           
                      </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={this.state.checkboxes}>
                      {this.state.rows}
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
                            <HeaderRow className="mdl-layout--large-screen-only title__padding">
                                <h3>{this.state.eventGet.name}</h3>
                            </HeaderRow>
                            <FABButton className="back-button"  colored ripple onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                                <Icon name="keyboard_arrow_left" />
                            </FABButton>
                            <HeaderTabs className={getTextColorClass('primary-dark'), 'title__padding'} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
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

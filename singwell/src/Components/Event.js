import React, {Component} from 'react';
import $ from 'jquery';
import {
    Layout,
    Header,
    HeaderRow,
    HeaderTabs,
    Tab,
    Content,
    FABButton,
    Icon,
    List,
    ListItem,
    ListItemContent,
    Tooltip,
} from 'react-mdl';
import {getColorClass, getTextColorClass} from '../css/palette';
import classNames from 'classnames';
import 'react-day-picker/lib/style.css';
import AutoComplete from 'material-ui/AutoComplete';
import moment from 'moment'
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableFooter,
} from 'material-ui/Table';
import EventTableItem from './EventTableItem';
import '../css/Event.css';


class Event extends Component {


    constructor(props) {
        super(props);

        this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);

        this.state = {
            activeHeaderTab: 0,
            key: "",
            value: "",
            checkboxes: false,
            musicGet: [],
            musicLibrary: [],
            rows: [],
            choirDirectors: []
        };

        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }


    handleSubmit(e) {
        this.setState({
            programItem: {
                "music_record": this.state.musicRecordID,
                "order": this.state.program.length + 1,
                "notes": this.state.notes,
                "field_title": this.state.key
            }
        }, function () {
            $.ajax({
                type: "POST",
                url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/events/" + this.props.match.params.eventID + "/program/",
                dataType: 'json',
                cache: false,
                headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                data: this.state.programItem,
                success: function (data) {
                    this.state.program.push(data);
                    this.forceUpdate()
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(err);
                }
            });


        });


    }

    componentWillMount() {
        this.setState({
            eventGet: {},
            eventPost: {},
            program: [],
            keys: []
        });

        $.ajax({
            type: "GET",
            url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/events/" + this.props.match.params.eventID,
            dataType: 'json',
            cache: false,
            headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
            success: function (data) {
                this.setState({
                    eventGet: data,
                    program: data.program_music
                }, function () {
                    this.state.program.map(programItem => {
                        this.state.keys.push(programItem.field_title)
                    });

                    this.state.keys = $.unique(this.state.keys);

                });
                if (this.state.eventGet.choirs.length > 0) {
                    this.state.eventGet.choirs.map(choir => {
                        $.ajax({
                            type: "GET",
                            url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + choir,
                            dataType: 'json',
                            cache: false,
                            headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                            success: function (data) {
                                let choirDirectors = this.state.choirDirectors;
                                if (choirDirectors.indexOf(data.director_name) == -1) {
                                    choirDirectors.push(data.director_name)
                                }
                                this.setState({choirDirectors: choirDirectors});
                            }.bind(this),
                            error: function (xhr, status, err) {
                                console.log(err);
                            }
                        })
                    })
                }

            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

        $.ajax({
            type: "GET",
            url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/musicRecords/?organization=" + this.props.match.params.orgID,
            dataType: 'json',
            cache: false,
            headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
            success: function (data) {
                this.setState({musicGet: data}, function () {
                    this.state.musicGet.map(musicPiece => {
                        this.state.musicLibrary.push({
                            title: musicPiece.title + " - " + musicPiece.instrumentation,
                            id: musicPiece.id
                        })
                    });
                });
            }.bind(this),
            error: function (xhr, status, err) {
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
        return (
            <div className="title__padding">
                <List>
                    <ListItem>
                        <ListItemContent icon="today"><b>Event
                            Date: </b>{moment(this.state.eventGet.date).format("MMM Do, YYYY")}</ListItemContent>
                    </ListItem>
                    <ListItem>
                        <ListItemContent icon="timer"><b>Event
                            Time: </b>{moment(this.state.eventGet.time, "H:m:s").format('LT')}</ListItemContent>
                    </ListItem>
                    <ListItem>
                        <ListItemContent icon="home"><b>Event Location: </b>{this.state.eventGet.location}
                        </ListItemContent>
                    </ListItem>
                    <ListItem>
                        <ListItemContent icon="person"><b>Director(s): </b>{this.state.choirDirectors.join()}
                        </ListItemContent>
                    </ListItem>
                    <Tooltip label="Edit Event" large>
                        <ListItem>
                            <ListItemContent style={{cursor: "pointer"}} icon="edit" onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID + '/events/' + this.props.match.params.eventID + '/edit/')}></ListItemContent>
                        </ListItem>
                    </Tooltip>
                </List>

            </div>
        );
    }


    handleKeyChange = (searchText) => {
        this.setState({key: searchText});
    };

    handleValueChange = (searchText) => {
        this.setState({
            value: searchText,
        });
    };

    handleNotesChange = (searchText) => {
        this.setState({notes: searchText});
    };

    handleSelect = (chosenRequest, index) => {
        this.setState({
            musicRecordID: chosenRequest.id
        });
        if (index === -1) {
            this.handleSubmit();
            this.setState({value: '', key: '', notes: ''})
        }

    };

    renderProgram() {

        this.state.rows = this.state.program.map((programItem, index) => {
            return (
                <EventTableItem programItem={programItem} key={programItem.id} orgID={this.props.match.params.orgID} index={index}></EventTableItem>
            )
        });

        return (
            <div className="title__padding" id="event" style={{paddingRight: '20px', marginBottom: '250px'}}>
                <div>
                    <br/>
                    <Table>

                        <TableBody displayRowCheckbox={this.state.checkboxes}>
                            {this.state.rows}
                        </TableBody>
                        <TableFooter adjustForCheckbox={this.state.checkboxes} displaySelectAll={this.state.checkboxes}
                                     className="table-footer">
                            <TableRow key="input">
                                <TableRowColumn style={{width: '36pt'}}>

                                </TableRowColumn>
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
                                        menuStyle={{maxHeight: '200px'}}
                                        openOnFocus={true}
                                        anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                                        targetOrigin={{vertical: 'bottom', horizontal: 'left'}}
                                    />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <AutoComplete
                                        floatingLabelText="Piece Title..."
                                        filter={AutoComplete.caseInsensitiveFilter}
                                        dataSource={this.state.musicLibrary}
                                        dataSourceConfig={{text: 'title', value: 'id'}}
                                        onNewRequest={this.handleSelect}
                                        onUpdateInput={this.handleValueChange}
                                        searchText={this.state.value}
                                        fullWidth={true}
                                        style={{marginTop: '0'}}
                                        menuStyle={{maxHeight: '200px'}}
                                        openOnFocus={true}
                                        anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                                        targetOrigin={{vertical: 'bottom', horizontal: 'left'}}
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
                        </TableFooter>
                    </Table>
                </div>
            </div>
        );

    }

    renderActiveTabContent() {
        switch (this.state.activeHeaderTab) {
            case 0:
                return this.renderTabOverview();
            case 1:
                return this.renderProgram();
            default:
                return <div>Nothing to see here :-)</div>;
        }
    }


    render() {


        return (

            <div className={classNames('mdl-demo', 'mdl-base')}>
                <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
                    <Header className={getColorClass('primary')} title="Material Design Lite" scroll>
                        <HeaderRow className="mdl-layout--large-screen-only"/>
                        <HeaderRow className="mdl-layout--large-screen-only title__padding">
                            <h3>{this.state.eventGet.name}</h3>
                        </HeaderRow>
                        <FABButton className="back-button" colored ripple
                                   onClick={() => this.props.history.push('/organizations/' + this.props.match.params.orgID)}>
                            <Icon name="keyboard_arrow_left"/>
                        </FABButton>
                        <HeaderTabs className={getTextColorClass('primary-dark'), 'title__padding'}
                                    activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
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

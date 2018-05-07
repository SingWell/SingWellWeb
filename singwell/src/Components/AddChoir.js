import React, {Component} from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router';
import {
    MenuItem, RaisedButton, FlatButton, SelectField, TextField,
    Card, CardText, CardTitle, TimePicker
} from 'material-ui/';
import {getColorClass, getTextColorClass} from '../css/palette';
import '../css/AddChoir.css';
import 'react-times/css/material/default.css';

class AddChoir extends Component {

    constructor(props) {
        super(props);
        let meetingDay = '';
        let startTime12 = '';
        let endTime12 = '';


        this.state = {
            meetingDay,
            startTime12,
            endTime12
        };

        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleChangeStartTimePicker = this.handleChangeStartTimePicker.bind(this);
        this.handleChangeEndTimePicker = this.handleChangeEndTimePicker.bind(this);
    }

    handleChangeStartTimePicker(event, date) {
        this.setState({startTime12: date});
    };

    handleChangeEndTimePicker(event, date) {
        this.setState({endTime12: date});
    };

    handleNameChange(event, value) {
        this.setState({
            name: value
        });
    }

    handleDayChange(event, value) {
        this.setState({
            meetingDay: value
        });
    }

    dayItems(values) {
        return this.props.days.map((meetingDay) => (
            <MenuItem
                key={meetingDay.name}
                insetChildren={true}
                checked={values && values.indexOf(meetingDay) > -1}
                value={meetingDay.number - 1}
                primaryText={meetingDay.name}
            />
        ));
    }

    componentWillMount() {
        this.setState({
            newChoir: {},
            fireRedirect: false,
            cancelRedirect: false,
            choirID: null,
            buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
            values: {},
        });
    }

    static defaultProps = {
        days: [
            {
                name: "Monday",
                number: 1
            },
            {
                name: "Tuesday",
                number: 2
            },
            {
                name: "Wednesday",
                number: 3
            },
            {
                name: "Thursday",
                number: 4
            },
            {
                name: "Friday",
                number: 5
            },
            {
                name: "Saturday",
                number: 6
            },
            {
                name: "Sunday",
                number: 7
            },
        ],
        customTriggerId: null,
        defaultTime: null,
        focused: false,
        showTimezone: false
    };

    handleCancel() {
        this.setState({
            cancelRedirect: true
        });
    }

    handleSubmit(e) {
        let startTimeString = this.state.startTime12 + " ";
        let endTimeString = this.state.endTime12 + " ";
        let [sweekday, smonth, sday, syear, startTime, sextra] = startTimeString.split(" ");
        let [eweekday, emonth, eday, eyear, endTime, eextra] = endTimeString.split(" ");
        this.setState({
            newChoir: {
                name: this.state.name,
                meeting_day: this.state.meetingDay + 1,
                meeting_day_start_hour: startTime,
                meeting_day_end_hour: endTime,
                organization: this.props.match.params.orgID,
                choristers: [
                    1
                ],

                director: 1
            }
        }, function () {
            $.ajax({
                type: "POST",
                url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/",
                dataType: 'json',
                headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                data: this.state.newChoir,
                success: function (data) {
                    this.setState(
                        {
                            organization: this.props.match.params.orgID,
                            choirPost: data,
                            choirID: data.id,
                            fireRedirect: true
                        }, function () {
                        })
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(err);
                    console.log(xhr.responseText);
                }
            });
        });
        e.preventDefault();
    }

    render() {

        const {from} = this.props.location.state || '/';
        const {fireRedirect} = this.state;
        const {cancelRedirect} = this.state;

        return (
            <div className={"formContainer"}>
                <div className={"form"}>
                    <Card shadow={0}>
                        <CardTitle title="ADD CHOIR" className={"title"}/>
                        <CardText className={"timePickerForm"}>
                            <TextField
                                floatingLabelText="Name..."
                                style={{width: '100%'}}
                                required={true}
                                onChange={this.handleNameChange}
                                value={this.state.name}
                            />

                            <SelectField
                                floatingLabelText="Meeting Day..."
                                value={this.state.meetingDay}
                                style={{width: '100%'}}
                                onChange={this.handleDayChange}
                            >{this.dayItems(this.values)}
                            </SelectField>
                            <br/>
                            <br/>
                            <TimePicker
                                floatingLabelText="Meeting Start Time..."
                                style={{width: '100%'}}
                                format="ampm"
                                value={this.state.time12}
                                onChange={this.handleChangeStartTimePicker}
                            />
                            <br/>
                            <TimePicker
                                floatingLabelText="Meeting End Time..."
                                style={{width: '100%'}}
                                format="ampm"
                                value={this.state.time12}
                                onChange={this.handleChangeEndTimePicker}
                            />
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
                            <FlatButton label="Cancel" onClick={this.handleCancel.bind(this)}/>
                            {fireRedirect && (
                                <Redirect
                                    to={from || '/organizations/' + this.props.match.params.orgID + '/choirs/' + this.state.choirID}/>
                            )}
                            {cancelRedirect && (
                                <Redirect to={from || '/organizations/' + this.props.match.params.orgID}/>
                            )}
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }


}

export default AddChoir;

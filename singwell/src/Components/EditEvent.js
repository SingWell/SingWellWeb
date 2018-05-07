import React, {Component} from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router';
import {getColorClass, getTextColorClass} from '../css/palette';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import 'react-times/css/material/default.css';
import 'react-material-select/lib/css/reactMaterialSelect.css'
import DatePicker from 'material-ui/DatePicker';
import {
    FlatButton, RaisedButton, TextField, MenuItem, SelectField,
    RadioButton, Card, CardText, CardTitle, TimePicker
} from 'material-ui/';


class EditEvent extends Component {

    constructor(props) {
        super(props);
        const {defaultTime, focused, showTimezone, timezone} = props;
        let hour = '';
        let minute = '';
        let date = '';

        let eventName = '';
        let eventDate = '';
        let eventTime = '';
        let eventLoc = '';
        let choirs = [];

        let defaultYear = '';
        let defaultMonth = '';
        let defaultDay = '';

        let defaultHour = '';
        let defaultMinute = '';

        let startTime12 = '';
        let timeString;

        if (!defaultTime) {
            // [hour, minute] = timeHelper.current().split(/:/);
        } else {
            [hour, minute] = defaultTime.split(/:/);
        }

        this.state = {
            hour,
            minute,
            focused,
            timezone,
            showTimezone,
            date,
            eventName,
            eventDate,
            eventTime,
            eventLoc,
            choirs,
            defaultYear,
            defaultMonth,
            defaultDay,
            defaultHour,
            defaultMinute,
            startTime12
        };

        this.onFocusChange = this.onFocusChange.bind(this);
        this.onHourChange = this.onHourChange.bind(this);
        this.onMinuteChange = this.onMinuteChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.handleFocusedChange = this.handleFocusedChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onChoirChange = this.onChoirChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeStartTimePicker = this.handleChangeStartTimePicker.bind(this);

    }

    onHourChange(hour) {
        this.setState({
            hour,
            defaultHour: hour
        });
    }

    onMinuteChange(minute) {
        this.setState({
            minute,
            defaultMinute: minute
        });
    }

    onTimeChange(time) {
        const [hour, minute] = time.split(':');
        this.setState({
            hour,
            minute,
        });
    }

    onFocusChange(focused) {
        this.setState({focused});
    }

    handleFocusedChange() {
        const {focused} = this.state;
        this.setState({focused: !focused});
    }


    onDateChange(event, date) {
        let newDate = moment(date).format("YYYY-MM-DD");
        let [year, month, day] = newDate.split("-");
        this.setState({
            date: newDate,
            defaultYear: +year,
            defaultMonth: +month - 1,
            defaultDay: +day
        });
    }

    onNameChange(event, value) {
        this.setState({
            eventName: value
        })
    }

    onLocationChange(event, value) {
        this.setState({
            eventLoc: value
        })
    }

    onChoirChange(event, index, values) {
        this.setState({
            choirs: values
        });
    }


    handleOpen() {
        this.setState({
            open: true
        });
    };

    handleClose() {
        this.setState({
            open: false
        });
    };

    handleChangeStartTimePicker(event, date) {
        this.setState({startTime12: date});
    };


    parseDate(date) {
        if (date != null) {
            let [year, month, day] = this.state.eventDate.split("-");
            this.setState({
                defaultYear: +year,
                defaultMonth: +month - 1,
                defaultDay: +day,
                date: moment(date).format("YYYY-MM-DD")
            });
        }
    }

    parseTime(time) {
        let dateString = '1970-01-01T' + time;
        let dateObj = new Date(dateString);
        let setTime = Date.parse(dateObj);
        let newwithtime = new Date(setTime); //newwithtime is a dateobject
        this.setState({
            timeString: setTime
        })
    }

    choirItems(values) {
        return this.state.choirGet.map((choir) => (
            <MenuItem
                key={choir.id}
                insetChildren={true}
                checked={values && values.indexOf(choir) > -1}
                value={choir.id}
                primaryText={choir.name}
            />
        ));
    }

    componentWillMount() {
        this.setState({
            newEvent: {},
            eventGet: {},
            submitRedirect: false,
            cancelRedirect: false,
            eventID: null,
            buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
            choirGet: [],
            open: false
        });

        $.ajax({
            type: "GET",
            url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/?organization=" + this.props.match.params.orgID,
            dataType: 'json',
            cache: false,
            headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
            success: function (data) {
                this.setState({
                    choirGet: data,
                    eventChoir: data.name
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
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
                    eventName: data.name,
                    eventDate: data.date,
                    eventTime: data.time,
                    eventLoc: data.location,
                    choirs: data.choirs

                });
                this.parseDate(data.date);
                this.parseTime(data.time);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    handleSubmit(e) {
        let startTimeString = this.state.startTime12 + " ";
        let [sweekday, smonth, sday, syear, startTime, sextra] = startTimeString.split(" ");
        this.setState({
            newEvent: {
                name: this.state.eventName,
                date: this.state.date,
                //time: this.state.hour + ":" + this.state.minute + ":00",
                time: startTime,
                location: this.state.eventLoc,
                choirs: this.state.choirs,
                organization: this.props.match.params.orgID
            }
        }, function () {
            $.ajax({
                type: "PATCH",
                url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/events/" + this.props.match.params.eventID + "/",
                dataType: 'json',
                data: this.state.newEvent,
                success: function (data) {
                    this.setState(
                        {
                            organization: this.props.match.params.orgID,
                            eventPost: data,
                            eventID: data.id,
                            submitRedirect: true
                        });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(err);
                    console.log(xhr.responseText);
                }
            });
        });
        e.preventDefault();
    }

    handleCancel(e) {
        this.setState({
            cancelRedirect: true
        })
    }

    render() {
        const {from} = this.props.location.state || '/';
        const {submitRedirect} = this.state;
        const {cancelRedirect} = this.state;
        const {eventID} = this.state;
        const {buttonClasses} = this.state;
        const {choirs} = this.state;


        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        const radios = [];
        for (let i = 0; i < 30; i++) {
            radios.push(
                <RadioButton
                    key={i}
                    value={`value${i + 1}`}
                    label={`Option ${i + 1}`}
                />
            );
        }

        return (
            <div className={"formContainer"}>
                <div className={"form"}>
                    <Card shadow={0}>
                        <CardTitle title="EDIT EVENT" className={"title"}/>
                        <CardText>
                            <TextField
                                floatingLabelText="Event name..."
                                ref="name"
                                style={{width: '100%'}}
                                value={this.state.eventName}
                                onChange={this.onNameChange}
                            />
                            <DatePicker
                                style={{width: '100%'}}
                                floatingLabelText="Date of Event..."
                                container="inline"
                                value={new Date(this.state.defaultYear, this.state.defaultMonth, this.state.defaultDay)}
                                onChange={this.onDateChange}
                            />
                            <br/>
                            <br/>
                            <TimePicker
                                floatingLabelText="Time of Event..."
                                style={{width: '100%'}}
                                format="ampm"
                                defaultTime={new Date()}
                                value={this.state.time12}
                                onChange={this.handleChangeStartTimePicker}
                                okAuto={true}
                            />
                            <br/>
                            <TextField
                                style={{width: '100%'}}
                                //onChange={() => {}}
                                floatingLabelText="Location..."
                                ref="location"
                                value={this.state.eventLoc}
                                onChange={this.onLocationChange}
                            />
                            <br/>
                            <SelectField
                                floatingLabelText="Add Choirs"
                                value={choirs}
                                style={{width: '100%'}}
                                onChange={this.onChoirChange}
                                multiple={true}
                            >{this.choirItems(this.choirs)}
                            </SelectField>
                            <br/>
                            <br/>
                            <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
                            <FlatButton label="Cancel" onClick={this.handleCancel.bind(this)}/>
                            {submitRedirect && (
                                <Redirect
                                    to={from || '/organizations/' + this.props.match.params.orgID + '/events/' + this.props.match.params.eventID}/>
                            )}
                            {cancelRedirect && (
                                <Redirect
                                    to={from || '/organizations/' + this.props.match.params.orgID + '/events/' + this.props.match.params.eventID}/>
                            )}
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
}

export default EditEvent;

import React, {Component} from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router';
import {
    MenuItem,
    RaisedButton,
    FlatButton,
    SelectField,
    TextField,
    Card,
    CardTitle,
    CardText,
    TimePicker
} from 'material-ui/';
import {getColorClass, getTextColorClass} from '../css/palette';
import '../css/AddChoir.css';
import 'react-times/css/material/default.css';


class EditChoir extends Component {

    constructor(props) {

        super(props);

        const {defaultTime, focusedStart, focusedEnd, showTimezone, timezone} = props;
        let choirName = '';
        let mtgDay = '';
        let startTime = '';
        let endTime = '';
        let startTime12 = '';
        let endTime12 = '';

        this.state = {
            choirName,
            mtgDay,
            startTime,
            endTime,
            startTime12,
            endTime12
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleChangeStartTimePicker = this.handleChangeStartTimePicker.bind(this);
        this.handleChangeEndTimePicker = this.handleChangeEndTimePicker.bind(this);

    }

    handleNameChange(event, value) {
        this.setState({
            choirName: value
        })
    }

    handleDayChange(event, value) {
        this.setState({
            mtgDay: value
        })
    }

    handleChangeStartTimePicker(event, date) {
        this.setState({startTime12: date});
    };

    handleChangeEndTimePicker(event, date) {
        this.setState({endTime12: date});
    };

    parseTime() {
        let [starthour, startminute, startsecond] = this.state.startTime.split(":");
        let [endhour, endminute, endsecond] = this.state.endTime.split(":");
        this.setState({
            defaultStartHour: +starthour,
            defaultStartMinute: +startminute,
            defaultEndHour: +endhour,
            defaultEndMinute: +endminute,
            hourStart: +starthour,
            hourEnd: +endhour,
            minuteStart: +startminute,
            minuteEnd: +endminute
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
            choirGet: {},
            fireRedirect: false,
            cancelRedirect: false,
            choirID: null,
            buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
            delta: {}
        });

    }

    fetchList() {
        $.ajax({
            type: "GET",
            url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID + "/",
            dataType: 'json',
            cache: false,
            headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
            success: function (data) {
                this.setState({
                    choirGet: data,
                    choirName: data.name,
                    mtgDay: data.meeting_day - 1,
                    startTime: data.meeting_day_start_hour,
                    endTime: data.meeting_day_end_hour

                });
                this.parseTime();
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err)
            }
        });
    }

    componentDidMount() {
        this.fetchList()
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

    handleSubmit(e) {
        let startTimeString = this.state.startTime12 + " ";
        let endTimeString = this.state.endTime12 + " ";
        let [sweekday, smonth, sday, syear, startTime, sextra] = startTimeString.split(" ");
        let [eweekday, emonth, eday, eyear, endTime, eextra] = endTimeString.split(" ");
        this.setState({
            newChoir: {
                name: this.state.choirName,
                meeting_day: +this.state.mtgDay + 1,
                meeting_day_start_hour: startTime,
                meeting_day_end_hour: endTime,
                organization: 1,
                choristers: [
                    1
                ],
            },

        }, function () {
            console.log(this.state.newChoir);
            $.ajax({
                type: "PATCH",
                url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/choirs/" + this.props.match.params.choirID + "/",
                dataType: "json",
                headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                data: this.state.newChoir,
                success: function (data) {
                    this.setState(
                        {
                            choirPut: data,
                            choirID: this.props.match.params.choirID,
                            fireRedirect: true
                        });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(err);
                    console.log(xhr.responseText);
                    console.log(this);
                    console.log(xhr);
                }.bind(this)
            })
        });
        e.preventDefault();
    }

    handleCancel() {
        this.setState({
            cancelRedirect: true
        });
    }

    render() {

        const {from} = this.props.location.state || '/';
        const {fireRedirect} = this.state;
        const {cancelRedirect} = this.state;
        const {choirID} = this.state;
        const {buttonClasses} = this.state;
        const {values} = this.state;

        return (
            <div className={"formContainer"}>
                <div className={"form"}>
                    <Card shadow={0} style={{margin: '10px'}}>
                        <CardTitle title="EDIT CHOIR" className={"title"}/>
                        <CardText className={"timePickerForm"}>
                            <TextField
                                floatingLabelText="Name..."
                                ref="name"
                                style={{width: '100%'}}
                                value={this.state.choirName}
                                onChange={this.handleNameChange}
                            />
                            <br/>
                            <br/>
                            <SelectField
                                floatingLabelText="Meeting Day"
                                value={this.state.mtgDay}
                                style={{width: '100%'}}
                                onChange={this.handleDayChange}
                            >{this.dayItems(this.values)}
                            </SelectField>
                            <br/>
                            <TimePicker
                                floatingLabelText="Change Meeting Start Time..."
                                style={{width: '100%', margin: 'auto'}}
                                format="ampm"
                                defaultTime={new Date()}
                                value={this.state.time12}
                                onChange={this.handleChangeStartTimePicker}
                                okAuto={true}
                            />

                            <TimePicker
                                floatingLabelText="Change Meeting End Time..."
                                style={{width: '100%'}}
                                format="ampm"
                                defaultTime={new Date()}
                                value={this.state.time12}
                                onChange={this.handleChangeEndTimePicker}
                                okAuto={true}
                            />
                            <br/>
                            <br/>
                            <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
                            <FlatButton label="Cancel" onClick={this.handleCancel.bind(this)}/>
                            {fireRedirect && (
                                <Redirect
                                    to={from || '/organizations/' + this.props.match.params.orgID + '/choirs/' + this.state.choirID}/>
                            )}
                            {cancelRedirect && (
                                <Redirect
                                    to={from || '/organizations/' + this.props.match.params.orgID + '/choirs/' + this.props.match.params.choirID}/>
                            )}

                        </CardText>
                    </Card>
                </div>
            </div>


        );
    }


}

export default EditChoir;

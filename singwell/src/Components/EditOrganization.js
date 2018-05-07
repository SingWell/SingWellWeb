import React, {Component} from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router';
import {getColorClass, getTextColorClass} from '../css/palette';
import {
    TextField, MenuItem, RaisedButton,
    FlatButton, Card, CardTitle, CardText
} from 'material-ui/';


class EditOrganization extends Component {

    constructor() {
        super();

        let orgName = '';
        let orgAddress = '';
        let orgCity = '';
        let orgState = '';
        let orgZip = '';
        let orgDescription = '';
        let orgPhone = '';
        let orgEmail = '';

        this.state = {
            orgName,
            orgDescription,
            orgAddress,
            orgCity,
            orgState,
            orgZip,
            orgPhone,
            orgEmail
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleZipChange = this.handleZipChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);

    }

    handleNameChange(event, value) {
        this.setState({
            orgName: value
        })
    }

    handleDescriptionChange(event, value) {
        this.setState({
            orgDescription: value
        })
    }

    handleAddressChange(event, value) {
        this.setState({
            orgAddress: value
        })
    }

    handleCityChange(event, value) {
        this.setState({
            orgCity: value
        })
    }

    handleStateChange(event, value) {
        let stateName = this.props.states[value].abbreviation;
        this.setState({
            orgState: stateName
        });
    }

    handleZipChange(event, value) {
        this.setState({
            orgZip: value
        })
    }

    handlePhoneChange(event, value) {
        this.setState({
            orgPhone: value
        })
    }

    handleEmailChange(event, value) {
        this.setState({
            orgEmail: value
        })
    }


    componentWillMount() {
        this.setState({
            newOrganization: {},
            fireRedirect: false,
            orgID: null,
            buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
            cancelRedirect: false
        });
    }

    fetchList() {
        $.ajax({
            type: "GET",
            url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID,
            dataType: 'json',
            cache: false,
            headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
            success: function (data) {
                this.setState({
                    orgName: data.name,
                    orgAddress: data.address,
                    orgDescription: data.description,
                    orgPhone: +data.phone_number,
                    orgEmail: data.email
                });
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
        statesA: ["AB", "BC"],
        states: [
            {
                "name": "Alabama",
                "abbreviation": "AL"
            },
            {
                "name": "Alaska",
                "abbreviation": "AK"
            },
            {
                "name": "American Samoa",
                "abbreviation": "AS"
            },
            {
                "name": "Arizona",
                "abbreviation": "AZ"
            },
            {
                "name": "Arkansas",
                "abbreviation": "AR"
            },
            {
                "name": "California",
                "abbreviation": "CA"
            },
            {
                "name": "Colorado",
                "abbreviation": "CO"
            },
            {
                "name": "Connecticut",
                "abbreviation": "CT"
            },
            {
                "name": "Delaware",
                "abbreviation": "DE"
            },
            {
                "name": "District Of Columbia",
                "abbreviation": "DC"
            },
            {
                "name": "Federated States Of Micronesia",
                "abbreviation": "FM"
            },
            {
                "name": "Florida",
                "abbreviation": "FL"
            },
            {
                "name": "Georgia",
                "abbreviation": "GA"
            },
            {
                "name": "Guam",
                "abbreviation": "GU"
            },
            {
                "name": "Hawaii",
                "abbreviation": "HI"
            },
            {
                "name": "Idaho",
                "abbreviation": "ID"
            },
            {
                "name": "Illinois",
                "abbreviation": "IL"
            },
            {
                "name": "Indiana",
                "abbreviation": "IN"
            },
            {
                "name": "Iowa",
                "abbreviation": "IA"
            },
            {
                "name": "Kansas",
                "abbreviation": "KS"
            },
            {
                "name": "Kentucky",
                "abbreviation": "KY"
            },
            {
                "name": "Louisiana",
                "abbreviation": "LA"
            },
            {
                "name": "Maine",
                "abbreviation": "ME"
            },
            {
                "name": "Marshall Islands",
                "abbreviation": "MH"
            },
            {
                "name": "Maryland",
                "abbreviation": "MD"
            },
            {
                "name": "Massachusetts",
                "abbreviation": "MA"
            },
            {
                "name": "Michigan",
                "abbreviation": "MI"
            },
            {
                "name": "Minnesota",
                "abbreviation": "MN"
            },
            {
                "name": "Mississippi",
                "abbreviation": "MS"
            },
            {
                "name": "Missouri",
                "abbreviation": "MO"
            },
            {
                "name": "Montana",
                "abbreviation": "MT"
            },
            {
                "name": "Nebraska",
                "abbreviation": "NE"
            },
            {
                "name": "Nevada",
                "abbreviation": "NV"
            },
            {
                "name": "New Hampshire",
                "abbreviation": "NH"
            },
            {
                "name": "New Jersey",
                "abbreviation": "NJ"
            },
            {
                "name": "New Mexico",
                "abbreviation": "NM"
            },
            {
                "name": "New York",
                "abbreviation": "NY"
            },
            {
                "name": "North Carolina",
                "abbreviation": "NC"
            },
            {
                "name": "North Dakota",
                "abbreviation": "ND"
            },
            {
                "name": "Northern Mariana Islands",
                "abbreviation": "MP"
            },
            {
                "name": "Ohio",
                "abbreviation": "OH"
            },
            {
                "name": "Oklahoma",
                "abbreviation": "OK"
            },
            {
                "name": "Oregon",
                "abbreviation": "OR"
            },
            {
                "name": "Palau",
                "abbreviation": "PW"
            },
            {
                "name": "Pennsylvania",
                "abbreviation": "PA"
            },
            {
                "name": "Puerto Rico",
                "abbreviation": "PR"
            },
            {
                "name": "Rhode Island",
                "abbreviation": "RI"
            },
            {
                "name": "South Carolina",
                "abbreviation": "SC"
            },
            {
                "name": "South Dakota",
                "abbreviation": "SD"
            },
            {
                "name": "Tennessee",
                "abbreviation": "TN"
            },
            {
                "name": "Texas",
                "abbreviation": "TX"
            },
            {
                "name": "Utah",
                "abbreviation": "UT"
            },
            {
                "name": "Vermont",
                "abbreviation": "VT"
            },
            {
                "name": "Virgin Islands",
                "abbreviation": "VI"
            },
            {
                "name": "Virginia",
                "abbreviation": "VA"
            },
            {
                "name": "Washington",
                "abbreviation": "WA"
            },
            {
                "name": "West Virginia",
                "abbreviation": "WV"
            },
            {
                "name": "Wisconsin",
                "abbreviation": "WI"
            },
            {
                "name": "Wyoming",
                "abbreviation": "WY"
            }
        ]
    };


    handleSubmit(e) {
        this.setState({
            newOrganization: {
                name: this.state.orgName,
                description: this.state.orgDescription,
                address: this.state.orgAddress,
                phone_number: +this.state.orgPhone,
                email: this.state.orgEmail,
                admins: [1]
            }
        }, function () {
            $.ajax({
                type: "PATCH",
                url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/" + this.props.match.params.orgID + "/",
                dataType: 'json',
                //headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                data: this.state.newOrganization,
                success: function (data) {
                    this.setState(
                        {
                            orgPut: data,
                            orgID: this.props.match.params.orgID,
                            fireRedirect: true
                        });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(err);
                    console.log(xhr.responseText);
                }.bind(this)
            })
        });
        e.preventDefault();
    }

    render() {
        const {from} = this.props.location.state || '/';
        const {fireRedirect} = this.state;
        const {cancelRedirect} = this.state;
        const {orgID} = this.state;
        const {buttonClasses} = this.state;
        const {values} = this.state;


        return (
            <div className={"formContainer"}>
                <div className={"form"}>
                    <Card shadow={0} style={{margin: '10px', width: '340px'}}>
                        <CardTitle title="EDIT ORGANIZATION" className={"title"}/>
                        <CardText>
                            <TextField
                                floatingLabelText="Name..."
                                style={{width: '100%'}}
                                value={this.state.orgName}
                                onChange={this.handleNameChange}
                            />
                            <br/>
                            <TextField
                                floatingLabelText="Description..."
                                rows={3}
                                style={{width: '100%'}}
                                value={this.state.orgDescription}
                                onChange={this.handleDescriptionChange}
                            />
                            <br/>
                            <TextField
                                floatingLabelText="Street Address..."
                                style={{width: '100%'}}
                                value={this.state.orgAddress}
                                onChange={this.handleAddressChange}
                            />
                            <br/>
                            <TextField
                                floatingLabelText="Phone Number..."
                                ref="phoneNumber"
                                style={{width: '100%'}}
                                value={this.state.orgPhone}
                                onChange={this.handlePhoneChange}
                            />
                            <br/>
                            <TextField
                                floatingLabelText="Email..."
                                ref="email"
                                style={{width: '100%'}}
                                value={this.state.orgEmail}
                                onChange={this.handleEmailChange}
                            />
                            <br/>
                            <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
                            <FlatButton label="Cancel" onClick={this.handleCancel.bind(this)}/>
                            {(fireRedirect || cancelRedirect) && (
                                <Redirect to={from || '/organizations/' + this.props.match.params.orgID}/>
                            )}
                        </CardText>
                    </Card>
                </div>
            </div>

        );
    }
}

export default EditOrganization;

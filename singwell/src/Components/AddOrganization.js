import React, {Component} from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router';
import {getColorClass, getTextColorClass} from '../css/palette';
import {TextField, SelectField, MenuItem, RaisedButton, FlatButton, Card, CardText, CardTitle} from 'material-ui/';


class AddOrganization extends Component {

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
        let member = [];

        this.state = {
            orgName,
            orgDescription,
            orgAddress,
            orgCity,
            orgState,
            orgZip,
            orgPhone,
            orgEmail,
            member
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

    stateItems(values) {
        return this.props.states.map((state) => (
            <MenuItem
                key={state.abbreviation}
                insetChildren={true}
                checked={values && values.indexOf(state) > -1}
                value={state.abbreviation}
                primaryText={state.abbreviation}
            />
        ));
    }

    componentWillMount() {
        this.setState({
            newOrganization: {},
            fireRedirect: false,
            orgID: null,
            buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`
        });
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

    handleCancel(e) {
        this.setState({
            cancelRedirect: true
        })
    }

    handleSubmit(e) {
        this.setState({
            newOrganization: {
                name: this.state.orgName,
                description: this.state.orgDescription,
                address: this.state.orgAddress + " " + this.state.orgCity + ", " + this.state.orgState + " " + this.state.orgZip,
                phone_number: this.state.orgPhone,
                email: this.state.orgEmail,
                admins: [1],
                members: 1
            }
        }, function () {
            $.ajax({
                type: "POST",
                url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/organizations/",
                dataType: 'json',
                headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                data: this.state.newOrganization,
                success: function (data) {
                    this.setState(
                        {
                            orgPost: data,
                            orgID: data.id,
                            fireRedirect: true
                        });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(err);
                    console.log(xhr.responseText);
                }
            });
        });
        console.log(this.state);
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
            <div className={"formConainer"}>
                <div className={"form"}>
                    <Card shadow={0}>
                        <CardTitle title="ADD ORGANIZATION" className={"title"}/>
                        <CardText>
                            <TextField
                                onChange={this.handleNameChange}
                                floatingLabelText="Name..."
                                ref="name"
                                style={{width: '100%'}}
                            />

                            <TextField
                                onChange={this.handlePhoneChange}
                                floatingLabelText="Phone Number..."
                                ref="phoneNumber"
                                style={{width: '100%'}}
                            />

                            <TextField
                                onChange={this.handleEmailChange}
                                floatingLabelText="Email..."
                                ref="email"
                                style={{width: '100%'}}
                            />
                            <TextField
                                onChange={this.handleDescriptionChange}
                                floatingLabelText="Description..."
                                ref="description"
                                rows={3}
                                style={{width: '100%'}}
                            />
                            <TextField
                                onChange={this.handleAddressChange}
                                floatingLabelText="Street Address..."
                                ref="streetAddress"
                                style={{width: '100%'}}
                            />
                            <TextField
                                onChange={this.handleCityChange}
                                floatingLabelText="City..."
                                ref="city"
                                style={{width: '100%'}}
                            />
                            <SelectField
                                floatingLabelText="State..."
                                value={this.state.orgState}
                                style={{width: '100%'}}
                                onChange={this.handleStateChange}
                            >{this.stateItems(this.values)}
                            </SelectField>
                            <TextField
                                onChange={this.handleZipChange}
                                floatingLabelText="Zipcode..."
                                ref="zipcode"
                                style={{width: '100%'}}
                            />
                            <br/>
                            <br/>

                            <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
                            <FlatButton label="Cancel" onClick={this.handleCancel.bind(this)}/>
                            {fireRedirect && (
                                <Redirect to={from || '/organizations/' + orgID}/>
                            )}
                            {cancelRedirect && (
                                <Redirect to={from || '/profile/' + this.props.person.id}/>
                            )}
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
}

export default AddOrganization;

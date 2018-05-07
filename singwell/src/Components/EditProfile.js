import React, {Component} from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router';
import {MenuItem, TextField, RaisedButton, FlatButton, SelectField, CardText, Card, CardTitle} from 'material-ui/'
import {getColorClass, getTextColorClass} from '../css/palette';


class EditProfile extends Component {

    constructor(props) {
        super(props);

        let phone = '';
        let address = '';
        let bio = '';
        let city = '';
        let zip = '';
        let state = '';
        let dob = '';
        let selectedFile = '';

        this.state = {
            phone,
            address,
            bio,
            city,
            zip,
            state,
            dob,
            selectedFile
        };
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleZipChange = this.handleZipChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);


    }

    handlePhoneChange(event, value) {
        this.setState({
            phone: value
        });
    }

    handleAddressChange(event, value) {
        this.setState({
            address: value
        });
    }

    handleBioChange(event, value) {
        this.setState({
            bio: value
        })
    }

    handleCityChange(event, value) {
        this.setState({
            city: value
        })
    }

    handleZipChange(event, value) {
        this.setState({
            zip: value
        })
    }

    handleStateChange(event, value) {
        let state = this.props.states[value].name;
        this.setState({
            state: state
        })
    }

    handleDobChange(event, value) {
        this.setState({
            dob: value
        })
    }

    handleFileSelected(event) {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }


    handleCancel(e) {
        this.setState(
            {cancelRedirect: true}
        )
    }

    instrumentItems(values) {
        return this.props.instruments.map((instrument) => (
            <MenuItem
                key={instrument}
                insetChildren={true}
                checked={values && values.indexOf(instrument) > -1}
                value={instrument}
                primaryText={instrument}
            />
        ));
    }

    stateItems(values) {
        return this.props.states.map((state) => (
            <MenuItem
                key={state.name}
                insetChildren={true}
                checked={values && values.indexOf(state) > -1}
                value={state.name}
                primaryText={state.abbreviation}
            />
        ));
    }

    componentWillMount() {
        this.setState({
            profileGet: {},
            updateProfile: {},
            fireRedirect: false,
            cancelRedirect: false,
            user: null,
            buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`
        });
    }

    fetchList() {
        $.ajax({
            type: "GET",
            url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/" + this.props.match.params.userID,
            dataType: 'json',
            cache: false,
            headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
            success: function (data) {
                this.setState({
                    email: data.email,
                    fname: data.first_name,
                    lname: data.last_name,
                    profileGet: data,
                    phone: data.profile.phone_number,
                    address: data.profile.address,
                    bio: data.profile.bio,
                    city: data.profile.city,
                    zip: data.profile.zip_code,
                    state: data.profile.state,
                    dob: data.profile.date_of_birth

                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err)
            }
        });
    }

    componentDidMount() {
        this.fetchList();
    }

    static defaultProps = {
        instruments: [
            'Bassoon',
            'Cello',
            'Clarinet',
            'English Horn',
            'Euphonium',
            'Flute',
            'French Horn',
            'Guitar',
            'Oboe',
            'Organ',
            'Percussion',
            'Piano',
            'Saxophone',
            'String Bass',
            'Trombone',
            'Trumpet',
            'Tuba',
            'Viola',
            'Violin'
        ],

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
                updateProfile: {
                    email: this.state.email,
                    first_name: this.state.profileGet.first_name,
                    last_name: this.state.profileGet.last_name,
                    admin_of_organizations: this.state.profileGet.admin_of_organizations,
                    owned_organizations: this.state.profileGet.owned_organizations,
                    choirs: this.state.profileGet.choirs,
                    member_of_organizations: this.state.profileGet.member_of_organizations,
                    profile: {
                        phone_number: "0000000000",
                        bio: this.state.bio,
                        address: this.state.address,
                        city: this.state.city,
                        state: this.state.state,
                        zip_code: this.state.zip,
                        date_of_birth: this.state.dob,
                        profile_picture_link: this.state.selectedFile
                    },
                    organizations: this.state.profileGet.organizations,

                }
            },
            function () {
                $.ajax({
                    type: "PATCH",
                    url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/users/" + this.props.match.params.userID + "/",
                    dataType: 'json',
                    data: this.state.updateProfile,
                    success: function (data) {
                        this.setState(
                            {
                                profilePatch: data,
                                profilePatch2: this.state.updateProfile,
                                fireRedirect: true
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

    render() {
        const {from} = this.props.location.state || '/';
        const {fireRedirect} = this.state;
        const {cancelRedirect} = this.state;
        const {values} = this.state;

        return (
            <div className={"formContainer"}>
                <div className={"form"}>
                    <Card shadow={0} style={{margin: '10px'}}>
                        <CardTitle title="EDIT PROFILE" className={"title"}/>
                        <CardText>
                            <TextField
                                floatingLabelText="Address..."
                                ref="address"
                                style={{width: '100%'}}
                                value={this.state.address}
                                onChange={this.handleAddressChange}
                            />
                            <br/>
                            <TextField
                                floatingLabelText="City..."
                                ref="city"
                                style={{width: '100%'}}
                                value={this.state.city}
                                onChange={this.handleCityChange}
                            />
                            <br/>
                            <SelectField
                                floatingLabelText="State..."
                                value={this.state.state}
                                style={{width: '100%'}}
                                onChange={this.handleStateChange}
                            >{this.stateItems(this.values)}
                            </SelectField>
                            <br/>
                            <TextField
                                floatingLabelText="Zip..."
                                ref="zip"
                                type="number"
                                style={{width: '100%'}}
                                value={this.state.zip}
                                onChange={this.handleZipChange}
                            />
                            <br/>
                            <TextField
                                floatingLabelText="Bio..."
                                ref={(input) => {
                                    this.bioInput = input;
                                }}
                                rows={3}
                                multiLine={true}
                                style={{width: '100%'}}
                                value={this.state.bio}
                                onChange={this.handleBioChange}
                            />
                            <br/>

                            <TextField
                                onChange={() => {
                                }}
                                floatingLabelText="Phone Number..."
                                style={{width: '100%'}}
                                value={this.state.phone}
                                onChange={this.handlePhoneChange}
                            />
                            <br/>
                            <TextField
                                ref="dob"
                                floatingLabelText="Birthday"
                                style={{width: '100%'}}
                                hintText="mm/dd/yyyy"
                                value={this.state.dob}
                                onChange={this.handleDobChange}
                            />
                            <br/>
                            <br/>
                            <input type="file" onChange={this.handleFileSelected}/>
                            <br/>
                            <br/>
                            <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
                            <FlatButton label="Cancel" onClick={this.handleCancel.bind(this)}/>
                            {fireRedirect && (
                                <Redirect to={from || '/profile/' + this.props.match.params.userID}/>
                            )}
                            {cancelRedirect && (
                                <Redirect to={from || '/profile/' + this.props.match.params.userID}/>
                            )}
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
}


export default EditProfile

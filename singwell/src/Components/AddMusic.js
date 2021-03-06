import React, {Component} from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router';
import {getColorClass, getTextColorClass} from '../css/palette';
import {Card, CardTitle, CardMenu, TextField, CardText, RaisedButton, FlatButton} from 'material-ui/';
import '../css/AddChoir.css';
import 'react-times/css/material/default.css';
import Dropzone from 'react-dropzone';
import IconButton from 'material-ui/IconButton';
import '../css/AddMusic.css'


class AddMusic extends Component {

    constructor(props) {
        super(props);

        let title = '';
        let composer = '';
        let arranger = '';
        let publisher = '';
        let instrument = '';

        this.state = {
            title,
            composer,
            arranger,
            publisher,
            instrument
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleComposerChange = this.handleComposerChange.bind(this);
        this.handleArrangerChange = this.handleArrangerChange.bind(this);
        this.handlePublisherChange = this.handlePublisherChange.bind(this);
        this.handleInstrumentChange = this.handleInstrumentChange.bind(this);
    }


    removeFile(file, event) {
        let i = this.state.filesToBeSent.indexOf(file);

        if (i < 0)
            return;

        this.setState((prevState) => {
            return {
                filesToBeSent: prevState.filesToBeSent.filter((element, index) => index !== i),
                filesPreview: prevState.filesPreview.filter((element, index) => index !== i)
            };
        });

    }

    onDrop(acceptedFiles, rejectedFiles) {
        let filesToBeSent = this.state.filesToBeSent;
        for (let file in acceptedFiles) {
            filesToBeSent.push(acceptedFiles[file]);
        }

        let filesPreview = [];
        for (let i in filesToBeSent) {
            filesPreview.push(
                <div key={i}>
                    {filesToBeSent[i].name}
                    <IconButton
                        iconClassName="material-icons"
                        onClick={this.removeFile.bind(this, filesToBeSent[i])}
                    >
                        close
                    </IconButton>
                </div>
            )
        }
        this.setState({filesToBeSent, filesPreview});
    }


    componentWillMount() {
        this.setState({
            newMusic: {},
            fireRedirect: false,
            cancelRedirect: false,
            musicID: null,
            buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
            filesToBeSent: [],
            filesPreview: [],
            fileToSend: {},
            file: new FormData()
        });


    }

    handleCancel(e) {
        this.setState({cancelRedirect: true})
    }

    handleTitleChange(event, value) {
        this.setState({title: value});
    }

    handleComposerChange(event, value) {
        this.setState({composer: value});
    }

    handleArrangerChange(event, value) {
        this.setState({arranger: value});
    }

    handlePublisherChange(event, value) {
        this.setState({publisher: value});
    }

    handleInstrumentChange(event, value) {
        this.setState({instrument: value});
    }

    handleSubmit(e) {
        if (this.state.filesToBeSent.length > 0) {
            for (let file in this.state.filesToBeSent) {
                let data = new FormData();
                data.append('organization_id', this.props.match.params.orgID);
                data.append(this.state.filesToBeSent[file].name, this.state.filesToBeSent[file]);
                let request = new XMLHttpRequest();
                request.open("POST", "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/parse/");
                request.send(data);
            }
            this.setState({
                organization: this.props.match.params.orgID,
                cancelRedirect: true,
            })
        } else {
            this.setState({
                newMusic: {
                    title: this.state.title,
                    composer: this.state.composer,
                    arranger: this.state.arranger,
                    publisher: this.state.publisher,
                    instrumentation: this.state.instrument,
                    organization: this.props.match.params.orgID
                }
            }, function () {
                $.ajax({
                    type: "POST",
                    url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/musicRecords/",
                    dataType: 'json',
                    headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                    data: this.state.newMusic,
                    success: function (data) {
                        this.setState(
                            {
                                organization: this.props.match.params.orgID,
                                musicPost: data,
                                musicID: data.id,
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


    }

    render() {


        const {from} = this.props.location.state || '/';
        const {fireRedirect} = this.state;
        const {cancelRedirect} = this.state;
        const {musicID} = this.state;
        const {buttonClasses} = this.state;
        const {value} = this.state;


        return (
            <div className={"formContainer"}>
                <div className={"form"}>
                    <Card shadow={0}>
                        <CardTitle title="ADD MUSIC" className={"title"}/>
                        <CardText className={"timePickerForm"}>
                            <TextField
                                onChange={this.handleTitleChange}
                                floatingLabelText="Title..."
                                style={{width: '100%'}}
                                value={this.state.title}
                            />
                            <TextField
                                onChange={this.handleComposerChange}
                                floatingLabelText="Composer..."
                                style={{width: '100%'}}
                                value={this.state.composer}
                            />
                            <TextField
                                onChange={this.handleArrangerChange}
                                floatingLabelText="Arranger..."
                                style={{width: '100%'}}
                                value={this.state.arranger}
                            />
                            <TextField
                                onChange={this.handlePublisherChange}
                                floatingLabelText="Publisher..."
                                style={{width: '100%'}}
                                value={this.state.publisher}
                            />
                            <TextField
                                onChange={this.handleInstrumentChange}
                                floatingLabelText="Instrumentation..."
                                style={{width: '100%'}}
                                value={this.state.instrument}
                            />
                            <Dropzone
                                onDrop={(files) => this.onDrop(files)}
                                multiple={true}
                                className="dropzone"
                            >
                                <div style={{wordWrap: 'break-word'}}>
                                    Files to be uploaded are:
                                    {this.state.filesPreview}
                                </div>
                            </Dropzone>

                            <br/>
                            <br/>
                            <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
                            <FlatButton label="Cancel" onClick={this.handleCancel.bind(this)}/>
                            {fireRedirect && (
                                <Redirect
                                    to={from || '/organizations/' + this.props.match.params.orgID + '/music/' + musicID}/>
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

export default AddMusic;

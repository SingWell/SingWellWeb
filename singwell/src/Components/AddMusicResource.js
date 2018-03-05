import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList, Textfield,
    FooterDropDownSection } from  'react-mdl';
import { SelectField, Option } from 'react-mdl-extra';
import { getColorClass, getTextColorClass } from '../css/palette';

import '../css/AddChoir.css'

import Moment from 'react-moment';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

import { TextField } from 'material-ui/'


class AddMusicResource extends Component {

	constructor(props: any)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }


	componentWillMount() {
		this.setState ( {
			newMusic:{},
			fireRedirect: false,
			musicID: null,
			buttonClasses: `mdl-button ${getColorClass('primary')} ${getTextColorClass('white')}`,
			filesToBeSent: [],
			filesPreview: [],
			fileToSend: {},
			file: new FormData()
		});

	}

	onDrop(acceptedFiles, rejectedFiles) {
      console.log(acceptedFiles)
      var filesToBeSent=this.state.filesToBeSent;
      for(var file in acceptedFiles) {
      	console.log('Accepted files: ', acceptedFiles[file].name);
      	filesToBeSent.push(acceptedFiles[file]);
      }
	    
	    console.log(filesToBeSent)
	    var filesPreview=[];
	    for(var i in filesToBeSent){
	    	console.log(filesToBeSent[i].name)
	      filesPreview.push(
	      	<div key={i}>
	        	{filesToBeSent[i].name}
	        </div>
	      )
	    }
	    this.setState({filesToBeSent, filesPreview});
   }
	

	handleSubmit(e) {

		for(var file in this.state.filesToBeSent) {
			var data = new FormData()
			data.append('record_id', this.props.match.params.musicID)
			data.append('type', 'file')
			data.append(this.state.filesToBeSent[file].name, this.state.filesToBeSent[file])
			console.log(this.state.filesToBeSent[file])
		 	var request = new XMLHttpRequest();
			request.open("POST", "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/resource/");
			request.send(data);
		}

		// if(this.refs.youtube.value !== "") {
		// 	var data = new FormData()
		// 	data.append('record_id', this.props.match.params.musicID)
		// 	data.append('type', 'youtube_link')
		// 	data.append(this.state.filesToBeSent[file].name, this.state.filesToBeSent[file])
		// }


		this.setState(
        	{
        		fireRedirect: true
        	})

  		e.preventDefault();
  	}

  render() {

  	

  	const { from } = this.props.location.state || '/';
  	const { fireRedirect } = this.state;
  	const { musicID } = this.state;
  	const { buttonClasses } = this.state


    return (
    	<Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Add Music Resources</CardTitle>
		    <CardText className={"timePickerForm"}>
		       <form onSubmit={this.handleSubmit.bind(this)} id="upload-form">
					<TextField
	  					floatingLabelText="Youtube Link..."
	  					ref="youtube"
					/>					
					<Dropzone 
						onDrop={(files) => this.onDrop(files)}
						multiple={true}
					>
		                <div>Try dropping some files here, or click to select files to upload.</div>
		            </Dropzone>
		            <div>
				         Files to be printed are:
				         {this.state.filesPreview}
			        </div>
					
		      		<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/' + this.props.match.params.orgID + '/music/' + this.props.match.params.musicID}/>
		        )} 
		    </CardText>
		</Card>


      
    );
  }


}

export default AddMusicResource;

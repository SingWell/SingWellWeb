import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
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


import IconButton from 'material-ui/IconButton';

import '../css/AddMusic.css'


class AddMusic extends Component {

	removeFile(file, event) {
		var i = this.state.filesToBeSent.indexOf(file);

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
	

	handleSubmit(e){

		if(this.state.filesToBeSent.length > 0) {
			for(var file in this.state.filesToBeSent) {
				var data = new FormData()
				data.append('organization_id', this.props.match.params.orgID)
				data.append(this.state.filesToBeSent[file].name, this.state.filesToBeSent[file])
				console.log(this.state.filesToBeSent[file])
			 	var request = new XMLHttpRequest();
				request.open("POST", "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/parse/");
				request.send(data);
			}
			this.setState({
				organization: this.props.match.params.orgID,
				fireRedirect: true,
			})	
		} else {
			console.log(this.refs.title.inputRef.value)
			this.setState({newMusic:{
				title: this.refs.title.inputRef.value,
				composer: this.refs.composer.inputRef.value,
				arranger: this.refs.arranger.inputRef.value,
				publisher: this.refs.publisher.inputRef.value,
				instrumentation: this.refs.instrumentation.inputRef.value,
				organization: this.props.match.params.orgID
			}}, function() {
				$.ajax({
				  type: "POST",
			      url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/musicRecords/",
			      dataType: 'json',
			      headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
			      data: this.state.newMusic,
			      success: function(data) {
			        this.setState(
			        	{
			        		organization: this.props.match.params.orgID,
			        		musicPost: data,
			        		musicID: data.id,
			        		fireRedirect: true
			        	}, function(){
			          console.log(this.state);
			        })
			      }.bind(this),
			      error: function(xhr, status, err) {
			        console.log(err);
			        console.log(xhr.responseText);
			      }
			    });
			});
	  		e.preventDefault();
		}
				
  	}

  render() {

  	

  	const { from } = this.props.location.state || '/';
  	const { fireRedirect } = this.state;
  	const { musicID } = this.state;
  	const { buttonClasses } = this.state


    return (
    	<Card shadow={0} style={{ margin: '10px'}}>
		    <CardTitle>Add Music</CardTitle>
		    <CardText className={"timePickerForm"}>
		       <form onSubmit={this.handleSubmit.bind(this)}>
			       <Textfield
					    onChange={() => {}}
					    label="Title..."
					    floatingLabel
					    ref="title"
					    style={{width: '200px'}}
					/>
					<Textfield
					    onChange={() => {}}
					    label="Composer..."
					    floatingLabel
					    ref="composer"
					    style={{width: '200px'}}
					/>
					<Textfield
					    onChange={() => {}}
					    label="Arranger..."
					    floatingLabel
					    ref="arranger"
					    style={{width: '200px'}}
					/>
					<Textfield
					    onChange={() => {}}
					    label="Publisher..."
					    floatingLabel
					    ref="publisher"
					    style={{width: '200px'}}
					/>
					<Textfield
					    onChange={() => {}}
					    label="Instrumentation..."
					    floatingLabel
					    ref="instrumentation"
					    style={{width: '200px'}}
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
		      		<input className={this.state.buttonClasses} type="submit" value="Submit" />
		      	</form>
		      	{fireRedirect && (
		          <Redirect to={from || '/organizations/' + this.props.match.params.orgID}/>
		        )} 
		    </CardText>
		    <CardActions border>
		        <Button colored accent onClick={() => this.props.history.push('/organizations/'+ this.props.match.params.orgID)}>Cancel</Button>
		    </CardActions>
		</Card>


      
    );
  }


}

export default AddMusic;

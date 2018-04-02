import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import $ from 'jquery';

import { Page, Text, View, Document, StyleSheet } from 'react-pdf';
import PDF from 'react-pdf-js';
// import 'react-pdf/dist/Page/AnnotationLayer.css';

import IconButton from 'material-ui/IconButton';




class MusicResourceItem extends Component {

  youtube_parser(url){
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
          var match = url.match(regExp);
          return (match&&match[7].length==11)? match[7] : false;
      }
  

  componentWillMount() {
    

    this.setState({
        base64:'',
        pageNumber: 1,
        numPages: null,
    }) 
    $.ajax({
          type: "GET",
          url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/resource/?resource_id=" + this.props.musicResource.resource_id + "&record_id=" + this.props.musicID,
          dataType: 'text',
          cache: false, 
          headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
          success: function(data) {
                this.setState({
                   base64: data,
                })
            
           
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(err);
          }
        });

  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  previousPage = () => this.changePage(-1)

  nextPage = () => this.changePage(1)

  changePage = offset =>
    this.setState(prevState => ({
      pageNumber: (prevState.pageNumber || 1) + offset,
    }))

  render() {
    const { pageNumber, numPages } = this.state;

    return (

      <div style={{display: "flex", alignItems: 'center', flexDirection: "column"}}>
          <h4>{this.props.musicResource.title}</h4>
                 
            <Document
              file={`data:application/pdf;base64,${this.state.base64}`}
              onLoadSuccess={this.onDocumentLoad}
            >
              <Page pageNumber={this.state.pageNumber} />
            </Document> 
            <div className="pdf-controls" >
              
              <IconButton
                  iconClassName="material-icons"
                  disabled={pageNumber <= 1}
                  onClick={this.previousPage}
                >
                  arrow_back
              </IconButton>

              <span>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</span>
              <IconButton
                  iconClassName="material-icons"
                  disabled={pageNumber >= numPages}
                  onClick={this.nextPage}
                >
                  arrow_forward
              </IconButton>
            </div>
      </div>
    );
  }

}

export default MusicResourceItem;

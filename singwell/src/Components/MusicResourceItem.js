import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, IconButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import $ from 'jquery';

import { Page, Text, View, Document, StyleSheet } from 'react-pdf';
import PDF from 'react-pdf-js';




class MusicResourceItem extends Component {

  // constructor(props) {
  //   super();
  //   // this.renderPDF = this.renderPDF.bind(this);

  // }
  state = {
      file: null,
      total: 1,
    }
  componentWillMount() {
    this.setState({
        base64:'',
        pageNumber: 1,
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

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }
 
  onPageComplete = (page) => {
    this.setState({ page });
  }
 
  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }
 
  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }
 
  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  }

  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (

      <div>
        <h4>{this.props.musicResource.title}</h4>
        <Document
          file={`data:application/pdf;base64,${this.state.base64}`}
        >
          <Page pageNumber={this.state.pageNumber} />
        </Document> 
      {/* <div>
        <PDF
          file={`data:application/pdf;base64,${this.state.base64}`}
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
        />
        {pagination}
      </div>*/}
      </div>
    );
  }

}

export default MusicResourceItem;

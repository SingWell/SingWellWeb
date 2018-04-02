import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Header, HeaderRow, HeaderTabs, Tab, Content, Grid, Cell,
    Button, FABButton, Icon, Card, CardTitle, CardMenu, List, ListItem, ListItemContent, CardText, CardActions,
    Menu, MenuItem, Footer, FooterSection, FooterLinkList,
    FooterDropDownSection } from  'react-mdl';
import $ from 'jquery';


import IconButton from 'material-ui/IconButton';

import YouTube from 'react-youtube';




class YoutubeItem extends Component {

  youtube_parser(url){
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
          var match = url.match(regExp);
          return (match&&match[7].length==11)? match[7] : false;
      }
  
  _onReady(event) {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }
  render() {

    return (
      <div>
          <div style={{display: "flex", alignItems: 'center', flexDirection: "column"}}>
              <h4>{this.props.youtubeItem.title}</h4>
              <YouTube
                videoId={this.youtube_parser(this.props.youtubeItem.url)}
                opts={
                  {
                    height: '390',

                    padding: '25px'
                  }
                }
                onReady={this._onReady}
              />  
          </div> 
      </div>
    );
  }

}

export default YoutubeItem;

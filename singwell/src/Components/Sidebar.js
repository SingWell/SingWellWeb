import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';

import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';

import Icon from 'react-icons-kit';

import { statsDots } from 'react-icons-kit/icomoon/statsDots'; 
import { calendar } from 'react-icons-kit/icomoon/calendar';   
import { books } from 'react-icons-kit/icomoon/books';
import { music } from 'react-icons-kit/icomoon/music'; 

import { Layout, Drawer, Navigation, Content, Header } from 'react-mdl';



class Sidebar extends Component {

	render() {
	  return (
	  	// was 245
	  	<div style={{width: '0px'}}>
		    {/* <Layout fixedDrawer>
		        <Drawer title="Title">
		            <Navigation>
		                <a href="#">Link</a>
		                <a href="#">Link</a>
		                <a href="#">Link</a>
		                <a href="#">Link</a>
		            </Navigation>
		        </Drawer>
		        <Content />
		    </Layout> */}
		</div>
	 	
	  );

	  /*<div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50" aria-hidden="true">
	        <header class="demo-drawer-header">
	          <img src="images/user.jpg" class="demo-avatar" />
	          <div class="demo-avatar-dropdown">
	            <span>hello@example.com</span>
	            <div class="mdl-layout-spacer"></div>
	            <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" data-upgraded=",MaterialButton,MaterialRipple">
	              <i class="material-icons" role="presentation">arrow_drop_down</i>
	              <span class="visuallyhidden">Accounts</span>
	            <span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></button>
	            <div class="mdl-menu__container is-upgraded"><div class="mdl-menu__outline mdl-menu--bottom-right"></div><ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events" for="accbtn" data-upgraded=",MaterialMenu,MaterialRipple">
	              <li class="mdl-menu__item mdl-js-ripple-effect" tabindex="-1" data-upgraded=",MaterialRipple">hello@example.com<span class="mdl-menu__item-ripple-container"><span class="mdl-ripple"></span></span></li>
	              <li class="mdl-menu__item mdl-js-ripple-effect" tabindex="-1" data-upgraded=",MaterialRipple">info@example.com<span class="mdl-menu__item-ripple-container"><span class="mdl-ripple"></span></span></li>
	              <li class="mdl-menu__item mdl-js-ripple-effect" tabindex="-1" data-upgraded=",MaterialRipple"><i class="material-icons">add</i>Add another account...<span class="mdl-menu__item-ripple-container"><span class="mdl-ripple"></span></span></li>
	            </ul></div>
	          </div>
	        </header>
	        <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a>
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a>
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Updates</a>
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>Promos</a>
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>Purchases</a>
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</a>
	          <div class="mdl-layout-spacer"></div>
	          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
	        </nav>
      </div>*/
	  /* <div style={{background: '#2c3e50', color: '#FFF', width: 220, height: '100%'}}> 
	        <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales' >
	            <Nav id='dashboard'>
	                <NavIcon><Icon size={20} icon={statsDots}/></NavIcon>    
	                <NavText> Dashboard </NavText>
	            </Nav>
	            <Nav id='calendar'>
	                <NavIcon><Icon size={20} icon={calendar}/></NavIcon>
	                <NavText> Calendar </NavText>
	            </Nav>
	            <Nav id='choirs'>
	                <NavIcon><Icon size={20} icon={music}/></NavIcon>
	                <NavText> Choirs </NavText>
	            </Nav>
	            <Nav id='library'>
	                <NavIcon><Icon size={20} icon={books}/></NavIcon>
	                <NavText> Library </NavText>
	            </Nav>
	        </SideNav>
    	</div> */
	}

}

export default Sidebar

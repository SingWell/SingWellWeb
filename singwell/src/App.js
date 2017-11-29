import React, { Component } from 'react';
import './App.css';

import Main from './Main';
import Sidebar from './Components/Sidebar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {

  render() {
    return (
    	<MuiThemeProvider>
      <div className="App" style={{display: "flex"}}>
        <Sidebar />
        <Main />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

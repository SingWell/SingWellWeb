import React, { Component } from 'react';
import './App.css';

import Main from './Main';
import Sidebar from './Components/Sidebar';

class App extends Component {

  render() {
    return (
      <div className="App" style={{display: "flex"}}>
        <Sidebar />
        <Main />
      </div>
    );
  }
}

export default App;

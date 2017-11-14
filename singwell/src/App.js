import React, { Component } from 'react';
import Organizations from './Components/Organizations'
import AddOrganization from './Components/AddOrganization'
import './App.css';

import Main from './Main';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Main />
        {/* <AddOrganization addOrganization={this.handleAddOrganization.bind(this)} /> */}
        {/* <Organizations organizations={this.state.organizations}/> */}
      </div>
    );
  }
}

export default App;

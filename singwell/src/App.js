import React, { Component } from 'react';
import Organizations from './Components/Organizations'
import AddOrganization from './Components/AddOrganization'
import $ from 'jquery';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      organizations: [
        
      ],
      todos: []

    }
  }

  getTodos() {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/todos",
      dataType: 'json',
      cache: false, 
      success: function(data) {
        this.setState({todos: data}, function(){
          console.log(this.state);
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  // componentWillMount() {
  // }

  componentDidMount() {
      this.getTodos();
  }

  handleAddOrganization(organization) {
    let organizations = this.state.organizations;
    organizations.push(organization);
    this.setState({organizations:organizations});
  }


  render() {
    return (
      <div className="App">
        <AddOrganization addOrganization={this.handleAddOrganization.bind(this)} />
        <Organizations organizations={this.state.organizations}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

class AddOrganization extends Component {

	constuctor(){
		this.state = {
			newOrganization:{}
		}
	}


	static defaultProps = {
		categories: ["web design", "web dev", "mobile dev"]
	}


	handleSubmit(e){
		if(this.refs.title.value === '') {
			// alert('Title cant be empty');
		} else {
			this.setState({newOrganization:{
				title: this.refs.title.value,
				category: this.refs.category.value
			}}, function() {
				this.props.addOrganization(this.state.newOrganization);
			});
		}
  		e.preventDefault();
  	}

  render() {

  	let categoryOptions = this.props.categories.map(category => {
  		return <option key={category} value={category}>{category}</option>
  	});

    return (
      <div>
      	<h3>Add Organization </h3>
      	<form onSubmit={this.handleSubmit.bind(this)}> 
      		<div>
	      		<label>Title</label><br />
	      		<input type="text" ref= "title" />
      		</div>
      		<div>
	      		<label>Category</label><br />
	      		<select ref= "category">
	      			{categoryOptions}
	      		</select>
      		</div>
      		<input type="submit" value="Submit" />
      	</form>
      </div>
    );
  }
}

export default AddOrganization;

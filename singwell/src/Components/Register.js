import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import styles from '../css/login.css'

import TextField from 'material-ui/TextField';



class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fname: '',
            lname: ''
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);  
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    handleEmailChange(event) {
        this.setState({email: event.target.value});
      }

      handlePasswordChange(event) {
        this.setState({password: event.target.value});
      }
          handleFirstNameChange(event) {
        this.setState({fname: event.target.value});
      }

      handleLastNameChange(event) {
        this.setState({lname: event.target.value});
      }

    handleSubmit(e){
            this.setState({submit:{
                email: this.state.email,
                password: this.state.password,
                fname: this.state.fname,
                lname: this.state.lname
                // username: this.state.email
            }}, function() {
                console.log(this.state)
                $.ajax({
                  type: "POST",
                  url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/register/",
                  dataType: 'json',
                  // headers: {"Authorization": 'Token d79649e191d27d3b903e3b59dea9c8e4cae0b3c2'},
                  data: this.state.submit,
                  success: function(data) {
                    this.setState(
                        {
                            user_id: data.user_id,
                            fireRedirect: true
                        }, function(){
                      console.log(data);
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

        componentWillMount() {
        this.setState ( {
            fireRedirect: false,
        });

    }


    render() {

        const { from } = this.props.location.state || '/';
        const { fireRedirect } = this.state;

        $(function() {

           $(".input input").focus(function() {

              $(this).parent(".input").each(function() {
                 $("label", this).css({
                    "line-height": "18px",
                    "font-size": "18px",
                    "font-weight": "100",
                    "top": "0px"
                 })
                 $(".spin", this).css({
                    "width": "100%"
                 })
              });
           }).blur(function() {
              $(".spin").css({
                 "width": "0px"
              })
              if ($(this).val() == "") {
                 $(this).parent(".input").each(function() {
                    $("label", this).css({
                       "line-height": "60px",
                       "font-size": "24px",
                       "font-weight": "300",
                       "top": "10px"
                    })
                 });

              }
           });

        });
    
        




        return (
            <div>
                <div className={"materialContainer"}>

                   <div className={"box"}>
                    <form onSubmit={this.handleSubmit.bind(this)}>  
                      <div className={"title"}>REGISTER</div>

                      <div className={"input"} style={{width: '50%'}}>
                         <label htmlFor="fname">First Name</label>
                         <input type="text" name="fname" id="fname" value={this.state.fname} onChange={this.handleFirstNameChange}/>
                         <span className={"spin"}></span>
                      </div>

                      <div className={"input"} style={{width: '50%'}}>
                         <label htmlFor="lname">Last Name</label>
                         <input type="text" name="lname" id="lname" value={this.state.lname} onChange={this.handleLastNameChange}/>
                         <span className={"spin"}></span>
                      </div>

                      <div className={"input"}>
                         <label htmlFor="email">Email</label>
                         <input type="text" name="email" id="email" value={this.state.email} onChange={this.handleEmailChange}/>
                         <span className={"spin"}></span>
                      </div>

                      <div className={"input"}>
                         <label htmlFor="password">Password</label>
                         <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                         <span className={"spin"}></span>
                      </div>

                      

                      <div className={"button login"}>
                         <button type="submit"><span>GO</span> <i className={"fa fa-check"}></i></button>
                      </div>
                      </form>
                    {fireRedirect && (
                      <Redirect to={from || '/profile/' + this.state.user_id}/>
                    )} 


                   </div>

                </div>
            </div>
          );
    }
}

export default Register
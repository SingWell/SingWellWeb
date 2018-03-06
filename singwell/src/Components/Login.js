import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';
import styles from '../css/login.css'
import { Link } from 'react-router-dom';

// import TextField from 'material-ui/TextField';
import { MenuItem, TextField, RaisedButton, FlatButton } from 'material-ui/'




class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

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

    handleSubmit(e){
            this.setState({submit:{
                email: this.state.email,
                password: this.state.password,
                // username: this.state.email
            }}, function() {
                console.log(this.state)
                $.ajax({
                  type: "POST",
                  url: "http://ec2-34-215-244-252.us-west-2.compute.amazonaws.com/login/",
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

           $(".button").click(function(e) {
              var pX = e.pageX,
                 pY = e.pageY,
                 oX = parseInt($(this).offset().left),
                 oY = parseInt($(this).offset().top);

              $(this).append('<span className={"click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
              $('.x-' + oX + '.y-' + oY + '').animate({
                 "width": "500px",
                 "height": "500px",
                 "top": "-250px",
                 "left": "-250px",

              }, 600);
              $("button", this).addClass('active');
           })

           $(".alt-2").click(function() {
              if (!$(this).hasClass('material-button')) {
                 $(".shape").css({
                    "width": "100%",
                    "height": "100%",
                    "transhtmlForm": "rotate(0deg)"
                 })

                 setTimeout(function() {
                    $(".overbox").css({
                       "overflow": "initial"
                    })
                 }, 600)

                 $(this).animate({
                    "width": "140px",
                    "height": "140px"
                 }, 500, function() {
                    $(".box").removeClass("back");

                    $(this).removeClass('active')
                 });

                 $(".overbox .title").fadeOut(300);
                 $(".overbox .input").fadeOut(300);
                 $(".overbox .button").fadeOut(300);

                 $(".alt-2").addClass('material-buton');
              }

           })

           $(".material-button").click(function() {

              if ($(this).hasClass('material-button')) {
                 setTimeout(function() {
                    $(".overbox").css({
                       "overflow": "hidden"
                    })
                    $(".box").addClass("back");
                 }, 200)
                 $(this).addClass('active').animate({
                    "width": "700px",
                    "height": "700px"
                 });

                 setTimeout(function() {
                    $(".shape").css({
                       "width": "50%",
                       "height": "50%",
                       "transhtmlForm": "rotate(45deg)"
                    })

                    $(".overbox .title").fadeIn(300);
                    $(".overbox .input").fadeIn(300);
                    $(".overbox .button").fadeIn(300);
                 }, 700)

                 $(this).removeClass('material-button');

              }

              if ($(".alt-2").hasClass('material-buton')) {
                 $(".alt-2").removeClass('material-buton');
                 $(".alt-2").addClass('material-button');
              }

           });

        });
    
        




        return (
            <div>
                <div className={"materialContainer"}>


                   <div className={"box"}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className={"title"}>LOGIN</div>

                      <div className={"input"}>
                         <label htmlFor="name">Username</label>
                         <input type="text" name="name" id="name" value={this.state.email} onChange={this.handleEmailChange}/>
                         <span className={"spin"}></span>
                      </div>

                      <div className={"input"}>
                         <label htmlFor="pass">Password</label>
                         <input type="password" name="pass" id="pass" value={this.state.password} onChange={this.handlePasswordChange}/>
                         <span className={"spin"}></span>
                      </div>

                      <div className={"button login"}>
                         <button type="submit"><span>GO</span> <i className={"fa fa-check"}></i></button>
                      </div>
                    </form>
                    {fireRedirect && (
                      <Redirect to={from || '/profile/' + this.state.user_id}/>
                    )} 
                      <a href="" className={"pass-forgot"}>Forgot your password?</a>

                      <Link to="/register" className={"pass-forgot"} style={{paddingTop: "10px"}}>
                        Don't have an account? Sign up!
                      </Link>

                   </div>

                </div>
            </div>
          );
    }
}

export default Login
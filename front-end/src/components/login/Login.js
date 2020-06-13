import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import Alert from "../alert/Alert";
import Auth from '../../Authentication/Auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        email: "",
      password: "",
      redirect: false,
      userRegAlert: false,
      userRegMsg: "",
      userRegTheme: "",
      isLogged:false
        }
        
        this.onChange = this.onChange.bind(this);
        this.addlogin = this.addlogin.bind(this);
    }
    onChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value,
        });
      }

      async addlogin(event) {
        event.preventDefault();
        if (this.state.email.trim() !== 0) {
            this.setState({
                userRegAlert: false,
              });
          try {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: this.state.email.toLowerCase(),
                password: this.state.password,
              }),
            };
            const res = await fetch(
              "http://localhost:5000/user/login",
              requestOptions
            );
    
            const data = await res.json();
    
            if (data.hasOwnProperty("accessToken")) {
              localStorage.setItem("token", data.accessToken);
              this.setState({
                redirect: true,
              });
            } else {
              this.setState({
                userRegMsg: data.error,
                userRegAlert: true,
                userRegTheme: "danger",
              });
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to="/home" />;
          }
        return (
            
            <div className="container">
                <Alert
                        show={this.state.userRegAlert}
                        theme={this.state.userRegTheme}
                        msg={this.state.userRegMsg}
                        hideAlert={this.hideAlert}
                      />
                <div className="row">
                    <form className="mt-5 col-lg-6 mx-auto" onSubmit={this.addlogin}>
                    <div class="form-group row">
                            <p>New to Eventzz? Quickly <a href="register"><strong>signup</strong></a> for an account now.</p>
                            
                        </div>
                        
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" name="email" onChange={this.onChange} class="form-control" id="inputEmail3" value={this.state.email}
 />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" onChange={this.onChange} name="password" class="form-control" id="inputPassword3" value={this.state.password}
/>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class=" mx-auto">
                                <button type="submit" class="btn btn-primary col-3 mt-2">Log in</button>
                               
                            </div>
                            
                        </div>

                    </form>
                    </div>
                </div>
       
        );
    }
}

export default Login;
import React, { Component } from 'react';
import Auth from '../../Authentication/Auth';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged:false
        }

        if(Auth.isAuthenticated()){
            this.setState({ isLogged:true});
        }
    }

    render() {
        
        return (
            <div className="">
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark ">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="home"><img src={require('../../img/logo.png')} className="d-inline-block align-top mr-2" width="60" height="35" alt="asd" />
                        </a>

                    <div className="collapse navbar-collapse  mx-auto" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mx-auto mt-2 mt-lg-0 ">
                            <li className="nav-item ">
                                <a className="nav-link" href="home">Home </a>
                            </li>
                            
                            <li className="nav-item ">
                            <a className="nav-link" href={Auth.isAuthenticated()?"/add":"/home"}>
                                    {Auth.isAuthenticated() ? "Manage Events" : ""}
                                    </a>
                            </li>
                            <li className="nav-item">
                                    <a className="nav-link" href={Auth.isAuthenticated()?"/logout":"/login"}>
                                    {Auth.isAuthenticated() ? "Logout" : "Login/Register"}
                                    </a>
                            </li>
                            
                        </ul>

                    </div>

                </nav>
                <br/><br/>
            </div>
        );
    }
}

export default Navbar;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            auth: this.props.auth 
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
      if (props.auth !== state.auth) {
        return {
          auth: props.auth
        };
      }
      return null;
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.loginUser(this.state.email, this.state.password);
    }

    setRedirect() {
        if(this.props.auth !== false && this.props.auth !== null) {
            return (
                <div>
                    <Redirect to="/chat" />
                </div>
            )
        }
    }

    renderError() {
        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('error')) {
            return (
                <p>{urlParams.get('error')}</p>
            );
        }
    }
  
    render() {
      return (
        <div id="login" className="absolute-center">
            {this.setRedirect()}
            {this.renderError()}
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <input
                        type="email" 
                        aria-label="Email" 
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        className="form-control mb-2" 
                        placeholder="Email"
                    ></input>
                </div>
                <div className="input-group">
                    <input 
                        type="text" 
                        aria-label="Password" 
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        className="form-control mb-2"  
                        placeholder="Password"
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
                <a href="/auth/google">
                    <button type="button" className="btn btn-secondary w-100 mt-2">Log in with Google</button>
                </a>
            </form>
            <Link to="/signup" className="mt-3">Signup</Link>
        </div>
      );
    }
}

export default connect(null, actions)(Login);
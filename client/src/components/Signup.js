import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            auth: this.props.auth,
            username: '',
            email: '',
            password: '',
            passwordConf: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this);
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

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handlePasswordConfChange(event) {
        this.setState({passwordConf: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.signupUser(this.state.email, this.state.password, this.state.passwordConf, this.state.username);
    }
  
    render() {
      return (
        <div id="signup" className="absolute-center">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
                <input
                    type="text" 
                    aria-label="Username" 
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                    className="form-control mb-2" 
                    placeholder="Username"
                ></input>
            </div>
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
            <div className="input-group">
                <input 
                    type="text" 
                    aria-label="Confirm Password" 
                    value={this.state.passwordConf}
                    onChange={this.handlePasswordConfChange}
                    className="form-control mb-3"  
                    placeholder="Confirm Password"
                ></input>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
            <Link to="/auth/google">
                <button type="button" className="btn btn-secondary w-100 mt-2">Sign up with Google</button>
            </Link>
          </form>
          <Link to="/login" className="mt-3">Login</Link>
        </div>
      );
    }
}

export default connect(null, actions)(Signup);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          auth: this.props.auth 
        };
    }

    static getDerivedStateFromProps(props, state) {
      if (props.auth !== state.auth) {
        return {
          auth: props.auth
        };
      }
      return null;
    }
  
    render() {
      return (
        <div id="login" className="absolute-center">
            <form>
                <div className="input-group">
                    <input type="text" aria-label="Username" className="form-control" placeholder="Username"></input>
                </div>
                <div className="input-group">
                    <input type="text" aria-label="Password" className="form-control my-2"  placeholder="Password"></input>
                </div>
                <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
            </form>
            <Link to="/signup" className="mt-3">Signup</Link>
        </div>
      );
    }
}

export default connect(null, actions)(Login);
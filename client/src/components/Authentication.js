import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';

class Authentication extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          auth: this.props.auth 
        };
    }

    componentDidMount() {
      if (!this.props.auth) {
        this.props.fetchUser();
      } 
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
        <div id="authentication">
          <BrowserRouter>
            <div>
                <Route exact path="/" component={() => <Login auth={this.props.auth} />} />
                <Route exact path="/login" component={() => <Login auth={this.props.auth} />} />
                <Route exact path="/signup" component={() => <Signup auth={this.props.auth} />} />
            </div>
          </BrowserRouter>
        </div>
      );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}
  
export default connect(mapStateToProps, actions)(Authentication);
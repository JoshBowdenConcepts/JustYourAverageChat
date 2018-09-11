import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ChatBot extends Component {
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

    setRedirect() {
        if(this.props.auth === false) {
            return (
                <div>
                    <Redirect to="/login?error='showHelpfulError" />
                </div>
            )
        }
    }

    render() {
        return (
            <div id="chat" className="absolute-center">
                {this.setRedirect()}
            </div>
        );
    }

    
}

export default connect(null, actions)(ChatBot);
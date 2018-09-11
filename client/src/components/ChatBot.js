import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ChatBot extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            auth: this.props.auth,
            message: '',
            username: 'Unknown',
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
      if (props.auth !== state.auth) {
        return {
          auth: props.auth
        };
      }
      return null;
    }

    componentDidMount() {
        if(this.props.auth) {
            this.setState({username: this.props.auth.username});
        }
    }

    handleMessageChange(event) {
        this.setState({message: event.target.value});
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

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div id="chat" className="absolute-center">
                {this.setRedirect()}
                <div id="output"></div>
                <div id="feedback"></div>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text" 
                            aria-label="Message" 
                            id="message"
                            value={this.state.message}
                            onChange={this.handleMessageChange}
                            className="form-control" 
                            placeholder="Message"
                        ></input>
                    </div>
                    <div className="input-group">
                        <input
                            type="hidden"
                            id="handle"
                            value={this.state.username}
                            className="form-control"
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" id="send">Send</button>
                </form>
            </div>
        );
    }

    
}

export default connect(null, actions)(ChatBot);
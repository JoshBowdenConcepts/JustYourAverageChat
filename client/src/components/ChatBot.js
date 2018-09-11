import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

class ChatBot extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            auth: this.props.auth,
            message: '',
            username: 'Unknown',
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        // this.sendSocketIO = this.sendSocketIO.bind(this);
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
        // Add event listener 
        const output = document.getElementById('output'),
              feedback = document.getElementById('feedback');

        socket.on('chat', function(data) {
            feedback.innerHTML = '';
            output.innerHTML += '<p class="message-output"><strong>' + data.handle + ':</strong> ' + data.message + '</p><hr>';
        });
        
        socket.on('typing', function(data){
            feedback.innerHTML = '<p class="alert-message"><em>' + data + ' is typing a message...</em></p>';
        });
    }

    componentWillUnmount() {
        // Remove all event listeners
    }

    handleMessageChange(event) {
        this.setState({message: event.target.value});
        let handle = document.getElementById('handle');
        socket.emit('typing', handle.value);
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
        let message = document.getElementById('message'),
            handle = document.getElementById('handle');
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
    
        message.value = '';
    }

    render() {
        return (
            <div id="chat" className="absolute-center">
                {this.setRedirect()}
                <div id="chat-window">
                    <div id="output"></div>
                    <div id="feedback"></div>
                </div>
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
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import openSocket from 'socket.io-client';

import Search from './Search';

let socket = '';
if(window.location.hostname === 'justyouraveragechat.herokuapp.com') {
    socket = openSocket('https://justyouraveragechat.herokuapp.com/');
} else {
    socket = openSocket('http://localhost:5000');
}


class ChatBot extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            auth: this.props.auth,
            message: '',
            username: 'Unknown',
            gifSearch: true,
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

    expandSearch(id) {
        if (document.getElementById(id).classList.contains('searchExpand')) {
            document.getElementById(id).classList.remove('searchExpand');
            document.getElementById('addGif').classList.remove('bg-secondary');
            document.getElementById('addGif').classList.remove('text-white');
            document.getElementById('addImage').classList.remove('bg-secondary');
            document.getElementById('addImage').classList.remove('text-white');
        } else {
            document.getElementById(id).classList.add('searchExpand');
            if (id === 'gif-search') {
                document.getElementById('image-search').classList.remove('searchExpand');
                document.getElementById('addGif').classList.add('bg-secondary');
                document.getElementById('addGif').classList.add('text-white');
                document.getElementById('addImage').classList.remove('bg-secondary');
                document.getElementById('addImage').classList.remove('text-white');
            } else {
                document.getElementById('gif-search').classList.remove('searchExpand');
                document.getElementById('addImage').classList.add('bg-secondary');
                document.getElementById('addImage').classList.add('text-white');
                document.getElementById('addGif').classList.remove('bg-secondary');
                document.getElementById('addGif').classList.remove('text-white');
            }
        }
    }

    gifSearch() {
        // Put the gif search code here
    }

    imageSearch() {
        // Put the image search code here
    }

    render() {
        return (
            <div id="chat">
                {this.setRedirect()}
                <div id="chat-window">
                    <div id="output"></div>
                    <div id="feedback"></div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <button 
                            id="addGif"
                            type="button"
                            className="btn btn-outline-secondary w-50 rounded-top"
                            onClick={() => this.expandSearch('gif-search')}
                        >Add Gifs</button>
                        <button 
                            id="addImage"
                            className="btn btn-outline-secondary w-50 rounded-top"
                            type="button"
                            onClick={() => this.expandSearch('image-search')}
                        >Add Image</button>
                    </div>
                    <div id="gif-search" >
                        <Search searchFor={(term) => this.gifSearch(term)} />
                    </div>
                    <div id="image-search" >
                        <Search searchFor={(term) => this.imageSearch(term)} />
                    </div>
                    <div className="input-group">
                        <input
                            type="text" 
                            aria-label="Message" 
                            id="message"
                            value={this.state.message}
                            onChange={this.handleMessageChange}
                            className="form-control rounded-0" 
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
                    <button type="submit" className="btn btn-primary w-100 rounded-0 rounded-bottom" id="send">Send</button>
                </form>
            </div>
        );
    }

    
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(ChatBot);
import React, { Component } from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            term: ''
        };
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(event) {
        this.setState({term: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.searchFor(this.state.term);
    }

    render() {
        return (
            <div id="search">
                <input
                    type="text" 
                    aria-label="Search" 
                    value={this.state.term}
                    onChange={this.handleTermChange}
                    className="form-control mb-0 rounded-0" 
                    placeholder="Try Happy..."
                ></input>
            </div>
        );
    }

    
}
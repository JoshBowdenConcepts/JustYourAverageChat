import React, { Component } from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            term: ''
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                <div className="input-group">
                    <input
                        type="text" 
                        aria-label="Search" 
                        value={this.state.term}
                        onChange={this.handleTermChange}
                        className="form-control mb-0 rounded-0" 
                        placeholder="Try Happy..."
                    ></input>
                    <button type="button" className="btn btn-success rounded-0" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        );
    }

    
}
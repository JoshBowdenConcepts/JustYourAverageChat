import React, { Component } from 'react';

import ErrorBoundary from './ErrorBoundary';
import Authentication from './components/Authentication';

export default class App extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <Authentication />
        </ErrorBoundary>
      </div>
    );
  }
}

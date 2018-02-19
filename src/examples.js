import React, { Component } from 'react';
import { Map } from 'immutable';
import makeAppPresenters from './app';

const presenter = () => (
  (Component) => Component
);

const appPresenters = makeAppPresenters(presenter, {});

class App extends Component {
  render() {
    return (
      <div>
        <appPresenters.Link
          config={new Map()}
          mapData={new Map({ url: 'http://google.com' })} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { fromJS } from 'immutable';
import makeAppPresenters from './app';

const presenter = () => (
  (Component) => Component
);

const presentersByType = {};
makeAppPresenters(presenter, {
  presenterRegistry: (type, component) => { presentersByType[type] = component; }
});

class App extends Component {
  render() {
    return (
      <div>
        {this.renderPresenter(fromJS({
          "type": "link",
          "config": {
            "presenter": {
              "type": "text",
              "mapData": {
                "text": "google"
              }
            }
          },
          "mapData": {
            "url": "http://google.com"
          }
        }))}
      </div>
    );
  }

  renderPresenter = (presenter) => {
    const Presenter = presentersByType[presenter.get('type')];

    return (
      <Presenter
        {...presenter.toObject()}
        renderPresenter={this.renderPresenter} />
    );
  };
}

export default App;

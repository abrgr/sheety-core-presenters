import React, { Component } from 'react';
import { Map } from 'immutable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CellRef } from 'sheety-model';

export default function makeRouterPresenter(presenter) {
  class RouterPresenter extends Component {
    componentDidMount() {
      this.updateParams({ match: {} }, this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.updateParams(this.props, nextProps);
    }

    updateParams(curProps, nextProps) {
      const { sheet, setCellValues } = nextProps;
      const prevPath = curProps.match.path;
      const nextPath = nextProps.match.path;
      const params = Object.keys(nextProps.params);
      const hasSetter = !!params.length;

      if ( hasSetter && nextPath !== prevPath ) {
        setCellValues(new Map(
          params.map(param => {
            const cellRef = CellRef.fromA1Ref(param);
            if ( !cellRef ) {
              return null;
            }

            const value = nextProps.params[param];
            const cell = sheet.getCell(cellRef);
            const format = cell && cell.get('format');
            return [
              cellRef, 
              format ? format.fromUserEnteredValue(value) : value
            ];
          })
        ));
      }
    }

    render() {
      const { config, renderPresenter } = this.props;
      const routes = config.get('routes');

      return (
        <BrowserRouter>
          <Switch>
            {routes.map((presenter, route) => (
              <Route
                key={route}
                exact
                path={route}
                render={renderPresenter.bind(null, presenter)} />
            )).valueSeq()}
          </Switch>
        </BrowserRouter>
      );
    }
  };

  return presenter()(RouterPresenter);
}

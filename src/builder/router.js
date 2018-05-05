import React, { Component } from 'react';
import { fromJS, Map, List } from 'immutable';
import AutoComplete from 'material-ui/AutoComplete';
import EditPresenterIcon from 'material-ui/svg-icons/editor/border-inner';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import equalPaths from './equal-paths';
import Action from '../configurer/action';

export default function makeRouterPresenter(presenter) {
  class RouterPresenter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedRoute: null,
        partialRoute: null
      };
    }

    render() {
      const {
        path,
        selectedPath,
        isEditing,
        config,
        renderPresenter,
        onSelectPresenterForEditing,
        onUpdate,
        onEditAction
      } = this.props;
      const routes = config.get('routes');

      const { selectedRoute, partialRoute } = this.state;
      const selectedIdx = routes.findIndex(r => r.get('path') === selectedRoute);

      const newRoutes = !partialRoute || this.haveRoute(partialRoute)
                      ? []
                      : [partialRoute];

      const routeDataSource = routes.map(routeConfig => ({
        label: routeConfig.get('path'),
        value: routeConfig.get('path')
      })).toJS().concat(
        newRoutes.map(r => ({
          label: `${r} (New)`,
          value: r,
          isNew: true
        }))
      );

      const presenter = routes.getIn([selectedIdx, 'presenter']);
      const presenterPath = ['config', 'routes', selectedIdx, 'presenter'];

      return (
        <div>
          <AutoComplete
            fullWidth
            hintText="/product/:name"
            floatingLabelText="URL Path"
            onNewRequest={this.onSetRoute}
            onUpdateInput={this.onSetParitalRoute}
            searchText={partialRoute}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={{
              text: 'label',
              value: 'value'
            }}
            dataSource={routeDataSource} />
          {isEditing
            ? (
              <Action
                schema={new Map()}
                path={path.concat(['config', 'routes', selectedIdx, 'onRouteLaunched'])}
                presenter={new Map()}
                value={routes.getIn([selectedIdx, 'onRouteLaunched'])}
                onUpdate={onUpdate}
                onEditAction={onEditAction} />
            ) : null}
          {/* Render the presenter if we have one set or if we are editing it */
           !!presenter || (!!selectedPath && equalPaths(path.concat(presenterPath), selectedPath))
            ? (
              renderPresenter(presenterPath, presenter)
            ) : (
              <div
                style={{
                  textAlign: 'center'
                }}>
                <FloatingActionButton
                  disabled={!isEditing}
                  onClick={(evt) => {
                    evt.stopPropagation();
                    onSelectPresenterForEditing(path.concat(presenterPath));
                  }}>
                  <EditPresenterIcon />
                </FloatingActionButton>
              </div>
            )}
        </div>
      );
    }

    onSetRoute = selectedRoute => {
      const { path, onUpdate, config, onSelectPresenterForEditing } = this.props;

      const route = typeof selectedRoute === 'string'
                  ? selectedRoute
                  : selectedRoute.value;

      if ( !this.haveRoute(route) ) {
        const newRoutes = config.get('routes').push(new Map({
          path: route,
          presenter: null
        }));

        onUpdate(
          path.concat(['config', 'routes']),
          newRoutes
        );

        onSelectPresenterForEditing(path.concat(['config', 'routes', newRoutes.size - 1, 'presenter']));
      }

      this.setState({
        selectedRoute: route,
        partialRoute: route
      });
    };

    onSetParitalRoute = partialRoute => {
      this.setState({
        partialRoute
      });
    };

    haveRoute = route => (
      this.props.config.get('routes').some(r => (
        r.get('path') === route
      ))
    );
  }

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/router.json",
      "title": "Router",
      "description": "Defines url routes and the presenters to render when the user navigates to those urls directly or by clicking a link.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "router",
          "default": "router"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "routes": {
              "title": "Routes",
              "description": "A list of url parts and the presenter we should show when the user navigates to that url.",
              "default": [],
              "type": "array",
              "linkable": false,
              "internallyConfigured": true,
              "items": {
                "title": "Route",
                "type": "object",
                "properties": {
                  "path": {
                    "title": "Path",
                    "description": "The path for this route (the thing you see in the address bar).  You can use /path/{'My Tab'!A1}/{'My Tab'!B2} so that, if the user navigates to /path/something/else, 'something' is written to cell A1 in tab, My Tab, and 'else' is writte to cell B2 in tab, My Tab.",
                    "type": "string",
                    "linkable": false
                  },
                  "presenter": {
                    "title": "Presenter",
                    "description": "Presenter to show at this url.",
                    "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
                    "linkable": false
                  },
                  "onRouteLaunched": {
                    "title": "Page Loaded Action",
                    "description": "Action to fire when this page loads",
                    "linkable": false,
                    "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/action.json"
                  }
                }
              }
            }
          }
        }
      }
    }),
    getEventSchema: (path, presenter) => {
      // path refers to config/routes/{n}/onRouteLaunched
      const routePath = presenter.getIn(path.slice(0, -1).concat('path'));
      const baseEventSchema = fromJS({
        "properties": {
          "fullPath": {
            "title": "Full path for this page",
            "type": "string"
          }
        }
      });

      const routeParams = getAllRouteParams(routePath);

      return baseEventSchema.mergeIn(
        ['properties'],
        new Map(
          routeParams.map(param => ([
            param,
            new Map({
              title: param,
              type: 'string'
            })
          ]))
        )
      );
    }
  })(RouterPresenter);
}

function getAllRouteParams(route) {
  const params = [];
  const re = /\/:([^\/]+)/g;
  let match = null;
  do {
    match = re.exec(route);
    if ( !!match ) {
      params.push(match[1]);
    }
  } while ( !!match );

  return new List(params);
}

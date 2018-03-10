import React from 'react';
import { fromJS } from 'immutable';
import { Tabs, Tab } from 'material-ui/Tabs';

export default function makeRouterPresenter(presenter) {
  const RouterPresenter = ({ config, renderPresenter }) => {
    const routes = config.get('routes');

    return (
      <Tabs>
        {routes.map((routeConfig, idx) => (
          <Tab
            key={routeConfig.get('path')}
            label={routeConfig.get('path')}>
            {renderPresenter(['config', 'routes', idx, 'presenter'], routeConfig.get('presenter'))}
          </Tab>
        )).valueSeq()}
      </Tabs>
    );
  };

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
        "mapData": {
          "title": "Configuration",
          "description": "Pre-set values and formulas that will be evaluated against the spreadsheet that will determine the appearance and behavior of this presenter",
          "type": "object",
          "default": {},
          "properties": {
            "base": {
              "title": "Base route",
              "description": "Prepend this to every route.  Useful if you want to mount one app at yoursite.com/app1 and another at yoursite.com/app2.",
              "default": "",
              "type": "string"
            }
          }
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
                  }
                }
              }
            }
          }
        }
      }
    })
  })(RouterPresenter);
}

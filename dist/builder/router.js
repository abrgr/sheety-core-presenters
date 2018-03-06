'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeRouterPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _Tabs = require('material-ui/Tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeRouterPresenter(presenter) {
  var RouterPresenter = function RouterPresenter(_ref) {
    var config = _ref.config,
        renderPresenter = _ref.renderPresenter;

    var routes = config.get('routes');

    return _react2.default.createElement(
      _Tabs.Tabs,
      null,
      routes.map(function (routeConfig, idx) {
        return _react2.default.createElement(
          _Tabs.Tab,
          {
            key: routeConfig.get('path'),
            label: routeConfig.get('path') },
          renderPresenter(['config', 'routes', idx, 'presenter'], routeConfig.get('presenter'))
        );
      }).valueSeq()
    );
  };

  return presenter({
    schema: (0, _immutable.fromJS)({
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
            "base": {
              "title": "Base route",
              "description": "Prepend this to every route.  Useful if you want to mount one app at yoursite.com/app1 and another at yoursite.com/app2.",
              "default": "",
              "type": "string"
            },
            "routes": {
              "title": "Routes",
              "description": "A list of url parts and the presenter we should show when the user navigates to that url.",
              "default": [],
              "type": "array",
              "items": {
                "title": "Route",
                "type": "object",
                "properties": {
                  "path": {
                    "title": "Path",
                    "description": "The path for this route (the thing you see in the address bar).  You can use /path/{'My Tab'!A1}/{'My Tab'!B2} so that, if the user navigates to /path/something/else, 'something' is written to cell A1 in tab, My Tab, and 'else' is writte to cell B2 in tab, My Tab.",
                    "type": "string"
                  },
                  "presenter": {
                    "title": "Presenter",
                    "description": "Presenter to show at this url.",
                    "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json"
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
//# sourceMappingURL=router.js.map
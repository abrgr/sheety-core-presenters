'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = makeRouterPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _borderInner = require('material-ui/svg-icons/editor/border-inner');

var _borderInner2 = _interopRequireDefault(_borderInner);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _equalPaths = require('./equal-paths');

var _equalPaths2 = _interopRequireDefault(_equalPaths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeRouterPresenter(presenter) {
  var RouterPresenter = function (_Component) {
    _inherits(RouterPresenter, _Component);

    function RouterPresenter(props) {
      _classCallCheck(this, RouterPresenter);

      var _this = _possibleConstructorReturn(this, (RouterPresenter.__proto__ || Object.getPrototypeOf(RouterPresenter)).call(this, props));

      _this.onSetRoute = function (selectedRoute) {
        var _this$props = _this.props,
            path = _this$props.path,
            onUpdate = _this$props.onUpdate,
            config = _this$props.config,
            onSelectPresenterForEditing = _this$props.onSelectPresenterForEditing;


        var route = typeof selectedRoute === 'string' ? selectedRoute : selectedRoute.value;

        if (!_this.haveRoute(route)) {
          var newRoutes = config.get('routes').push(new _immutable.Map({
            path: route,
            presenter: null
          }));

          onUpdate(path.concat(['config', 'routes']), newRoutes);

          onSelectPresenterForEditing(path.concat(['config', 'routes', newRoutes.size - 1, 'presenter']));
        }

        _this.setState({
          selectedRoute: route,
          partialRoute: route
        });
      };

      _this.onSetParitalRoute = function (partialRoute) {
        _this.setState({
          partialRoute: partialRoute
        });
      };

      _this.haveRoute = function (route) {
        return _this.props.config.get('routes').some(function (r) {
          return r.get('path') === route;
        });
      };

      _this.state = {
        selectedRoute: null,
        partialRoute: null
      };
      return _this;
    }

    _createClass(RouterPresenter, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            path = _props.path,
            selectedPath = _props.selectedPath,
            isEditing = _props.isEditing,
            config = _props.config,
            renderPresenter = _props.renderPresenter,
            onSelectPresenterForEditing = _props.onSelectPresenterForEditing;

        var routes = config.get('routes');

        var _state = this.state,
            selectedRoute = _state.selectedRoute,
            partialRoute = _state.partialRoute;

        var selectedIdx = routes.findIndex(function (r) {
          return r.get('path') === selectedRoute;
        });

        var newRoutes = !partialRoute || this.haveRoute(partialRoute) ? [] : [partialRoute];

        var routeDataSource = routes.map(function (routeConfig) {
          return {
            label: routeConfig.get('path'),
            value: routeConfig.get('path')
          };
        }).toJS().concat(newRoutes.map(function (r) {
          return {
            label: r + ' (New)',
            value: r,
            isNew: true
          };
        }));

        var presenter = routes.getIn([selectedIdx, 'presenter']);
        var presenterPath = ['config', 'routes', selectedIdx, 'presenter'];

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_AutoComplete2.default, {
            fullWidth: true,
            hintText: '/product/:name',
            floatingLabelText: 'URL Path',
            onNewRequest: this.onSetRoute,
            onUpdateInput: this.onSetParitalRoute,
            searchText: partialRoute,
            filter: _AutoComplete2.default.fuzzyFilter,
            dataSourceConfig: {
              text: 'label',
              value: 'value'
            },
            dataSource: routeDataSource }),
          /* Render the presenter if we have one set or if we are editing it */
          !!presenter || !!selectedPath && (0, _equalPaths2.default)(path.concat(presenterPath), selectedPath) ? renderPresenter(presenterPath, presenter) : _react2.default.createElement(
            'div',
            {
              style: {
                textAlign: 'center'
              } },
            _react2.default.createElement(
              _FloatingActionButton2.default,
              {
                disabled: !isEditing,
                onClick: function onClick(evt) {
                  evt.stopPropagation();
                  onSelectPresenterForEditing(path.concat(presenterPath));
                } },
              _react2.default.createElement(_borderInner2.default, null)
            )
          )
        );
      }
    }]);

    return RouterPresenter;
  }(_react.Component);

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
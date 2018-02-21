'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeRouterPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeRouterPresenter(presenter) {
  var RouterPresenter = function RouterPresenter(_ref) {
    var config = _ref.config,
        renderPresenter = _ref.renderPresenter;

    var routes = config.get('routes');

    return _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        routes.map(function (presenter, route) {
          return _react2.default.createElement(_reactRouterDom.Route, {
            key: route,
            exact: true,
            path: route,
            render: renderPresenter.bind(null, presenter) });
        }).valueSeq()
      )
    );
  };

  return presenter({
    configKeyDocs: new _immutable.Map({
      routes: 'Map from url to presenter to show at that url'
    })
  })(RouterPresenter);
}
//# sourceMappingURL=router.js.map
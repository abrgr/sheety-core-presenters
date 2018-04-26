'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MuiProxy = function MuiProxy(_ref) {
  var _ref$nextProxy = _ref.nextProxy,
      NextProxy = _ref$nextProxy.value,
      next = _ref$nextProxy.next,
      nextProps = _objectWithoutProperties(_ref, ['nextProxy']);

  return _react2.default.createElement(
    _MuiThemeProvider2.default,
    null,
    _react2.default.createElement(NextProxy, _extends({}, nextProps, {
      nextProxy: next() }))
  );
};

exports.default = function () {
  return MuiProxy;
};
//# sourceMappingURL=mui-proxy.js.map
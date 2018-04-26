'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _sheetyModel = require('sheety-model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ImmutablePropsProxy = function ImmutablePropsProxy(_ref) {
  var _ref$nextProxy = _ref.nextProxy,
      NextProxy = _ref$nextProxy.value,
      next = _ref$nextProxy.next,
      fixture = _ref.fixture,
      nextProps = _objectWithoutProperties(_ref, ['nextProxy', 'fixture']);

  var _fixture$props = fixture.props,
      config = _fixture$props.config,
      mapData = _fixture$props.mapData,
      arrayData = _fixture$props.arrayData,
      arrayCells = _fixture$props.arrayCells,
      arrayDataQuery = _fixture$props.arrayDataQuery,
      mapDataQuery = _fixture$props.mapDataQuery,
      sheet = _fixture$props.sheet;


  var fixedFixture = _extends({}, fixture, {
    props: _extends({}, fixture.props, {
      config: !!config ? (0, _immutable.fromJS)(config) : null,
      mapData: !!mapData ? (0, _immutable.fromJS)(mapData) : null,
      arrayData: !!arrayData ? (0, _immutable.fromJS)(arrayData) : null,
      arrayCells: !!arrayCells ? (0, _immutable.fromJS)(arrayCells) : null,
      arrayDataQuery: !!arrayDataQuery ? (0, _immutable.fromJS)(arrayDataQuery) : null,
      mapDataQuery: !!mapDataQuery ? (0, _immutable.fromJS)(mapDataQuery) : null,
      sheet: !!sheet ? new _sheetyModel.Sheet(sheet) : null
    })
  });

  return _react2.default.createElement(NextProxy, _extends({}, nextProps, {
    nextProxy: next(),
    fixture: fixedFixture }));
};

exports.default = function () {
  return ImmutablePropsProxy;
};
//# sourceMappingURL=immutable-props-proxy.js.map
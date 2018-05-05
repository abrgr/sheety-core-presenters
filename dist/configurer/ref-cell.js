'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _gridOn = require('material-ui/svg-icons/image/grid-on');

var _gridOn2 = _interopRequireDefault(_gridOn);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var path = _ref.path,
      onSetLinkPath = _ref.onSetLinkPath,
      value = _ref.value,
      title = _ref.title,
      description = _ref.description;
  return _react2.default.createElement(
    'div',
    null,
    value ? _react2.default.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row'
        } },
      _react2.default.createElement(
        _IconButton2.default,
        {
          tooltip: 'Edit cell',
          tooltipPosition: 'bottom-right',
          onClick: function onClick() {
            onSetLinkPath(path);
          } },
        _react2.default.createElement(_gridOn2.default, {
          color: _colors.cyanA700 })
      ),
      value
    ) : _react2.default.createElement(_RaisedButton2.default, {
      label: 'Select a spreadsheet cell',
      onClick: function onClick() {
        onSetLinkPath(path);
      } })
  );
};
//# sourceMappingURL=ref-cell.js.map
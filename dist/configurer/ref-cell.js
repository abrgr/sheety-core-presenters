'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var path = _ref.path,
      onSetLinkPath = _ref.onSetLinkPath,
      title = _ref.title,
      description = _ref.description;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_RaisedButton2.default, {
      label: 'Select a spreadsheet cell',
      onClick: function onClick() {
        onSetLinkPath(path);
      } })
  );
};
//# sourceMappingURL=ref-cell.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate;
  return _react2.default.createElement(_TextField2.default, {
    floatingLabelText: 'Formula',
    value: value || '',
    onChange: function onChange(evt) {
      onUpdate(evt.target.value);
    } });
};
//# sourceMappingURL=formula.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGridLayoutPlaceholder;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeGridLayoutPlaceholder(presenter) {
  var Placeholder = function Placeholder(_ref) {
    var _ref$config = _ref.config,
        config = _ref$config === undefined ? new _immutable.Map() : _ref$config,
        onSelectPresenterForEditing = _ref.onSelectPresenterForEditing;

    var rowIdx = config.get('rowIdx');
    var colIdx = config.get('colIdx');

    return _react2.default.createElement(
      'div',
      { style: { width: '100%', height: '100%' } },
      _react2.default.createElement(
        'button',
        {
          onClick: function onClick() {
            onSelectPresenterForEditing(['config', rowIdx, colIdx]);
          } },
        'Set presenter'
      )
    );
  };

  return presenter({
    hidden: true
  })(Placeholder);
}
//# sourceMappingURL=grid-layout-placeholder.js.map
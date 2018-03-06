'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGridPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeGridPresenter(presenter) {
  var GridPresenter = function GridPresenter(_ref) {
    var _ref$config = _ref.config,
        config = _ref$config === undefined ? new _immutable.Map() : _ref$config,
        renderPresenter = _ref.renderPresenter;

    var rows = config.get('rows', new _immutable.List());

    return _react2.default.createElement(
      'div',
      { className: 'container' },
      rows.map(function (row, rowIdx) {
        return _react2.default.createElement(
          'div',
          {
            key: 'row-' + rowIdx,
            style: { marginTop: 20, marginBottom: 20 },
            className: 'row' },
          row.map(function (cell, cellIdx) {
            return _react2.default.createElement(
              'div',
              {
                key: 'cell-' + cellIdx,
                className: 'col-' + cell.get('width') },
              !!cell.get('presenter') ? renderPresenter(cell.get('presenter')) : null
            );
          })
        );
      })
    );
  };

  return presenter()(GridPresenter);
}
//# sourceMappingURL=grid-layout.js.map
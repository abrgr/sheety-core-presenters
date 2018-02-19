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
    var config = _ref.config,
        renderPresenter = _ref.renderPresenter;

    var rows = config.get('rows');

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
              cell.has('presenter') ? renderPresenter(cell.get('presenter')) : null
            );
          })
        );
      })
    );
  };

  return presenter({
    configKeyDocs: new _immutable.Map({
      rows: 'rows is an iterable of row iterables.  Each row iterable is composed of cell descriptors.  Each cell descriptor is an object/map like { width, presenter }, where width is a value from 1-12 and presenter is a presenter definition.'
    })
  })(GridPresenter);
}
//# sourceMappingURL=grid-layout.js.map
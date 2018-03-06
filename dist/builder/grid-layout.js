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
        renderPresenter = _ref.renderPresenter,
        path = _ref.path,
        onSelectPresenterForEditing = _ref.onSelectPresenterForEditing;

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
            var cellPath = path.concat(['config', 'rows', rowIdx, cellIdx, 'presenter']);
            var cellPresenter = cell.get('presenter');

            return _react2.default.createElement(
              'div',
              {
                key: 'cell-' + cellIdx,
                className: 'col-' + cell.get('width') },
              !!cellPresenter ? renderPresenter(cellPath, cellPresenter) : _react2.default.createElement(
                'button',
                {
                  onClick: function onClick(evt) {
                    evt.stopPropagation();
                    onSelectPresenterForEditing(cellPath);
                  } },
                'Set presenter'
              )
            );
          })
        );
      })
    );
  };

  return presenter({
    schema: (0, _immutable.fromJS)({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/grid-layout.json",
      "title": "Grid Layout",
      "description": "Grid Layout renders other presenters in a grid.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "grid-layout",
          "default": "grid-layout"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "rows": {
              "title": "Rows",
              "description": "Specifies a row of the grid.",
              "type": "array",
              "items": {
                "title": "Row",
                "type": "array",
                "items": {
                  "title": "Cell",
                  "type": "object",
                  "default": {},
                  "properties": {
                    "width": {
                      "title": "Width",
                      "description": "Number of columns this presenter will occupy.",
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 12
                    },
                    "presenter": {
                      "title": "Presenter",
                      "description": "The presenter to render in this cell.",
                      "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json"
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  })(GridPresenter);
}
//# sourceMappingURL=grid-layout.js.map
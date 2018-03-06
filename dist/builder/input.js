'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeInputPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeInputPresenter(presenter) {
  var InputPresenter = function InputPresenter(_ref) {
    var config = _ref.config,
        mapData = _ref.mapData,
        calc = _ref.calc,
        setCellValues = _ref.setCellValues;

    var valueCell = config.get('value');
    var value = calc.evaluateFormula(valueCell);
    var inputType = config.get('inputType');

    return _react2.default.createElement('input', {
      onChange: function onChange(evt) {
        var cellRef = CellRef.fromA1Ref(valueCell);
        var cell = sheet.getCell(cellRef);
        var format = cell && cell.get('format');
        setCellValues(new Map([[CellRef.of(valueCell), format ? format.fromUserEnteredValue(evt.target.value) : newVal]]));
      },
      value: value,
      type: inputType });
  };

  return presenter({
    schema: (0, _immutable.fromJS)({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/input.json",
      "title": "Text",
      "description": "The Input Presenter allows you to show users an input box with a value that is synced to a cell in your spreadsheet.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "input",
          "default": "input"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "value": {
              "title": "Value",
              "description": "The cell to read and write the value to.",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json"
            },
            "inputType": {
              "title": "Input Type",
              "description": "The type of input to provide",
              "default": "text",
              "type": "string",
              "enum": ["text", "password", "date", "color", "datetime-local", "email", "number", "tel", "time", "url"]
            }
          }
        }
      }
    })
  })(SelectPresenter);
}
//# sourceMappingURL=input.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = makeSelectPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeSelectPresenter(presenter) {
  var SelectPresenter = function SelectPresenter(_ref) {
    var config = _ref.config,
        mapData = _ref.mapData,
        calc = _ref.calc,
        setCellValues = _ref.setCellValues;

    var valueCell = config.get('value');
    var options = mapData.get('options', []);
    var value = calc.evaluateFormula(valueCell);

    return _react2.default.createElement(
      'select',
      {
        onChange: function onChange(evt) {
          var cellRef = CellRef.fromA1Ref(valueCell);
          var cell = sheet.getCell(cellRef);
          var format = cell && cell.get('format');
          setCellValues(new Map([[cellRef, format ? format.fromUserEnteredValue(evt.target.value) : newVal]]));
        },
        value: value },
      options.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            optionValue = _ref3[0],
            optionLabel = _ref3[1];

        return _react2.default.createElement(
          'option',
          {
            value: optionValue },
          optionLabel
        );
      })
    );
  };

  return presenter({
    schema: (0, _immutable.fromJS)({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/select.json",
      "title": "Text",
      "description": "The Select Presenter allows you to show users a dropdown with options populated from your spreadsheet and a selected value that is synced to a cell in your spreadsheet.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "select",
          "default": "select"
        },
        "mapData": {
          "title": "Options",
          "description": "Formulas that will be evaluated against the spreadsheet",
          "type": "object",
          "default": {},
          "properties": {
            "options": {
              "title": "Options",
              "description": "The result of this formula should be a 2-dimensional values and corresponding labels.",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json"
            }
          }
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "value": {
              "title": "Value",
              "description": "The cell to read and write the selected value to.",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json"
            }
          }
        }
      }
    })
  })(SelectPresenter);
}
//# sourceMappingURL=select.js.map
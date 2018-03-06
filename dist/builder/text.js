'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeTextPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeTextPresenter(presenter) {
  var TextPresenter = function TextPresenter(_ref) {
    var mapData = _ref.mapData;

    var text = mapData.get('text');

    return _react2.default.createElement(
      'p',
      null,
      text
    );
  };

  return presenter({
    schema: (0, _immutable.fromJS)({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/text.json",
      "title": "Text",
      "description": "The Text presenter allows you to embed the result of a spreadsheet formula into your Sheety App",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "text",
          "default": "text"
        },
        "mapData": {
          "title": "Spreadsheet data",
          "description": "Formulas that will be evaluated against the spreadsheet",
          "type": "object",
          "default": {},
          "properties": {
            "text": {
              "title": "Text",
              "description": "The formula to evaluate.  The value shown will be the result of the formula.",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json"
            }
          }
        }
      }
    })
  })(TextPresenter);
}
//# sourceMappingURL=text.js.map
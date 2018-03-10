'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _content = require('./content');

var _content2 = _interopRequireDefault(_content);

var _presenter = require('./presenter');

var _presenter2 = _interopRequireDefault(_presenter);

var _refRange = require('./ref-range');

var _refRange2 = _interopRequireDefault(_refRange);

var _refCell = require('./ref-cell');

var _refCell2 = _interopRequireDefault(_refCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// we associate any special configurers with particular schema references
var configurersAndSchemasBySchemaURI = (0, _immutable.fromJS)({
  "http://sheetyapp.com/schemas/core-presenters/configurers/content.json": {
    configurer: _content2.default,
    linkable: true,
    schema: {
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/configurers/content.json",
      "title": "Rich content",
      "description": "Rich content",
      "type": "string"
    }
  },
  "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json": {
    configurer: _presenter2.default,
    linkable: false,
    schema: {
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
      "title": "Sheety App Presenter",
      "description": "Presenter to render at this location",
      "type": "object",
      "properties": {
        "id": {
          "title": "Presenter identifier",
          "description": "The identifier uniquely identifies this presenter and is used to record analytics events.",
          "type": "string"
        },
        "type": {
          "title": "Type of the presenter",
          "description": "The type of presenter this is.",
          "type": "string"
        },
        "mapDataQuery": {
          "title": "Map Data Formulas",
          "description": "Each value is treated as a formula that is evaluated against the spreadsheet.",
          "type": "object"
        },
        "arrayDataQuery": {
          "title": "Array Data Formulas",
          "description": "The value is treated as a formula that is evaluated against the spreadsheet.",
          "type": "string"
        },
        "config": {
          "title": "Config",
          "description": "The configuration for the presenter.",
          "type": "object"
        }
      }
    }
  },
  "http://sheetyapp.com/schemas/core-presenters/configurers/cell-range.json": {
    configurer: _refRange2.default,
    linkable: false,
    schema: {
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/configurers/cell-range.json",
      "title": "Range of cells",
      "description": "Range of spreadsheet cells",
      "type": "array",
      "items": {
        "type": "array"
      }
    }
  },
  "http://sheetyapp.com/schemas/core-presenters/configurers/cell.json": {
    configurer: _refCell2.default,
    linkable: false,
    schema: {
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/configurers/cell.json",
      "title": "A spreadsheet cell",
      "type": "string"
    }
  }
});

exports.default = configurersAndSchemasBySchemaURI;
//# sourceMappingURL=index.js.map
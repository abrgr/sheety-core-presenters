'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeBackgroundPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeBackgroundPresenter(presenter) {
  var BackgroundPresenter = function BackgroundPresenter(_ref) {
    var mapData = _ref.mapData,
        config = _ref.config,
        renderPresenter = _ref.renderPresenter;

    var presenter = config.get('presenter');
    var style = mapData.toJS();

    return _react2.default.createElement(
      'div',
      { style: style },
      presenter ? renderPresenter(['config', 'presenter'], presenter) : null
    );
  };

  return presenter({
    schema: (0, _immutable.fromJS)({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/view.json",
      "title": "View",
      "description": "View is a container for other presenters that allows extra styling.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "view",
          "default": "view"
        },
        "mapData": {
          "title": "Configuration",
          "description": "Pre-set values and formulas that will be evaluated against the spreadsheet that will determine the appearance and behavior of this presenter",
          "type": "object",
          "default": {},
          "properties": {
            "backgroundColor": {
              "title": "Background Color",
              "description": "Background color",
              "type": "string"
            },
            "color": {
              "title": "Color",
              "description": "Text color",
              "type": "string"
            },
            "borderRadius": {
              "title": "Border Radius",
              "description": "Pixel radius for rounded corners",
              "type": "string"
            },
            "width": {
              "title": "Width",
              "description": "Width in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            "height": {
              "title": "Height",
              "description": "Height in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            "textAlign": {
              "title": "Text Alignment",
              "description": "Horizontal text alignment",
              "default": "left",
              "type": "string",
              "enum": ["left", "center", "right"]
            },
            "marginTop": {
              "title": "Top Margin",
              "description": "Top margin in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            "marginBottom": {
              "title": "Bottom Margin",
              "description": "Bottom margin in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            "marginLeft": {
              "title": "Left Margin",
              "description": "Left margin in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            "marginRight": {
              "title": "Right Margin",
              "description": "Right margin in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            }
          }
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "presenter": {
              "title": "Presenter",
              "description": "Presenter to render within this view.",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
              "linkable": false
            }
          }
        }
      }
    })
  })(BackgroundPresenter);
}
//# sourceMappingURL=view.js.map
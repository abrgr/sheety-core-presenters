'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeLinkPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactRouterDom = require('react-router-dom');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeLinkPresenter(presenter) {
  var LinkPresenter = function LinkPresenter(_ref) {
    var config = _ref.config,
        mapData = _ref.mapData,
        renderPresenter = _ref.renderPresenter;

    var presenter = config.get('presenter');
    var url = mapData.get('url');
    var child = presenter ? renderPresenter(['config', 'presenter'], presenter) : null;
    var isExternalLink = _url2.default.parse(url).host;

    if (isExternalLink) {
      return _react2.default.createElement(
        'a',
        { href: url },
        child
      );
    }

    return _react2.default.createElement(
      _reactRouterDom.Link,
      { to: url },
      child
    );
  };

  return presenter({
    schema: (0, _immutable.fromJS)({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/link.json",
      "title": "Link",
      "description": "Internal or external links",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "link",
          "default": "link"
        },
        "mapData": {
          "title": "Configuration",
          "description": "Pre-set values and formulas that will be evaluated against the spreadsheet that will determine the appearance and behavior of this presenter",
          "type": "object",
          "default": {},
          "properties": {
            "url": {
              "title": "URL",
              "description": "The URL to link to.",
              "type": "string",
              "default": ""
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
              "description": "The presenter to render that, when clicked, will take the user to the specified URL.",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
              "linkable": false
            }
          }
        }
      }
    })
  })(LinkPresenter);
}
//# sourceMappingURL=link.js.map
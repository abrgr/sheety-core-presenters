'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeContentPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _sanitizer = require('../sanitizer');

var _sanitizer2 = _interopRequireDefault(_sanitizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeContentPresenter(presenter) {
  var ContentPresenter = function ContentPresenter(_ref) {
    var config = _ref.config;

    var content = config.get('content');
    var sanitizedContent = _sanitizer2.default.sanitize(content, uriRewriter);

    return _react2.default.createElement('div', {
      className: 'ql-editor',
      dangerouslySetInnerHTML: { __html: sanitizedContent } });
  };

  function uriRewriter(uri) {
    return uri; // TODO: apply some whitelisting, etc.
  }

  return presenter({
    schema: (0, _immutable.fromJS)({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/content.json",
      "title": "Content",
      "description": "The Content presenter allows you to embed rich text, images, and video into your Sheety App.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "content",
          "default": "content"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "content": {
              "title": "Content",
              "description": "Rich content",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/content.json"
            }
          }
        }
      }
    })
  })(ContentPresenter);
}
//# sourceMappingURL=content.js.map
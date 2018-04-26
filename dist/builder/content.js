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

var _content = require('../configurer/content');

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeContentPresenter(presenter) {
  var ContentPresenter = function ContentPresenter(_ref) {
    var mapData = _ref.mapData,
        isEditing = _ref.isEditing,
        encoders = _ref.encoders,
        decoders = _ref.decoders,
        onUpdate = _ref.onUpdate,
        path = _ref.path;

    var content = mapData.get('content');
    var sanitizedContent = _sanitizer2.default.sanitize(content, uriRewriter);

    if (isEditing) {
      return _react2.default.createElement(_content2.default, {
        value: content,
        encoders: encoders,
        decoders: decoders,
        onUpdate: onUpdate.bind(null, ['mapData', 'content']) });
    }

    return _react2.default.createElement(
      'div',
      {
        className: 'ql-snow' },
      _react2.default.createElement('div', {
        className: 'ql-editor',
        dangerouslySetInnerHTML: { __html: sanitizedContent } })
    );
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
        "mapData": {
          "title": "Configuration",
          "description": "Pre-set values and formulas that will be evaluated against the spreadsheet that will determine the appearance and behavior of this presenter",
          "type": "object",
          "default": {},
          "properties": {
            "content": {
              "title": "Content",
              "description": "Rich content",
              "default": "",
              "internallyConfigured": true,
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/content.json"
            }
          }
        }
      }
    })
  })(ContentPresenter);
}
//# sourceMappingURL=content.js.map
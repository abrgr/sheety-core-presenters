'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeContentPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

  return presenter()(ContentPresenter);
}
//# sourceMappingURL=content.js.map
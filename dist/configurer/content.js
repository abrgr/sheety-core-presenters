'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

require('quill/dist/quill.snow.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var value = _ref.value,
      encoders = _ref.encoders,
      decoders = _ref.decoders,
      onUpdate = _ref.onUpdate;
  return _react2.default.createElement(_reactQuill2.default, {
    value: decoders.string(true, value),
    modules: {
      toolbar: [[{ 'font': [] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], ['bold', 'italic', 'underline', 'strike'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], ['link', 'image', 'video'], ['clean']]
    },
    onChange: function onChange(html) {
      onUpdate(encoders.string(true, html));
    } });
};
//# sourceMappingURL=content.js.map
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
    configKeyDocs: new _immutable.Map({}),
    mapDataDocs: new _immutable.Map({
      text: 'Text to render'
    })
  })(TextPresenter);
}
//# sourceMappingURL=text.js.map
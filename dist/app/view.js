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
    var config = _ref.config,
        renderPresenter = _ref.renderPresenter;

    var presenter = config.get('presenter');
    var style = config.remove('presenter');

    return _react2.default.createElement(
      'div',
      { style: style.toJS() },
      presenter ? renderPresenter(presenter) : null
    );
  };

  return presenter({
    configKeyDocs: new _immutable.Map({
      backgroundColor: 'String background color suitable for css backgroundColor property',
      color: 'String color suitable for css color property',
      borderRadius: 'Border radius suitable for css border radius',
      width: 'Width of the cell',
      height: 'Height of the cell',
      minWidth: 'Minimum width of the cell',
      maxWidth: 'Maximum width of the cell',
      minHeight: 'Minimum height of the cell',
      maxHeight: 'Maximum height of the cell',
      textAlign: 'Text alignment of the cell',
      marginTop: 'Top margin',
      marginBottom: 'Bottom margin',
      marginLeft: 'Left margin',
      marginRight: 'Right margin',
      presenter: 'Inner presenter definition'
    })
  })(BackgroundPresenter);
}
//# sourceMappingURL=view.js.map
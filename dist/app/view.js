'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeBackgroundPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

  return presenter()(BackgroundPresenter);
}
//# sourceMappingURL=view.js.map
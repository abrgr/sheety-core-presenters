'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _delete = require('material-ui/svg-icons/action/delete');

var _delete2 = _interopRequireDefault(_delete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var schema = _ref.schema,
      path = _ref.path,
      presenter = _ref.presenter,
      onUpdate = _ref.onUpdate,
      onEditPresenter = _ref.onEditPresenter;

  var requiredProps = schema.getIn(path.slice(0, -1).concat('required'));
  var prop = path[path.length - 1];
  var deletable = presenter.getIn(path) && (!requiredProps || !requiredProps.includes(prop));
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_RaisedButton2.default, {
      label: 'Configure presenter',
      onClick: function onClick() {
        onEditPresenter(path);
      } }),
    deletable ? _react2.default.createElement(
      _IconButton2.default,
      {
        tooltip: 'Remove presenter',
        onClick: function onClick() {
          onUpdate(null);
        } },
      _react2.default.createElement(_delete2.default, null)
    ) : null
  );
};
//# sourceMappingURL=presenter.js.map
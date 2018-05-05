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

var _modeEdit = require('material-ui/svg-icons/editor/mode-edit');

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var value = _ref.value,
      schema = _ref.schema,
      path = _ref.path,
      presenter = _ref.presenter,
      onUpdate = _ref.onUpdate,
      onEditAction = _ref.onEditAction;

  var requiredProps = schema.getIn(path.slice(0, -1).concat('required'));
  var prop = path[path.length - 1];
  var deletable = presenter.getIn(path) && (!requiredProps || !requiredProps.includes(prop));

  if (value) {
    return _react2.default.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row'
        } },
      _react2.default.createElement(
        _IconButton2.default,
        {
          tooltip: 'Edit action',
          tooltipPosition: 'bottom-right',
          onClick: function onClick() {
            onEditAction(path);
          } },
        _react2.default.createElement(_modeEdit2.default, {
          color: _colors.cyanA700 })
      ),
      'Action set'
    );
  }

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_RaisedButton2.default, {
      label: 'Configure action',
      onClick: function onClick() {
        onEditAction(path);
      } })
  );
};
//# sourceMappingURL=action.js.map
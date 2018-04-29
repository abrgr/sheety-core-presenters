'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = makeGridPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _borderInner = require('material-ui/svg-icons/editor/border-inner');

var _borderInner2 = _interopRequireDefault(_borderInner);

var _equalPaths = require('./equal-paths');

var _equalPaths2 = _interopRequireDefault(_equalPaths);

require('bootstrap/dist/css/bootstrap-grid.css');

require('./grid-layout.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HorizontalResizer = function (_Component) {
  _inherits(HorizontalResizer, _Component);

  function HorizontalResizer(props) {
    _classCallCheck(this, HorizontalResizer);

    var _this = _possibleConstructorReturn(this, (HorizontalResizer.__proto__ || Object.getPrototypeOf(HorizontalResizer)).call(this, props));

    _this.onStartDrag = function (evt) {
      _this.setState({
        initialX: evt.nativeEvent.clientX,
        pxPerWidthUnit: evt.target.parentElement.clientWidth / _this.props.width
      });
    };

    _this.onDrag = function (evt) {
      var _this$state = _this.state,
          initialX = _this$state.initialX,
          pxPerWidthUnit = _this$state.pxPerWidthUnit;

      if (initialX === null) {
        return;
      }

      var x = evt.nativeEvent.clientX;
      var offset = x - initialX;
      if (Math.abs(offset) < pxPerWidthUnit / 2) {
        // we have not moved at least half a unit
        return;
      }

      var _this$props = _this.props,
          side = _this$props.side,
          canExpandLeft = _this$props.canExpandLeft,
          canExpandRight = _this$props.canExpandRight;


      if (side === 'left' && offset < 0 && !canExpandLeft) {
        // we're encroaching on our left neighbor and we can't expand in that direction
        return;
      }

      if (side === 'right' && offset > 0 && !canExpandRight) {
        // we're encroaching on our right neighbor and we can't expand in that direction
        return;
      }

      // we round to the nearest unit to avoid any weird jumps
      var roundedX = initialX + Math.round(offset / pxPerWidthUnit) * pxPerWidthUnit;
      _this.setState({
        initialX: roundedX
      }, function () {
        _this.props.onResize(offset, pxPerWidthUnit);
      });
    };

    _this.onEndDrag = function (evt) {
      _this.setState({
        initialX: null
      });
    };

    _this.state = {
      initialX: null,
      pxPerWidthUnit: null
    };
    return _this;
  }

  _createClass(HorizontalResizer, [{
    key: 'render',
    value: function render() {
      var initialX = this.state.initialX;

      var isResizing = initialX !== null;

      var side = this.props.side;

      var pos = side === 'right' ? { right: 0 } : { left: 0 };
      return _react2.default.createElement(
        'div',
        {
          onMouseDown: this.onStartDrag,
          onMouseUp: this.onEndDrag,
          style: _extends({
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 5,
            cursor: 'ew-resize'
          }, pos) },
        isResizing ? _react2.default.createElement('div', {
          onMouseMove: this.onDrag,
          style: {
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0)',
            opacity: '0',
            position: 'fixed',
            zIndex: '9999',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0'
          } }) : null
      );
    }
  }]);

  return HorizontalResizer;
}(_react.Component);

var Cell = function (_Component2) {
  _inherits(Cell, _Component2);

  function Cell(props) {
    _classCallCheck(this, Cell);

    var _this2 = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, props));

    _this2.onResize = function (side, movementX, pxPerWidthUnit) {
      var _this2$props = _this2.props,
          onAdjustWidth = _this2$props.onAdjustWidth,
          cell = _this2$props.cell;

      var sign = side === 'left' ? -1 : 1;
      var offset = sign * Math.round(movementX / pxPerWidthUnit);
      if (offset !== 0) {
        onAdjustWidth(side, offset);
      }
    };

    _this2.state = {
      isHovered: false
    };
    return _this2;
  }

  _createClass(Cell, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          canExpandLeft = _props.canExpandLeft,
          canExpandRight = _props.canExpandRight,
          selectedPath = _props.selectedPath,
          relativePath = _props.relativePath,
          path = _props.path,
          cell = _props.cell,
          isEditing = _props.isEditing,
          renderPresenter = _props.renderPresenter,
          onRemove = _props.onRemove,
          onSelectPresenterForEditing = _props.onSelectPresenterForEditing;

      var cellPresenter = cell.get('presenter');
      var width = cell.get('width');
      var isHovered = isEditing && this.state.isHovered;
      var shouldRenderPresenter = !!cellPresenter || !!selectedPath && (0, _equalPaths2.default)(path, selectedPath);

      return _react2.default.createElement(
        _Paper2.default,
        {
          zDepth: isHovered ? 2 : 0,
          style: {
            background: 'transparent',
            paddingLeft: 0,
            paddingRight: 0
          },
          onMouseMove: function onMouseMove(evt) {
            _this3.setState({
              isHovered: true
            });
          },
          onMouseOut: function onMouseOut(evt) {
            _this3.setState({
              isHovered: false
            });
          },
          className: 'col-' + width },
        _react2.default.createElement(HorizontalResizer, {
          canExpandLeft: canExpandLeft,
          canExpandRight: canExpandRight,
          width: width,
          side: 'left',
          onResize: this.onResize.bind(null, 'left') }),
        _react2.default.createElement(HorizontalResizer, {
          canExpandLeft: canExpandLeft,
          canExpandRight: canExpandRight,
          width: width,
          side: 'right',
          onResize: this.onResize.bind(null, 'right') }),
        _react2.default.createElement(_FlatButton2.default, {
          onClick: function onClick() {
            onRemove();
          },
          style: {
            transition: 'opacity 0.25s',
            opacity: isHovered ? 1 : 0,
            position: 'absolute',
            top: 0,
            right: 0,
            minWidth: 16,
            minHeight: 16,
            width: 16,
            height: 16,
            padding: 0,
            lineHeight: 0
          },
          labelStyle: {
            padding: 0
          },
          label: 'x' }),
        shouldRenderPresenter ? _react2.default.createElement(
          _FlatButton2.default,
          {
            onClick: function onClick(evt) {
              evt.stopPropagation();
              onSelectPresenterForEditing(path);
            },
            style: {
              transition: 'opacity 0.25s',
              opacity: isHovered ? 1 : 0,
              position: 'absolute',
              bottom: 0,
              right: 0,
              minWidth: 16,
              minHeight: 16,
              width: 16,
              height: 16,
              padding: 0,
              lineHeight: 0
            },
            labelStyle: {
              padding: 0
            } },
          _react2.default.createElement(_borderInner2.default, {
            style: {
              width: 16,
              height: 16
            } })
        ) : null,
        shouldRenderPresenter ? renderPresenter(relativePath, cellPresenter) : _react2.default.createElement(
          _FloatingActionButton2.default,
          {
            disabled: !isEditing,
            onClick: function onClick(evt) {
              evt.stopPropagation();
              onSelectPresenterForEditing(path);
            } },
          _react2.default.createElement(_borderInner2.default, null)
        )
      );
    }
  }]);

  return Cell;
}(_react.Component);

function makeGridPresenter(presenter) {
  var GridPresenter = function GridPresenter(_ref) {
    var selectedPath = _ref.selectedPath,
        isEditing = _ref.isEditing,
        _ref$config = _ref.config,
        config = _ref$config === undefined ? new _immutable.Map() : _ref$config,
        renderPresenter = _ref.renderPresenter,
        path = _ref.path,
        onUpdate = _ref.onUpdate,
        onSelectPresenterForEditing = _ref.onSelectPresenterForEditing;

    var rows = config.get('rows', new _immutable.List());

    return _react2.default.createElement(
      'div',
      {
        style: {
          paddingRight: 50
        } },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        rows.map(function (row, rowIdx) {
          var rowPath = ['config', 'rows', rowIdx];
          var totalWidth = row.reduce(function (sum, cell) {
            return sum + cell.get('width');
          }, 0);
          return _react2.default.createElement(
            'div',
            {
              key: 'row-' + rowIdx,
              style: {
                minHeight: 20,
                marginTop: 20,
                marginBottom: 20,
                position: 'relative'
              },
              className: 'row' },
            row.map(function (cell, cellIdx) {
              var presenterPath = rowPath.concat([cellIdx, 'presenter']);
              var canExpandLeft = cellIdx > 0 ? row.getIn([cellIdx - 1, 'width']) > 1 : false;
              var canExpandRight = totalWidth < 12 || cellIdx < row.size - 1 && row.getIn([cellIdx + 1, 'width']) > 1;

              return _react2.default.createElement(Cell, {
                key: 'cell-' + cellIdx,
                selectedPath: selectedPath,
                relativePath: presenterPath,
                path: path.concat(presenterPath),
                cell: cell,
                renderPresenter: renderPresenter,
                isEditing: isEditing,
                onSelectPresenterForEditing: onSelectPresenterForEditing,
                canExpandLeft: canExpandLeft,
                canExpandRight: canExpandRight,
                onAdjustWidth: function onAdjustWidth(side, change) {
                  var otherCellIdx = side === 'left' ? cellIdx - 1 : cellIdx + 1;
                  var nextRow = row.updateIn([cellIdx, 'width'], function (w) {
                    return Math.max(1, w + change);
                  });
                  if (otherCellIdx >= 0 && otherCellIdx < row.size) {
                    nextRow = nextRow.updateIn([otherCellIdx, 'width'], function (w) {
                      return Math.max(1, w - change);
                    });
                  }
                  var nextTotalWidth = nextRow.reduce(function (sum, cell) {
                    return sum + cell.get('width');
                  }, 0);
                  if (nextTotalWidth > 12) {
                    return;
                  }

                  onUpdate(rowPath, nextRow);
                },
                onRemove: function onRemove() {
                  onUpdate(rowPath, row.delete(cellIdx));
                } });
            }),
            isEditing && totalWidth < 12 ? _react2.default.createElement(
              'div',
              {
                style: {
                  position: 'absolute',
                  right: 0,
                  width: 50,
                  minWidth: 50,
                  height: '100%',
                  pointerEvents: 'none'
                } },
              _react2.default.createElement(_RaisedButton2.default, {
                primary: true,
                style: {
                  pointerEvents: 'auto',
                  position: 'absolute',
                  left: 70,
                  width: 50,
                  minWidth: 50,
                  height: '100%'
                },
                className: 'grid-layout-add-cell',
                label: '+',
                onClick: function onClick() {
                  onUpdate(rowPath, row.push(new _immutable.Map({
                    width: 1,
                    presenter: null
                  })));
                } })
            ) : null
          );
        })
      ),
      isEditing ? _react2.default.createElement(_RaisedButton2.default, {
        primary: true,
        fullWidth: true,
        style: {
          position: 'absolute',
          left: 0,
          right: 0
        },
        label: '+',
        onClick: function onClick() {
          onUpdate(['config', 'rows'], rows.push(new _immutable.List()));
        } }) : null
    );
  };

  return presenter({
    schema: (0, _immutable.fromJS)({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/grid-layout.json",
      "title": "Grid Layout",
      "description": "Grid Layout renders other presenters in a grid.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "grid-layout",
          "default": "grid-layout"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "rows": {
              "title": "Rows",
              "description": "Specifies a row of the grid.",
              "type": "array",
              "linkable": false,
              "internallyConfigured": true,
              "items": {
                "title": "Row",
                "type": "array",
                "linkable": false,
                "items": {
                  "title": "Cell",
                  "type": "object",
                  "default": {},
                  "linkable": false,
                  "properties": {
                    "width": {
                      "title": "Width",
                      "description": "Number of columns this presenter will occupy.",
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 12,
                      "linkable": false
                    },
                    "presenter": {
                      "title": "Presenter",
                      "description": "The presenter to render in this cell.",
                      "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
                      "linkable": false
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  })(GridPresenter);
}
//# sourceMappingURL=grid-layout.js.map
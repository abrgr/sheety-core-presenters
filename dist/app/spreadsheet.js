'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = makeSpreadsheetPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHandsontable = require('react-handsontable');

var _reactHandsontable2 = _interopRequireDefault(_reactHandsontable);

var _handsontable = require('handsontable');

var _handsontable2 = _interopRequireDefault(_handsontable);

var _immutable = require('immutable');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _sheetyModel = require('sheety-model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeSpreadsheetPresenter(presenter) {
  var Spreadsheet_ = function (_Component) {
    _inherits(Spreadsheet_, _Component);

    function Spreadsheet_(props) {
      _classCallCheck(this, Spreadsheet_);

      var _this = _possibleConstructorReturn(this, (Spreadsheet_.__proto__ || Object.getPrototypeOf(Spreadsheet_)).call(this, props));

      _this.onAfterChange = function (changes, sources) {
        var _this$props = _this.props,
            arrayDataQuery = _this$props.arrayDataQuery,
            setCellValues = _this$props.setCellValues,
            sheet = _this$props.sheet;

        var rangeRef = _sheetyModel.CellRefRange.fromA1Ref(arrayDataQuery);
        var upperLeft = rangeRef.get('start');
        var tabId = upperLeft.get('tabId');
        var upperLeftRow = upperLeft.get('rowIdx');
        var upperLeftCol = upperLeft.get('colIdx');
        setCellValues(new _immutable.Map(new _immutable.List(changes).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 4),
              rowIdx = _ref2[0],
              colIdx = _ref2[1],
              _ = _ref2[2],
              newVal = _ref2[3];

          var cellRef = new _sheetyModel.CellRef({
            tabId: tabId,
            rowIdx: upperLeftRow + rowIdx,
            colIdx: upperLeftCol + colIdx
          });
          var cell = sheet.getCell(cellRef);
          var format = cell && cell.get('format');
          return [cellRef, format ? format.fromUserEnteredValue(newVal) : newVal];
        })));
      };

      _this.mergeCells = function () {
        var config = _this.props.config;

        var merges = config && config.get('merges');
        return (merges || new _immutable.List()).map(function (a1) {
          var range = _sheetyModel.CellRefRange.fromA1Ref(a1);
          var startRow = range.getIn(['start', 'rowIdx']);
          var startCol = range.getIn(['start', 'colIdx']);
          var endRow = range.getIn(['end', 'rowIdx']);
          var endCol = range.getIn(['end', 'colIdx']);
          return {
            row: startRow,
            col: startCol,
            rowspan: endRow - startRow + 1,
            colspan: endCol - startCol + 1
          };
        }).toJS();
      };

      _this.getCellConfig = function (row, col) {
        var arrayCells = _this.props.arrayCells;

        var cell = arrayCells[row][col];

        return {
          readOnly: cell && cell.get('isUserEditable') ? false : true,
          renderer: _this.cellRenderer
        };
      };

      _this.cellRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        _handsontable2.default.renderers.TextRenderer.call(instance, instance, td, row, col, prop, value, cellProperties);

        var config = _this.props.config;

        var formatting = config && config.get('formatting');
        var format = formatting && formatting.find(function (format, a1Range) {
          return rangeContains(_sheetyModel.CellRefRange.fromA1Ref(a1Range), row, col);
        });

        if (format) {
          format.forEach(function (value, key) {
            td.style[key] = value;
          });
        }
      };

      _this.state = {
        id: 'sheet-' + _uuid2.default.v4()
      };
      return _this;
    }

    _createClass(Spreadsheet_, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            arrayData = _props.arrayData,
            config = _props.config;

        return _react2.default.createElement(_reactHandsontable2.default, {
          root: this.state.id,
          readOnly: true,
          data: arrayData,
          colHeaders: config.get('showColumnHeaders'),
          rowHeaders: config.get('showRowHeaders'),
          autoRowSize: true,
          stretchH: 'all',
          preventOverflow: 'horizontal',
          mergeCells: this.mergeCells(),
          afterChange: this.onAfterChange,
          cells: this.getCellConfig });
      }
    }]);

    return Spreadsheet_;
  }(_react.Component);

  function rangeContains(range, row, col) {
    return range.getIn(['start', 'rowIdx']) <= row && range.getIn(['end', 'rowIdx']) >= row && range.getIn(['start', 'colIdx']) <= col && range.getIn(['end', 'colIdx']) >= col;
  }

  return presenter({
    formatted: true,
    arrayDataDocs: 'An A1 reference to the data to show',
    configKeyDocs: new _immutable.Map({
      'formatting': 'Map from A1 range references to a map from css property name to value.',
      'merges': 'List of A1 ranges where the cells in each range will be merged.',
      'showColumnHeaders': 'Boolean indicating whether to show column headers.',
      'showRowHeaders': 'Boolean indicating whether to show row headers.'
    })
  })(Spreadsheet_);
}
//# sourceMappingURL=spreadsheet.js.map
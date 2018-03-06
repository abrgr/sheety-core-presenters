'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = makeRouterPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactRouterDom = require('react-router-dom');

var _sheetyModel = require('sheety-model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeRouterPresenter(presenter) {
  var RouterPresenter = function (_Component) {
    _inherits(RouterPresenter, _Component);

    function RouterPresenter() {
      _classCallCheck(this, RouterPresenter);

      return _possibleConstructorReturn(this, (RouterPresenter.__proto__ || Object.getPrototypeOf(RouterPresenter)).apply(this, arguments));
    }

    _createClass(RouterPresenter, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.updateParams({ match: {} }, this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.updateParams(this.props, nextProps);
      }
    }, {
      key: 'updateParams',
      value: function updateParams(curProps, nextProps) {
        var sheet = nextProps.sheet,
            setCellValues = nextProps.setCellValues;

        var prevPath = curProps.match.path;
        var nextPath = nextProps.match.path;
        var params = Object.keys(nextProps.params);
        var hasSetter = !!params.length;

        if (hasSetter && nextPath !== prevPath) {
          setCellValues(new _immutable.Map(params.map(function (param) {
            var cellRef = _sheetyModel.CellRef.fromA1Ref(param);
            if (!cellRef) {
              return null;
            }

            var value = nextProps.params[param];
            var cell = sheet.getCell(cellRef);
            var format = cell && cell.get('format');
            return [cellRef, format ? format.fromUserEnteredValue(value) : value];
          })));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            config = _props.config,
            renderPresenter = _props.renderPresenter;

        var routes = config.get('routes');

        return _react2.default.createElement(
          _reactRouterDom.BrowserRouter,
          null,
          _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            routes.map(function (presenter, route) {
              return _react2.default.createElement(_reactRouterDom.Route, {
                key: route,
                exact: true,
                path: route,
                render: renderPresenter.bind(null, presenter) });
            }).valueSeq()
          )
        );
      }
    }]);

    return RouterPresenter;
  }(_react.Component);

  ;

  return presenter()(RouterPresenter);
}
//# sourceMappingURL=router.js.map
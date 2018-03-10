'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = makeRequireAuthPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _Tabs = require('material-ui/Tabs');

var _firebaseui = require('firebaseui');

var _firebaseui2 = _interopRequireDefault(_firebaseui);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

require('firebaseui/dist/firebaseui.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeRequireAuthPresenter(presenter) {
  var RequireAuthPresenter = function (_Component) {
    _inherits(RequireAuthPresenter, _Component);

    function RequireAuthPresenter() {
      _classCallCheck(this, RequireAuthPresenter);

      return _possibleConstructorReturn(this, (RequireAuthPresenter.__proto__ || Object.getPrototypeOf(RequireAuthPresenter)).apply(this, arguments));
    }

    _createClass(RequireAuthPresenter, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            renderPresenter = _props.renderPresenter,
            config = _props.config;


        return _react2.default.createElement(
          _Tabs.Tabs,
          null,
          _react2.default.createElement(
            _Tabs.Tab,
            {
              label: 'Logged in' },
            renderPresenter(['config', 'presenter'], config.get('presenter'))
          ),
          _react2.default.createElement(
            _Tabs.Tab,
            {
              label: 'Not logged in' },
            config.get('signInContent') ? renderPresenter(['config', 'signInContent'], config.get('signInContent')) : null,
            config.get('providers', new _immutable.List()).filter(function (providerConfig) {
              return !!providerConfig;
            }).map(function (providerConfig) {
              return _react2.default.createElement(
                'p',
                null,
                'Sign in with ',
                providerConfig.get('provider'),
                '.'
              );
            })
          )
        );
      }
    }]);

    return RequireAuthPresenter;
  }(_react.Component);

  ;

  return presenter({
    schema: (0, _immutable.fromJS)({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/require-auth.json",
      "title": "Require Authentication",
      "description": "Shows an authentication prompt if not logged in; shows the provided presenter otherwise.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "require-auth",
          "default": "require-auth"
        },
        "mapData": {
          "title": "Configuration",
          "description": "Pre-set values and formulas that will be evaluated against the spreadsheet that will determine the appearance and behavior of this presenter",
          "type": "object",
          "default": {},
          "properties": {
            "usePopup": {
              "title": "Use popup",
              "description": "Should we use a popup for sign in?",
              "type": "boolean",
              "default": false
            }
          }
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "presenter": {
              "title": "Presenter",
              "description": "The presenter to render if the user is already authenticated.",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
              "linkable": false
            },
            "signInContent": {
              "title": "Sign in content",
              "description": "The presenter to render above the sign in",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
              "linkable": false
            },
            "providers": {
              "title": "Log in providers",
              "type": "array",
              "default": [],
              "items": {
                "title": "Log in provider",
                "type": "object",
                "default": {},
                "linkable": false,
                "properties": {
                  "provider": {
                    "title": "Provider",
                    "type": "string",
                    "enum": ["google", "facebook", "twitter", "github", "email"],
                    "linkable": false
                  }
                }
              }
            }
          }
        }
      }
    })
  })(RequireAuthPresenter);
}
//# sourceMappingURL=require-auth.js.map
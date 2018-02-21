'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = makeRequireAuthPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _firebaseui = require('firebaseui');

var _firebaseui2 = _interopRequireDefault(_firebaseui);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

require('firebaseui/dist/firebaseui.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeRequireAuthPresenter(presenter, deps) {
  var firebasePromise = deps.firebasePromise;
  if (!firebasePromise) {
    return function () {
      throw new Error('RequireAuthPresenter requires a firebasePromise dependency.  It should only be resolved once we have an auth state.');
    };
  }

  var RequireAuthPresenter = function (_Component) {
    _inherits(RequireAuthPresenter, _Component);

    function RequireAuthPresenter(props) {
      _classCallCheck(this, RequireAuthPresenter);

      var _this = _possibleConstructorReturn(this, (RequireAuthPresenter.__proto__ || Object.getPrototypeOf(RequireAuthPresenter)).call(this, props));

      _this.authenticated = function () {
        _this.setState({
          isAuthed: true
        });
      };

      _this.isAuthenticated = function (auth) {
        return (
          // TODO: check roles, etc.
          auth.currentUser && !auth.currentUser.isAnonymous
        );
      };

      _this.state = {
        id: 'auth-' + _uuid2.default.v4(), // element ids must start with a letter
        isAuthed: false
      };
      return _this;
    }

    _createClass(RequireAuthPresenter, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        firebasePromise.then(function (firebase) {
          var auth = firebase.auth();
          if (_this2.isAuthenticated(auth)) {
            return _this2.authenticated();
          }

          // not authenticated yet
          var ui = new _firebaseui2.default.auth.AuthUI(auth);
          ui.start('#' + _this2.state.id, {
            autoUpgradeAnonymousUsers: true,
            signInSuccessUrl: window.location.href,
            tosUrl: 'https://ezbds.com',
            signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, {
              provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
            }],
            callbacks: {
              signInSuccess: function signInSuccess(user, cred, redirectUrl) {
                if (cred && cred.providerId === 'google.com') {
                  // cred.accessToken is the google oauth access token
                }

                _this2.authenticated();

                return true;
              },
              signInFailure: function signInFailure(err) {
                if (err.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
                  return Promise.resolve();
                }

                var anonymousUser = auth.currentUser;
                var cred = err.credential;

                // TODO: actually copy data per https://github.com/firebase/firebaseui-web#using-firebaseui-for-authentication

                return auth.signInWithCredential(cred).then(function (_) {
                  return anonymousUser.delete();
                }).then(function (_) {
                  return _this2.authenticated();
                });
              }
            }
          });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            id = _state.id,
            isAuthed = _state.isAuthed;


        if (isAuthed) {
          var _props = this.props,
              renderPresenter = _props.renderPresenter,
              config = _props.config;

          return renderPresenter(config.get('presenter'));
        }

        return _react2.default.createElement('div', { id: id });
      }
    }]);

    return RequireAuthPresenter;
  }(_react.Component);

  ;

  return presenter({
    configKeyDocs: new _immutable.Map({
      presenter: 'Inner presenter definition'
    })
  })(RequireAuthPresenter);
}
//# sourceMappingURL=require-auth.js.map
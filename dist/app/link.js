'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeLinkPresenter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactRouterDom = require('react-router-dom');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeLinkPresenter(presenter) {
  var LinkPresenter = function LinkPresenter(_ref) {
    var config = _ref.config,
        mapData = _ref.mapData,
        renderPresenter = _ref.renderPresenter;

    var presenter = config.get('presenter');
    var url = mapData.get('url');
    var child = presenter ? renderPresenter(presenter) : null;
    var isExternalLink = _url2.default.parse(url).host;

    if (isExternalLink) {
      return _react2.default.createElement(
        'a',
        { href: url },
        child
      );
    }

    return _react2.default.createElement(
      _reactRouterDom.Link,
      { to: url },
      child
    );
  };

  return presenter({
    configKeyDocs: new _immutable.Map({
      presenter: 'Inner presenter definition'
    }),
    mapDataDocs: new _immutable.Map({
      url: 'URL to link to'
    })
  })(LinkPresenter);
}
//# sourceMappingURL=link.js.map
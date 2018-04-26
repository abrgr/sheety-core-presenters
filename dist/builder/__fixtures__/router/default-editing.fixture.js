'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'Builders',
  component: _router2.default,
  props: {
    onUpdate: function onUpdate() {},
    isEditing: true,
    renderPresenter: function renderPresenter(path) {
      return _react2.default.createElement(
        'p',
        {
          style: {
            textAlign: 'center',
            border: '1px solid black'
          } },
        'Hi ',
        path.join('/')
      );
    },
    path: ['router'],
    config: {
      routes: [{
        path: '/',
        presenter: {}
      }, {
        path: '/abc',
        presenter: null
      }]
    }
  }
};
//# sourceMappingURL=default-editing.fixture.js.map
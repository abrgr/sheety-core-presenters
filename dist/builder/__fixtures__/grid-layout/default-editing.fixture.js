'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gridLayout = require('./grid-layout');

var _gridLayout2 = _interopRequireDefault(_gridLayout);

var _formulaCoders = require('../formula-coders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'Builders',
  component: _gridLayout2.default,
  props: {
    encoders: _formulaCoders.encoders,
    decoders: _formulaCoders.decoders,
    onUpdate: function onUpdate() {
      console.log('update');
    },
    onSelectPresenterForEditing: function onSelectPresenterForEditing() {
      console.log('select presenter');
    },
    isEditing: true,
    path: ['grid'],
    mapData: {},
    config: {
      rows: [[{
        width: 2,
        presenter: {}
      }, {
        width: 8,
        presenter: {}
      }, {
        width: 2,
        presenter: null
      }]]
    },
    renderPresenter: function renderPresenter() {
      return _react2.default.createElement(
        'p',
        {
          style: {
            textAlign: 'center',
            border: '1px solid black'
          } },
        'Hi'
      );
    }
  }
};
//# sourceMappingURL=default-editing.fixture.js.map
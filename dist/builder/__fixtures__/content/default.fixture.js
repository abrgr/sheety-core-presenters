'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _content = require('./content');

var _content2 = _interopRequireDefault(_content);

var _formulaCoders = require('../formula-coders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'Builders',
  component: _content2.default,
  props: {
    encoders: _formulaCoders.encoders,
    decoders: _formulaCoders.decoders,
    onUpdate: function onUpdate() {},
    isEditing: false,
    mapData: {
      content: '<strong>hello</strong> world'
    }
  }
};
//# sourceMappingURL=default.fixture.js.map
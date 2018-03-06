'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (presenter) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var presenters = {
    Spreadsheet: (0, _spreadsheet2.default)(presenter, deps),
    GridLayout: (0, _gridLayout2.default)(presenter, deps),
    View: (0, _view2.default)(presenter, deps),
    Text: (0, _text2.default)(presenter, deps),
    Link: (0, _link2.default)(presenter, deps),
    Router: (0, _router2.default)(presenter, deps),
    RequireAuth: (0, _requireAuth2.default)(presenter, deps),
    Content: (0, _content2.default)(presenter, deps),
    Select: (0, _select2.default)(presenter, deps),
    Input: (0, _input2.default)(presenter, deps)
  };

  var presenterRegistry = deps.presenterRegistry;

  if (presenterRegistry) {
    presenterRegistry('spreadsheet', presenters.Spreadsheet);
    presenterRegistry('grid-layout', presenters.GridLayout);
    presenterRegistry('view', presenters.View);
    presenterRegistry('text', presenters.Text);
    presenterRegistry('link', presenters.Link);
    presenterRegistry('router', presenters.Router);
    presenterRegistry('require-auth', presenters.RequireAuth);
    presenterRegistry('content', presenters.Content);
    presenterRegistry('select', presenters.Select);
    presenterRegistry('input', presenters.Input);
  }

  return presenters;
};

var _spreadsheet = require('./spreadsheet');

var _spreadsheet2 = _interopRequireDefault(_spreadsheet);

var _gridLayout = require('./grid-layout');

var _gridLayout2 = _interopRequireDefault(_gridLayout);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _requireAuth = require('./require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _content = require('./content');

var _content2 = _interopRequireDefault(_content);

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map
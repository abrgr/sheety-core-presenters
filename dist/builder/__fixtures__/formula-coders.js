'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var encoders = exports.encoders = {
  string: function string(isLinkable, str) {
    return isLinkable ? '"' + str.replace(/"/g, '"&char(34)&"') + '"' : str;
  },
  bool: function bool(isLinkable, b) {
    return isLinkable ? !!b ? 'true' : 'false' : b;
  },
  int: function int(isLinkable, i) {
    return isLinkable ? '' + i : i;
  }
};

var decoders = exports.decoders = {
  string: function string(isLinkable, formula) {
    return isLinkable ? ('' + formula).replace(/"&char\(34\)&"/g, '"').replace(/^"/, '').replace(/"$/, '') : formula;
  },
  bool: function bool(isLinkable, formula) {
    return isLinkable ? ('' + formula).toLowerCase() === 'true' : formula;
  },
  int: function int(isLinkable, formula) {
    return isLinkable ? parseInt('' + formula, 10) : formula;
  }
};
//# sourceMappingURL=formula-coders.js.map
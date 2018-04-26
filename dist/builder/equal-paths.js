"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = equalPaths;
function equalPaths(path, selectedPath) {
  if (!path ^ selectedPath || path.length !== selectedPath.length) {
    return false;
  }

  return path.every(function (p, idx) {
    return p === selectedPath[idx];
  });
}
//# sourceMappingURL=equal-paths.js.map
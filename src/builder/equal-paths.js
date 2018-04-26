export default function equalPaths(path, selectedPath) {
  if ( (!path ^ selectedPath)
      || path.length !== selectedPath.length ) {
    return false;
  }

  return path.every((p, idx) => p === selectedPath[idx]);
}

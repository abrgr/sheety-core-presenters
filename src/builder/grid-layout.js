import React from 'react';
import { Map, List } from 'immutable';

export default function makeGridPresenter(presenter) {
  const GridPresenter = ({
    config = new Map(),
    renderPresenter,
    path,
    onSelectPresenterForEditing
  }) => {
    const rows = config.get('rows', new List());

    return (
      <div className="container">
        {rows.map((row, rowIdx) => (
          <div
            key={`row-${rowIdx}`}
            style={{marginTop: 20, marginBottom: 20}}
            className="row">
            {row.map((cell, cellIdx) => {
              const cellPath = path.concat(['config', 'rows', rowIdx, cellIdx, 'presenter']);
              const cellPresenter = cell.get('presenter');

              return (
                <div
                  key={`cell-${cellIdx}`}
                  className={`col-${cell.get('width')}`}>
                  {!!cellPresenter
                    ? renderPresenter(cellPath, cellPresenter)
                    : (
                      <button
                        onClick={(evt) => {
                          evt.stopPropagation();
                          onSelectPresenterForEditing(cellPath);
                        }}>
                        Set presenter
                      </button>
                    )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return presenter({
    configKeyDocs: new Map({
      rows: 'rows is an iterable of row iterables.  Each row iterable is composed of cell descriptors.  Each cell descriptor is an object/map like { width, presenter }, where width is a value from 1-12 and presenter is a presenter definition.'
    })
  })(GridPresenter);
}

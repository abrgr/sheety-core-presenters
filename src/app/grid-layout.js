import React from 'react';
import { Map } from 'immutable';

export default function makeGridPresenter(presenter) {
  const GridPresenter = ({ config, renderPresenter }) => {
    const rows = config.get('rows');

    return (
      <div className="container">
        {rows.map((row, rowIdx) => (
          <div
            key={`row-${rowIdx}`}
            style={{marginTop: 20, marginBottom: 20}}
            className="row">
            {row.map((cell, cellIdx) => (
              <div
                key={`cell-${cellIdx}`}
                className={`col-${cell.get('width')}`}>
                {cell.has('presenter') ? renderPresenter(cell.get('presenter')) : null}
              </div>
            ))}
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

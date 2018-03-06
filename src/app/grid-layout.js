import React from 'react';
import { Map, List } from 'immutable';

export default function makeGridPresenter(presenter) {
  const GridPresenter = ({ config = new Map(), renderPresenter }) => {
    const rows = config.get('rows', new List());

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
                {!!cell.get('presenter')
                  ? renderPresenter(cell.get('presenter'))
                  : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return presenter()(GridPresenter);
}

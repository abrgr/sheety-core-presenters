import React from 'react';
import { fromJS, Map, List } from 'immutable';

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
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/grid-layout.json",
      "title": "Grid Layout",
      "description": "Grid Layout renders other presenters in a grid.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "grid-layout",
          "default": "grid-layout"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "rows": {
              "title": "Rows",
              "description": "Specifies a row of the grid.",
              "type": "array",
              "linkable": false,
              "items": {
                "title": "Row",
                "type": "array",
                "linkable": false,
                "items": {
                  "title": "Cell",
                  "type": "object",
                  "default": {},
                  "linkable": false,
                  "properties": {
                    "width": {
                      "title": "Width",
                      "description": "Number of columns this presenter will occupy.",
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 12,
                      "linkable": false
                    },
                    "presenter": {
                      "title": "Presenter",
                      "description": "The presenter to render in this cell.",
                      "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
                      "linkable": false
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  })(GridPresenter);
}

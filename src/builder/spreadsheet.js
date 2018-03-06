import React, { Component } from 'react';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Map, List, fromJS } from 'immutable';
import uuid from 'uuid';
import { CellRef, CellRefRange } from 'sheety-model';

export default function makeSpreadsheetPresenter(presenter) {
  class Spreadsheet_ extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: `sheet-${uuid.v4()}`
      };
    }

    render() {
      const { arrayData, config } = this.props;
      return (
        <HotTable
          root={this.state.id}
          readOnly={true}
          data={!!arrayData && arrayData.length
                  ? arrayData
                  : [[]]}
          colHeaders={config.get('showColumnHeaders')}
          rowHeaders={config.get('showRowHeaders')}
          autoRowSize={true}
          stretchH="all"
          preventOverflow="horizontal"
          mergeCells={this.mergeCells()}
          afterChange={this.onAfterChange}
          cells={this.getCellConfig} />
      );
    }

    onAfterChange = (changes, source) => {
      if ( source === 'loadData' ) {
        return;
      }

      const { arrayDataQuery, setCellValues, sheet } = this.props;
      const rangeRef = CellRefRange.fromA1Ref(arrayDataQuery);
      const upperLeft = rangeRef.get('start');
      const tabId = upperLeft.get('tabId');
      const upperLeftRow = upperLeft.get('rowIdx');
      const upperLeftCol = upperLeft.get('colIdx');
      setCellValues(
        new Map(
          new List(changes).map(([rowIdx, colIdx, _, newVal]) => {
            const cellRef = new CellRef({
              tabId,
              rowIdx: upperLeftRow + rowIdx,
              colIdx: upperLeftCol + colIdx
            });
            const cell = sheet.getCell(cellRef);
            const format = cell && cell.get('format');
            return [
              cellRef,
              format ? format.fromUserEnteredValue(newVal) : newVal
            ];
          })
        )
      );
    };

    mergeCells = () => {
      const { config } = this.props;
      const merges = config && config.get('merges');
      return (merges || new List())
        .map(a1 => CellRefRange.fromA1Ref(a1))
        .filter(range => !!range)
        .map(range => {
          const startRow = range.getIn(['start', 'rowIdx']);
          const startCol = range.getIn(['start', 'colIdx']);
          const endRow = range.getIn(['end', 'rowIdx']);
          const endCol = range.getIn(['end', 'colIdx']);
          return {
            row: startRow,
            col: startCol,
            rowspan: endRow - startRow + 1,
            colspan: endCol - startCol + 1
          };
        }).toJS();
    };

    getCellConfig = (row, col) => {
      const { config } = this.props;
      const userEditableRanges = config ? config.get('userEditableRanges', new List()) : new List();
      const isUserEditable = userEditableRanges.filter(a1 => !!a1).some(a1 => {
        if ( a1.indexOf(':') > 0 ) {
          const range = CellRefRange.fromA1Ref(a1);
          return !!range && rangeContains(range, row, col);
        }

        const ref = CellRef.fromA1Ref(a1);
        return !!ref && ref.get('rowIdx') === row && ref.get('colIdx') === col;
      });

      return {
        readOnly: !isUserEditable,
        renderer: this.cellRenderer
      };
    };

    cellRenderer = (instance, td, row, col, prop, value, cellProperties) => {
      Handsontable.renderers.TextRenderer.call(instance, instance, td, row, col, prop, value, cellProperties);

      const { config } = this.props;
      const formatting = config && config.get('formatting');
      const format = formatting && formatting.filter(f => !!f).find(format => {
        const range = CellRefRange.fromA1Ref(format.get('range'));
        return !!range && rangeContains(range, row, col);
      });

      if ( format && !!format.get('style') ) {
        format.get('style').forEach((value, key) => {
          td.style[key] = value;
        });
      }
    }
  }

  function rangeContains(range, row, col) {
    return range.getIn(['start', 'rowIdx']) <= row
        && range.getIn(['end', 'rowIdx']) >= row
        && range.getIn(['start', 'colIdx']) <= col
        && range.getIn(['end', 'colIdx']) >= col;
  }

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/spreadsheet.json",
      "title": "Spreadsheet",
      "description": "Spreadsheet view of a portion of the underlying spreadsheet that allows restricted editing.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "spreadsheet",
          "default": "spreadsheet"
        },
        "arrayData": {
          "title": "Array data",
          "description": "An A1 reference to the data to fill the spreadsheet with.",
          "default": "",
          "type": "string"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "formatting": {
              "title": "Formatting",
              "description": "Map from A1 range references that are relative to the upper-left corner of this view of the spreadsheet to a map from style properties to their values.",
              "type": "array",
              "items": {
                "title": "Format",
                "type": "object",
                "properties": {
                  "range": {
                    "title": "Range reference",
                    "description": "A1 range reference (relative to upper-left of array data)",
                    "type": "string",
                  },
                  "style": {
                    "title": "Style",
                    "description": "The style for the range of cells",
                    "type": "object",
                    "properties": {
                      "backgroundColor": {
                        "title": "Background color",
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "merges": {
              "title": "Merges",
              "description": "List of A1 ranges to merge.",
              "type": "array",
              "items": {
                "title": "A1 range",
                "description": "A1 range to merge (e.g. A1:B7)",
                "type": "string"
              }
            },
            "showColumnHeaders": {
              "title": "Show Column Headers",
              "description": "Should we show column headers (e.g. A, B, C, ...)?",
              "default": false,
              "type": "boolean"
            },
            "showRowHeaders": {
              "title": "Show Row Headers",
              "description": "Should we show row headers (e.g. 1, 2, 3, ...)?",
              "default": false,
              "type": "boolean"
            },
            "userEditableRanges": {
              "title": "User editable ranges",
              "description": "Which ranges are users able to edit",
              "default": [],
              "type": "array",
              "items": {
                "title": "User editable range",
                "description": "A1 range reference (relative to upper-left of array data)",
                "type": "string",
                "default": ""
              }
            }
          }
        }
      }
    })
  })(Spreadsheet_);
}

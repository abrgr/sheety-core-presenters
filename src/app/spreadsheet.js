import React, { Component } from 'react';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Map, List } from 'immutable';
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
          data={arrayData}
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

      if ( !rangeRef ) {
        return;
      }

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
      return (merges || new List()).map(a1 => {
         const range = CellRefRange.fromA1Ref(a1);
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
      const isUserEditable = userEditableRanges.some(range => {
        if ( range.indexOf(':') > 0 ) {
          return rangeContains(CellRefRange.fromA1Ref(range), row, col);
        }

        const ref = CellRef.fromA1Ref(range);
        return ref.get('rowIdx') === row && ref.get('colIdx') === col;
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
      const format = formatting && formatting.find(format => {
        const range = CellRefRange.fromA1Ref(format.get('range'));
        return range && rangeContains(range, row, col)
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
    formatted: true
  })(Spreadsheet_);
}

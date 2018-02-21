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

    onAfterChange = (changes, sources) => {
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
      const { arrayCells } = this.props;
      const cell = arrayCells[row][col];

      return {
        readOnly: cell && cell.get('isUserEditable') ? false : true,
        renderer: this.cellRenderer
      };
    };

    cellRenderer = (instance, td, row, col, prop, value, cellProperties) => {
      Handsontable.renderers.TextRenderer.call(instance, instance, td, row, col, prop, value, cellProperties);

      const { config } = this.props;
      const formatting = config && config.get('formatting');
      const format = formatting && formatting.find((format, a1Range) => (
        rangeContains(CellRefRange.fromA1Ref(a1Range), row, col)
      ));

      if ( format ) {
        format.forEach((value, key) => {
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
    formatted: true,
    arrayDataDocs: 'An A1 reference to the data to show',
    configKeyDocs: new Map({
      'formatting': 'Map from A1 range references to a map from css property name to value.',
      'merges': 'List of A1 ranges where the cells in each range will be merged.',
      'showColumnHeaders': 'Boolean indicating whether to show column headers.',
      'showRowHeaders': 'Boolean indicating whether to show row headers.'
    })
  })(Spreadsheet_);
}

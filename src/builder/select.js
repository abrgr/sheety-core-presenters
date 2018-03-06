import React from 'react';
import { fromJS } from 'immutable';

export default function makeSelectPresenter(presenter) {
  const SelectPresenter = ({ config, mapData, calc, setCellValues }) => {
    const valueCell = config.get('value');
    const options = mapData.get('options', []);
    const value = calc.evaluateFormula(valueCell);

    return (
      <select
        onChange={(evt) => {
          const cellRef = CellRef.fromA1Ref(valueCell)
          const cell = sheet.getCell(cellRef);
          const format = cell && cell.get('format');
          setCellValues(new Map([
            [
              cellRef,
              format ? format.fromUserEnteredValue(evt.target.value) : newVal
            ]
          ]))
        }}
        value={value}>
        {options.map(([optionValue, optionLabel]) => (
          <option
            value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    );
  };

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/select.json",
      "title": "Text",
      "description": "The Select Presenter allows you to show users a dropdown with options populated from your spreadsheet and a selected value that is synced to a cell in your spreadsheet.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "select",
          "default": "select"
        },
        "mapData": {
          "title": "Options",
          "description": "Formulas that will be evaluated against the spreadsheet",
          "type": "object",
          "default": {},
          "properties": {
            "options": {
              "title": "Options",
              "description": "The result of this formula should be a 2-dimensional values and corresponding labels.",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json"
            }
          }
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "value": {
              "title": "Value",
              "description": "The cell to read and write the selected value to.",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json"
            }
          }
        }
      }
    })
  })(SelectPresenter);
}

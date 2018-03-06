import React from 'react';
import { fromJS } from 'immutable';

export default function makeInputPresenter(presenter) {
  const InputPresenter = ({ config, mapData, calc, setCellValues }) => {
    const valueCell = config.get('value');
    const value = calc.evaluateFormula(valueCell);
    const inputType = config.get('inputType');

    return (
      <input
        onChange={(evt) => {
          const cellRef = CellRef.fromA1Ref(valueCell)
          const cell = sheet.getCell(cellRef);
          const format = cell && cell.get('format');
          setCellValues(new Map([
            [
              CellRef.of(valueCell),
              format ? format.fromUserEnteredValue(evt.target.value) : newVal
            ]
          ]))
        }}
        value={value}
        type={inputType} />
    );
  };

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/input.json",
      "title": "Text",
      "description": "The Input Presenter allows you to show users an input box with a value that is synced to a cell in your spreadsheet.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "input",
          "default": "input"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "value": {
              "title": "Value",
              "description": "The cell to read and write the value to.",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json"
            },
            "inputType": {
              "title": "Input Type",
              "description": "The type of input to provide",
              "default": "text",
              "type": "string",
              "enum": ["text", "password", "date", "color", "datetime-local", "email", "number", "tel", "time", "url"]
            }
          }
        }
      }
    })
  })(SelectPresenter);
}

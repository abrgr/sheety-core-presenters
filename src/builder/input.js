import React from 'react';
import { fromJS } from 'immutable';

export default function makeInputPresenter(presenter) {
  const InputPresenter = ({ mapData, mapDataQuery, setCellValues }) => {
    const value = mapData.get('value');
    const inputType = mapData.get('inputType');
    const valueCell = mapDataQuery.get('value');

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
      "title": "Input",
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
        "mapData": {
          "title": "Options",
          "description": "Formulas that will be evaluated against the spreadsheet",
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
  })(InputPresenter);
}

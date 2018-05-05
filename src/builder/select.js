import React from 'react';
import { fromJS } from 'immutable';

export default function makeSelectPresenter(presenter) {
  const SelectPresenter = ({ mapData, mapDataQuery, setCellValues }) => {
    const value = mapData.get('value', null);
    const mapOptions = mapData.get('options', []);
    // so we can handle errors in sheets
    const options = Array.isArray(mapOptions) ? mapOptions : [];
    const valueCell = mapDataQuery.get('value', '');

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
      "title": "Select",
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
              "description": "Values and labels for all presented options",
              "default": [],
              "type": "array",
              "items": {
                "type": "array",
                "items": [
                  {
                    "title": "Option value",
                    "description": "When this option is selected, this is the value that will be used",
                    "type": "string"
                  },
                  {
                    "title": "Option label",
                    "description": "This is the label shown to the user for this option",
                    "type": "string"
                  }
                ]
              }
            },
            "value": {
              "title": "Value",
              "description": "The cell to read and write the selected value to.",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/cell.json"
            }
          }
        }
      }
    })
  })(SelectPresenter);
}

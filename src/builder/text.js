import React from 'react';
import { fromJS } from 'immutable';

export default function makeTextPresenter(presenter) {
  const TextPresenter = ({ mapData }) => {
    const text = mapData.get('text');

    return (
      <p>
        {text}
      </p>
    );
  };

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/text.json",
      "title": "Text",
      "description": "The Text presenter allows you to embed the result of a spreadsheet formula into your Sheety App",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "text",
          "default": "text"
        },
        "mapData": {
          "title": "Spreadsheet data",
          "description": "Formulas that will be evaluated against the spreadsheet",
          "type": "object",
          "default": {},
          "properties": {
            "text": {
              "title": "Text",
              "description": "The formula to evaluate.  The value shown will be the result of the formula.",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json"
            }
          }
        }
      }
    })
  })(TextPresenter);
}

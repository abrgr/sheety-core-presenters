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
          "title": "Configuration",
          "description": "Pre-set values and formulas that will be evaluated against the spreadsheet that will determine the appearance and behavior of this presenter",
          "type": "object",
          "default": {},
          "properties": {
            "text": {
              "title": "Content",
              "description": "The content to show",
              "default": "",
              "type": "string"
            }
          }
        }
      }
    })
  })(TextPresenter);
}

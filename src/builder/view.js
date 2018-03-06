import React from 'react';
import { fromJS } from 'immutable';

export default function makeBackgroundPresenter(presenter) {
  const BackgroundPresenter = ({ config, renderPresenter }) => {
    const presenter = config.get('presenter');
    const style = config.remove('presenter');

    return (
      <div style={style.toJS()}>
        {presenter ? renderPresenter(['config', 'presenter'], presenter) : null}
      </div>
    );
  };

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/view.json",
      "title": "View",
      "description": "View is a container for other presenters that allows extra styling.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "view",
          "default": "view"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            backgroundColor: {
              "title": "Background Color",
              "description": "Background color",
              "type": "string"
            },
            color: {
              "title": "Color",
              "description": "Text color",
              "type": "string"
            },
            borderRadius: {
              "title": "Border Radius",
              "description": "Pixel radius for rounded corners",
              "type": "string"
            },
            width: {
              "title": "Width",
              "description": "Width in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            height: {
              "title": "Height",
              "description": "Height in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            textAlign: {
              "title": "Text Alignment",
              "description": "Horizontal text alignment",
              "default": "left",
              "type": "string",
              "enum": ["left", "center", "right"]
            },
            marginTop: {
              "title": "Top Margin",
              "description": "Top margin in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            marginBottom: {
              "title": "Bottom Margin",
              "description": "Bottom margin in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            marginLeft: {
              "title": "Left Margin",
              "description": "Left margin in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            marginRight: {
              "title": "Right Margin",
              "description": "Right margin in pixels",
              "type": "integer",
              "minimum": 0,
              "maximum": 2000
            },
            presenter: {
              "title": "Presenter",
              "description": "Presenter to render within this view.",
              "$comment": "URL",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json"
            }
          }
        }
      }
    })
  })(BackgroundPresenter);
}

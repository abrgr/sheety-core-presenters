import { fromJS } from 'immutable';
import Content from './content';
import Formula from './formula';
import Presenter from './presenter';

// we associate any special configurers with particular schema references
const configurersAndSchemasBySchemaURI = fromJS({
  "http://sheetyapp.com/schemas/core-presenters/configurers/content.json": {
    configurer: Content,
    schema: {
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/configurers/content.json",
      "title": "Rich content",
      "description": "Rich content",
      "type": "string"
    }
  },
  "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json": {
    configurer: Formula,
    schema: {
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/configurers/formula.json",
      "title": "Spreadsheet formula to evaluate",
      "description": "Spreadsheet formula to evaluate",
      "type": "string"
    }
  },
  "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json": {
    configurer: Presenter,
    schema: {
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
      "title": "Sheety App Presenter",
      "description": "Presenter to render at this location",
      "type": "object",
      "properties": {
        "id": {
          "title": "Presenter identifier",
          "description": "The identifier uniquely identifies this presenter and is used to record analytics events.",
          "type": "string"
        },
        "type": {
          "title": "Type of the presenter",
          "description": "The type of presenter this is.",
          "type": "string"
        },
        "mapDataQuery": {
          "title": "Map Data Formulas",
          "description": "Each value is treated as a formula that is evaluated against the spreadsheet.",
          "type": "object"
        },
        "arrayDataQuery": {
          "title": "Array Data Formulas",
          "description": "The value is treated as a formula that is evaluated against the spreadsheet.",
          "type": "string"
        },
        "config": {
          "title": "Config",
          "description": "The configuration for the presenter.",
          "type": "object"
        }
      }
    }
  }
});

export default configurersAndSchemasBySchemaURI;

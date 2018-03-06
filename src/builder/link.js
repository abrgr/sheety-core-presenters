import React from 'react';
import { fromJS } from 'immutable';
import { Link } from 'react-router-dom'
import URL from 'url';

export default function makeLinkPresenter(presenter) {
  const LinkPresenter = ({ config, mapData, renderPresenter }) => {
    const presenter = config.get('presenter');
    const url = mapData.get('url');
    const child = presenter ? renderPresenter(['config', 'presenter'], presenter) : null;
    const isExternalLink = URL.parse(url).host;

    if ( isExternalLink ) {
      return (
        <a href={url}>
          {child}
        </a>
      );
    }

    return (
      <Link to={url}>
        {child}
      </Link>
    );
  };

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/link.json",
      "title": "Link",
      "description": "Internal or external links",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "link",
          "default": "link"
        },
        "mapData": {
          "title": "Spreadsheet data",
          "description": "Formulas that will be evaluated against the spreadsheet",
          "type": "object",
          "default": {},
          "properties": {
            "url": {
              "title": "URL",
              "description": "The URL to link to.",
              "type": "string",
              "default": ""
            }
          }
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "presenter": {
              "title": "Presenter",
              "description": "The presenter to render that, when clicked, will take the user to the specified URL.",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json"
            }
          }
        }
      }
    })
  })(LinkPresenter);
}

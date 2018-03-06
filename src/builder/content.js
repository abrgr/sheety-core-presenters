import React from 'react';
import { fromJS } from 'immutable';
import sanitizer from '../sanitizer';

export default function makeContentPresenter(presenter) {
  const ContentPresenter = ({ config }) => {
    const content = config.get('content');
    const sanitizedContent = sanitizer.sanitize(content, uriRewriter);

    return (
      <div
        className='ql-editor'
        dangerouslySetInnerHTML={{__html: sanitizedContent}} />
    );
  };

  function uriRewriter(uri) {
    return uri; // TODO: apply some whitelisting, etc.
  }

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/content.json",
      "title": "Content",
      "description": "The Content presenter allows you to embed rich text, images, and video into your Sheety App.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "content",
          "default": "content"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "content": {
              "title": "Content",
              "description": "Rich content",
              "default": "",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/content.json"
            }
          }
        }
      }
    })
  })(ContentPresenter);
}

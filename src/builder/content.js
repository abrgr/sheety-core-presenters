import React from 'react';
import { fromJS } from 'immutable';
import sanitizer from '../sanitizer';
import ContentConfigurer from '../configurer/content';

export default function makeContentPresenter(presenter) {
  const ContentPresenter = ({
    mapData,
    isEditing,
    encoders,
    decoders,
    onUpdate
  }) => {
    const content = mapData.get('content');
    const sanitizedContent = sanitizer.sanitize(content, uriRewriter);

    if ( isEditing ) {
      return (
        <ContentConfigurer
          value={content}
          encoders={encoders}
          decoders={decoders}
          onUpdate={onUpdate} />
      );
    }

    return (
      <div
        className='ql-snow'>
        <div
          className='ql-editor'
          dangerouslySetInnerHTML={{__html: sanitizedContent}} />
      </div>
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
        "mapData": {
          "title": "Configuration",
          "description": "Pre-set values and formulas that will be evaluated against the spreadsheet that will determine the appearance and behavior of this presenter",
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

import React from 'react';
import sanitizer from '../sanitizer';

export default function makeContentPresenter(presenter) {
  const ContentPresenter = ({ mapData }) => {
    const content = mapData.get('content');
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

  return presenter()(ContentPresenter);
}

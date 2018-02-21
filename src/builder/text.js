import React from 'react';
import { Map } from 'immutable';

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
    configKeyDocs: new Map({
    }),
    mapDataDocs: new Map({
      text: 'Text to render'
    })
  })(TextPresenter);
}

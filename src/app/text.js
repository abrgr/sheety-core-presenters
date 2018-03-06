import React from 'react';

export default function makeTextPresenter(presenter) {
  const TextPresenter = ({ mapData }) => {
    const text = mapData.get('text');

    return (
      <p>
        {text}
      </p>
    );
  };

  return presenter()(TextPresenter);
}

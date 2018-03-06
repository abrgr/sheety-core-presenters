import React from 'react';

export default function makeBackgroundPresenter(presenter) {
  const BackgroundPresenter = ({ config, renderPresenter }) => {
    const presenter = config.get('presenter');
    const style = config.remove('presenter');

    return (
      <div style={style.toJS()}>
        {presenter ? renderPresenter(presenter) : null}
      </div>
    );
  };

  return presenter()(BackgroundPresenter);
}

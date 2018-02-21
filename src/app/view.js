import React from 'react';
import { Map } from 'immutable';

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

  return presenter({
    configKeyDocs: new Map({
      backgroundColor: 'String background color suitable for css backgroundColor property',
      color: 'String color suitable for css color property',
      borderRadius: 'Border radius suitable for css border radius',
      width: 'Width of the cell',
      height: 'Height of the cell',
      minWidth: 'Minimum width of the cell',
      maxWidth: 'Maximum width of the cell',
      minHeight: 'Minimum height of the cell',
      maxHeight: 'Maximum height of the cell',
      textAlign: 'Text alignment of the cell',
      marginTop: 'Top margin',
      marginBottom: 'Bottom margin',
      marginLeft: 'Left margin',
      marginRight: 'Right margin',
      presenter: 'Inner presenter definition'
    })
  })(BackgroundPresenter);
}

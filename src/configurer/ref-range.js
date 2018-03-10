import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default ({ path, onSetLinkPath, title, description }) => (
  <div>
    <RaisedButton
      label="Select a spreadsheet range"
      onClick={() => {
        onSetLinkPath(path);
      }} />
  </div>
);

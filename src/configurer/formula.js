import React from 'react';
import TextField from 'material-ui/TextField';

export default ({ value, onUpdate }) => (
  <TextField
    floatingLabelText="Formula"
    value={value || ''}
    onChange={evt => {
      onUpdate(evt.target.value);
    }} />
);

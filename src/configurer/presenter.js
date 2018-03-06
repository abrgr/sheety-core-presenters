import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

export default ({
  schema,
  path,
  presenter,
  onUpdate,
  onEditPresenter
}) => {
  const requiredProps = schema.getIn(path.slice(0, -1).concat('required'));
  const prop = path[path.length - 1];
  const deletable = presenter.getIn(path)
                  && (!requiredProps || !requiredProps.includes(prop));
  return (
    <div>
      <RaisedButton
        label="Configure presenter"
        onClick={() => {
          onEditPresenter(path);
        }} />
      {deletable
        ? (
          <IconButton
            tooltip="Remove presenter"
            onClick={() => {
              onUpdate(null);
            }}>
            <Delete />
          </IconButton>
        ) : null}
    </div>
  );
};

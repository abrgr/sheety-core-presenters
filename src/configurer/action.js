import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { cyanA700 } from 'material-ui/styles/colors';

export default ({
  value,
  schema,
  path,
  presenter,
  onUpdate,
  onEditAction
}) => {
  const requiredProps = schema.getIn(path.slice(0, -1).concat('required'));
  const prop = path[path.length - 1];
  const deletable = presenter.getIn(path)
                  && (!requiredProps || !requiredProps.includes(prop));

  if ( value ) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
        <IconButton
          tooltip="Edit action"
          tooltipPosition="bottom-right"
          onClick={() => {
            onEditAction(path);
          }}>
          <EditIcon
            color={cyanA700} />
        </IconButton>
        Action set
      </div>
    );
  }

  return (
    <div>
      <RaisedButton
        label="Configure action"
        onClick={() => {
          onEditAction(path);
        }} />
    </div>
  );
};

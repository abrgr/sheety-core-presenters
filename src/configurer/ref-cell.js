import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import LinkSheetIcon from 'material-ui/svg-icons/image/grid-on';
import { cyanA700 } from 'material-ui/styles/colors';

export default ({ path, onSetLinkPath, value, title, description }) => (
  <div>
    {value
      ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
          <IconButton
            tooltip="Edit cell"
            tooltipPosition="bottom-right"
            onClick={() => {
              onSetLinkPath(path);
            }}>
            <LinkSheetIcon
              color={cyanA700} />
          </IconButton>
          {value}
        </div>
      ) : (
        <RaisedButton
          label="Select a spreadsheet cell"
          onClick={() => {
            onSetLinkPath(path);
          }} />
      )}
  </div>
);

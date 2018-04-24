import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MuiProxy = ({
  nextProxy: {
    value: NextProxy,
    next
  },
  ...nextProps
}) => (
    <MuiThemeProvider>
      <NextProxy
        {...nextProps}
        nextProxy={next()} />
    </MuiThemeProvider>
);

export default () => MuiProxy;

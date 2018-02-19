import React from 'react';
import ReactDOM from 'react-dom';
import Examples from './examples';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Examples />, document.getElementById('root'));
registerServiceWorker();

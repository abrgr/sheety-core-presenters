import React from 'react';
import Router from './router';

export default {
  namespace: 'Builders',
  component: Router,
  props: {
    onUpdate: () => {},
    isEditing: true,
    renderPresenter: path => (
      <p
        style={{
          textAlign: 'center',
          border: '1px solid black'
        }}>
        Hi {path.join('/')}
      </p>
    ),
    path: [ 'router' ],
    config: {
      routes: [
        {
          path: '/',
          presenter: {}
        },
        {
          path: '/abc',
          presenter: null
        }
      ]
    }
  }
};

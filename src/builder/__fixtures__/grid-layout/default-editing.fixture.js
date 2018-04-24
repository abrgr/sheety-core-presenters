import React from 'react';
import GridLayout from './grid-layout';
import { encoders, decoders } from '../formula-coders';

export default {
  namespace: 'Builders',
  component: GridLayout,
  props: {
    encoders,
    decoders,
    onUpdate: () => {
      console.log('update');
    },
    onSelectPresenterForEditing: () => {
      console.log('select presenter');
    },
    isEditing: true,
    path: [ 'grid' ],
    mapData: {
    },
    config: {
      rows: [
        [
          {
            width: 2,
            presenter: {
            }
          },
          {
            width: 8,
            presenter: {
            }
          },
          {
            width: 2,
            presenter: null
          }
        ]
      ]
    },
    renderPresenter: () => (
      <p
        style={{
          textAlign: 'center',
          border: '1px solid black'
        }}>
        Hi
      </p>
    )
  }
};

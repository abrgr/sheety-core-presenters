import React from 'react';
import { fromJS } from 'immutable';
import { Sheet } from 'sheety-model';

const ImmutablePropsProxy = ({
  nextProxy: {
    value: NextProxy,
    next
  },
  fixture,
  ...nextProps
}) => {
  const {
    config,
    mapData,
    arrayData,
    arrayCells,
    arrayDataQuery,
    mapDataQuery,
    sheet
  } = fixture.props;

  const fixedFixture = {
    ...fixture,
    props: {
      ...fixture.props,
      config: !!config ? fromJS(config) : null,
      mapData: !!mapData ? fromJS(mapData) : null,
      arrayData: !!arrayData ? fromJS(arrayData) : null,
      arrayCells: !!arrayCells ? fromJS(arrayCells) : null,
      arrayDataQuery: !!arrayDataQuery ? fromJS(arrayDataQuery) : null,
      mapDataQuery: !!mapDataQuery ? fromJS(mapDataQuery) : null,
      sheet: !!sheet ? new Sheet(sheet) : null
    }
  };

  return (
    <NextProxy
      {...nextProps}
      nextProxy={next()}
      fixture={fixedFixture} />
  );
};

export default () => ImmutablePropsProxy;

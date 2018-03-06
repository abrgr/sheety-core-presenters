import React from 'react';
import { Link } from 'react-router-dom'
import URL from 'url';

export default function makeLinkPresenter(presenter) {
  const LinkPresenter = ({ config, mapData, renderPresenter }) => {
    const presenter = config.get('presenter');
    const url = mapData.get('url');
    const child = presenter ? renderPresenter(presenter) : null;
    const isExternalLink = URL.parse(url).host;

    if ( isExternalLink ) {
      return (
        <a href={url}>
          {child}
        </a>
      );
    }

    return (
      <Link to={url}>
        {child}
      </Link>
    );
  };

  return presenter()(LinkPresenter);
}

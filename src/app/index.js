import Sheet from './sheet';
import GridLayout from './grid-layout';
import Background from './background';
import Text from './text';
import Link from './link';
import Router from './router';
import RequireAuth from './require-auth'
import Content from './content';

export default function(presenter, deps = {}) {
  const presenters = { 
    Sheet: Sheet(presenter, deps),
    GridLayout: GridLayout(presenter, deps),
    Background: Background(presenter, deps),
    Text: Text(presenter, deps),
    Link: Link(presenter, deps),
    Router: Router(presenter, deps),
    RequireAuth: RequireAuth(presenter, deps),
    Content: Content(presenter, deps)
  };

  const { presenterRegistry } = deps;
  if ( presenterRegistry ) {
    presenterRegistry('sheet', presenters.Sheet);
    presenterRegistry('grid-layout', presenters.GridLayout);
    presenterRegistry('view', presenters.Background);
    presenterRegistry('text', presenters.Text);
    presenterRegistry('link', presenters.Link);
    presenterRegistry('router', presenters.Router);
    presenterRegistry('require-auth', presenters.RequireAuth);
    presenterRegistry('content', presenters.Content);
  }

  return presenters;
}

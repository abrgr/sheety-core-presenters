import Spreadsheet from './spreadsheet';
import GridLayout from './grid-layout';
import View from './view';
import Text from './text';
import Link from './link';
import Router from './router';
import RequireAuth from './require-auth'
import Content from './content';

export default function(presenter, deps = {}) {
  const presenters = { 
    Spreadsheet: Spreadsheet(presenter, deps),
    GridLayout: GridLayout(presenter, deps),
    View: View(presenter, deps),
    Text: Text(presenter, deps),
    Link: Link(presenter, deps),
    Router: Router(presenter, deps),
    RequireAuth: RequireAuth(presenter, deps),
    Content: Content(presenter, deps)
  };

  const { presenterRegistry } = deps;
  if ( presenterRegistry ) {
    presenterRegistry('spreadsheet', presenters.Spreadsheet);
    presenterRegistry('grid-layout', presenters.GridLayout);
    presenterRegistry('view', presenters.View);
    presenterRegistry('text', presenters.Text);
    presenterRegistry('link', presenters.Link);
    presenterRegistry('router', presenters.Router);
    presenterRegistry('require-auth', presenters.RequireAuth);
    presenterRegistry('content', presenters.Content);
  }

  return presenters;
}

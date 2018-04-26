import makeRouter from '../../router';

let Router;
makeRouter(() => (
  Router_ => {
    Router = Router_;
  }
));

export default Router;

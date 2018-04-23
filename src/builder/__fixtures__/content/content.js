import makeContent from '../../content';

let Content;
makeContent(() => (
  Content_ => {
    Content = Content_;
  }
));

export default Content;

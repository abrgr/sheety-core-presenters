import makeGridLayout from '../../grid-layout';

let GridLayout;
makeGridLayout(() => (
  GridLayout_ => {
    GridLayout = GridLayout_;
  }
));

export default GridLayout;

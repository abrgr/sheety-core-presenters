import Content from './content';
import { encoders, decoders } from '../formula-coders';

export default {
  namespace: 'Builders',
  component: Content,
  props: {
    encoders,
    decoders,
    onUpdate: () => {},
    isEditing: false,
    mapData: {
      content: '<strong>hello</strong> world'
    }
  }
};

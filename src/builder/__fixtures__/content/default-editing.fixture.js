import Content from './content';
import { encoders, decoders } from '../formula-coders';

export default {
  namespace: 'Builders',
  component: Content,
  props: {
    encoders,
    decoders,
    onUpdate: () => {},
    isEditing: true,
    mapData: {
      content: '<strong>hello</strong> world'
    }
  }
};

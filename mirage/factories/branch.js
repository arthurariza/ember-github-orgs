import { Factory } from 'miragejs';

export default Factory.extend({
  name(i) {
    return `branch ${i}`;
  },
});

import { Factory } from 'miragejs';

export default Factory.extend({
  name(i) {
    return `Rails ${i}`;
  },
  html_url() {
    return 'https://github.com/rails';
  },
  language() {
    return 'Ruby';
  },
  private() {
    return false;
  },
});

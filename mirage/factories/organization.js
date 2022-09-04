import { Factory } from 'miragejs';

export default Factory.extend({
  login(i) {
    return `rails${i}`;
  },
  name(i) {
    return `Ruby On Rails ${i}`;
  },

  html_url(i) {
    return `https://github.com/rails${i}`;
  },

  avatar_url(i) {
    return `https://avatars.githubusercontent.com/u/4223?v=4`;
  },
});

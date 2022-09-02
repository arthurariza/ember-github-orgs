import { Factory } from 'miragejs';

export default Factory.extend({
  login() {
    return 'rails';
  },
  name() {
    return 'Ruby on Rails';
  },

  html_url() {
    return 'https://github.com/rails';
  },

  avatar_url() {
    return 'https://avatars.githubusercontent.com/u/4223?v=4';
  },
});

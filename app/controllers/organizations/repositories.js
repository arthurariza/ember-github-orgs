import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class RepositoriesController extends Controller {
  @tracked
  stars = null;

  @action
  setStars(stars) {
    this.stars = stars;
  }

  get byStars() {
    let byStars = this.model;

    if (this.stars === 'asc') {
      byStars.sort(({ stargazers_count: a }, { stargazers_count: b }) => a - b);
    } else if (this.stars === 'desc') {
      byStars.sort(({ stargazers_count: a }, { stargazers_count: b }) => b - a);
    }

    return byStars;
  }
}

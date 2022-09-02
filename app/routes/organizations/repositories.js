import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class OrganizationsRepositoriesRoute extends Route {
  async model() {
    let { login } = this.modelFor('organizations');

    const res = await fetch(`https://api.github.com/orgs/${login}/repos`);
    const repositories = await res.json();

    return repositories;
  }
}

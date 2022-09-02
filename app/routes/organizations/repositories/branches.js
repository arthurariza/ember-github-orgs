import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class OrganizationsRepositoriesBranchesRoute extends Route {
  async model({ repository }) {
    let { login } = this.modelFor('organizations');

    const res = await fetch(
      `https://api.github.com/repos/${login}/${repository}/branches`
    );
    const branches = await res.json();

    return branches;
  }
}

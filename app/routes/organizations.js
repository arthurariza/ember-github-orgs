import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class OrganizationsRoute extends Route {
  async model({ organization }) {
    const res = await fetch(`https://api.github.com/orgs/${organization}`);
    const org = await res.json();

    return org;
  }
}

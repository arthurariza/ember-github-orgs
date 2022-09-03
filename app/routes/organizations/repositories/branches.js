import Route from '@ember/routing/route';
import fetch from 'fetch';
import { service } from '@ember/service';
import { isNotFoundResponse } from 'ember-fetch/errors';

export default class OrganizationsRepositoriesBranchesRoute extends Route {
  @service router;
  @service notifications;

  async model({ repository }) {
    let { login } = this.modelFor('organizations');

    const response = await fetch(
      `https://api.github.com/repos/${login}/${repository}/branches`
    );

    if (isNotFoundResponse(response)) {
      this.notifications.error('Repository Not Found');
      return this.router.replaceWith('organizations.repositories');
    }

    const branches = await response.json();
    return branches;
  }
}

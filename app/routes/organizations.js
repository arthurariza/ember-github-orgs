import Route from '@ember/routing/route';
import fetch from 'fetch';
import { service } from '@ember/service';
import { isNotFoundResponse } from 'ember-fetch/errors';

export default class OrganizationsRoute extends Route {
  @service router;
  @service notifications;

  async model({ organization }) {
    const response = await fetch(`https://api.github.com/orgs/${organization}`);

    if (isNotFoundResponse(response)) {
      this.notifications.error('Organization Not Found');
      return this.router.replaceWith('index');
    }

    const org = await response.json();
    return org;
  }
}

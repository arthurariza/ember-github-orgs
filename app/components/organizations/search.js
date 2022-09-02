import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class OrganizationsSearchComponent extends Component {
  @service router;

  @tracked organization = '';

  @action
  search() {
    this.router.transitionTo('organizations', this.organization);
  }
}

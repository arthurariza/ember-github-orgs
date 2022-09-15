import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class RepositoriesFilterComponent extends Component {
  @tracked language = '';

  get filtered() {
    let { repositories } = this.args;

    let regex = new RegExp(this.language.toLowerCase());

    repositories = repositories.filter(({ language }) =>
      language?.toLowerCase().match(regex)
    );

    return repositories;
  }
}

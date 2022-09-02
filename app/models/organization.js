import Model, { attr } from '@ember-data/model';

export default class OrganizationModel extends Model {
  @attr('string') name;
  @attr('string') html_url;
  @attr('string') avatar_url;
}

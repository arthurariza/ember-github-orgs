import Model, { attr, hasMany } from '@ember-data/model';

export default class OrganizationModel extends Model {
  @attr('string') name;
  @attr('string') html_url;
  @attr('string') avatar_url;
  @hasMany('repository') repositories;
}

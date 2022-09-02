import Model, { attr, belongsTo } from '@ember-data/model';

export default class RepositoryModel extends Model {
  @attr('string') name;
  @attr('string') html_url;
  @attr('string') language;
  @attr('boolean') private;
  @belongsTo('organization') organization;
}

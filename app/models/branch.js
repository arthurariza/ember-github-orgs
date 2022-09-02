import Model, { attr, belongsTo } from '@ember-data/model';

export default class BranchModel extends Model {
  @attr('string') name;
  @belongsTo('repository') repository;
}

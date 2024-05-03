import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class PriorityMatrix extends Model {
  static table = 'priority_matrices';

  static associations = {
    priority: { type: 'belongs_to', key: 'priority_id' },
  };

  @field('important') important;
  @field('urgent') urgent;
  @field('exciting') exciting;
}

export default PriorityMatrix;

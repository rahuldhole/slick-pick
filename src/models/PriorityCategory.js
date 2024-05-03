import { Model, Q } from '@nozbe/watermelondb';
import { text, field, children, lazy } from '@nozbe/watermelondb/decorators';

class PriorityCategory extends Model {
  static table = 'priority_categories';

  static associations = {
    priorities: { type: 'has_many', key: 'priority_category_id' },
  };

  @field('name') name;
  @field('description') description;
  @text('color') color;

  @children('priorities') priorities;
  
  // Custom query attribute
  @lazy incompletePriorities = this.priorities.extend(
    Q.where('is_completed', false)
  )
}

export default PriorityCategory;

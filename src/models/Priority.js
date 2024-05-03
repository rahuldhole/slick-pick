import { Model } from '@nozbe/watermelondb';
import { text, field, date, nochange, relation } from '@nozbe/watermelondb/decorators';

class Priority extends Model {
  static table = 'priorities';

  static associations = {
    priority_categories: { type: 'belongs_to', foreignKey: 'priority_category_id' },
  };

  @relation('priority_categories', 'priority_category_id') priority_category;
  
  @text('name') name;
  @text('description') description;

  @field('is_completed') isCompleted;
  @field('is_archived') isArchived;
  
  @date('archived_at') archivedAt;
  @date('completed_at') completedAt;
  
  @date('updated_at') updatedAt;
  @nochange @date('created_at') createdAt;

  get isRecentlyArchived() {
    // in the last 7 days
    return this.archivedAt &&
      this.archivedAt.getTime() > Date.now() - 7 * 24 * 3600 * 1000
  }
}

export default Priority;

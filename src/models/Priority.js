import Model from '../db/Model';

class PriorityModel extends Model {
  constructor() {
    super('slickPickDB', 1, [
      { name: 'priorities', keyPath: 'priority_id' },
      // Define other tables from Schema.js as needed
    ]);
  }
}

export default PriorityModel;

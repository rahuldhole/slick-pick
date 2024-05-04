export const Schema = {
  dbName: "slickPickDB",
  version: 1714815400414,
  tables: [
    {
      name: 'priorities',
      columns: [
        { name: 'priority_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'is_completed', type: 'boolean' },
        { name: 'is_archived', type: 'boolean', isOptional: true },
        { name: 'archived_at', type: 'string', isOptional: true },
        { name: 'completed_at', type: 'string', isOptional: true },
        { name: 'updated_at', type: 'string', isOptional: true },
        { name: 'created_at', type: 'string' },
      ],
    },
    {
      name: 'priority_matrices',
      columns: [
        { name: 'priority_matrix_id', type: 'string', isIndexed: true },
        { name: 'important', type: 'boolean', isOptional: true },
        { name: 'urgent', type: 'boolean', isOptional: true },
        { name: 'exciting', type: 'boolean', isOptional: true },
      ],
    },
    {
      name: 'priority_categories',
      columns: [
        { name: 'priority_category_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'color', type: 'string', isOptional: true },
      ],
    },
  ],
};

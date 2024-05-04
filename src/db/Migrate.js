import db from './index';
import { Schema } from './Schema';

export default async function Migrate() {
  if (isSchemaUpdated()) {
    console.warn("Database is already updated!");
    return false;
  }

  let dbInstance = await db(Schema.version);
  console.warn("Updated db version", dbInstance.version);
  dbInstance.close();

  return true;
}

export function runMigrations(dbInstance) {
  const from = dbInstance.version;
  const to = Schema.version;

  if (from === to) {
    console.warn("Already migrated!")
    return false;
  }

  console.log("Migrating from ", from, " to ", to);
}


// Helper functions

export async function isSchemaUpdated() {
  let dbInstance = await db();
  const dbVersion = dbInstance.version;
  dbInstance.close();

  console.log("Current db version ", dbVersion);

  if (dbVersion === Schema.version) {
    return true;
  }

  return false;
}

export async function TestMigrate() {
  const files = require.context('./migrations', true, /\.js$/);

  // Get keys and sort them in ascending order
  const sortedKeys = files.keys().sort();

  // Iterate through sorted keys and execute migrations
  for (const key of sortedKeys) {
    const migrationModule = await import(`./migrations${key.slice(1)}`);
    const migration = new migrationModule.default;

    try {
      await migration.up();
    } catch (e) {
      console.error(e);
    }
  }
}



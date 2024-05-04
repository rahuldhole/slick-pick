import db from '../index';
import { Schema } from '../Schema';

export default async function Migrate() {
  if (await isSchemaUpdated()) {
    console.warn("Database is already updated!");
    return false;
  }

  let dbInstance = await db(Schema.version);
  console.warn("Updated db version", dbInstance.version);
  dbInstance.close();

  return true;
}

// Helper functions

export async function isSchemaUpdated() {
  let dbInstance = await db();
  const dbVersion = dbInstance.version;
  dbInstance.close();

  if(parseInt(dbVersion) > parseInt(Schema.version)){
    throw "New DB version can't be smaller than old one"
  }

  return (dbVersion === Schema.version)
}

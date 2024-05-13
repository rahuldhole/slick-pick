

import IDBS from './index'; // package

// Change your Schema.js path
import { Schema } from './Schema';

// change your migrations/ folder path
const reqMigrations = require.context('./migrations', true, /\.js$/);

const migrationModules = reqMigrations.keys().map(key => reqMigrations(key));

export default function IDBSuit() {
  const idbs = new IDBS(Schema, migrationModules);
  
  return idbs;
}

import { Schema } from './Schema';
import runMigrations from './migrations';

export default function db(version = 1) {
  const defaultIDBVersion = 1;

  return new Promise((resolve, reject) => {
    let request = null;

    const openRequest = () => {
      if (version === defaultIDBVersion) {
        request = window.indexedDB.open(Schema.dbName);
      } else {
        request = window.indexedDB.open(Schema.dbName, version);
      }

      request.onerror = function (event) {
        console.error("indexedDB is not supported", event.target.errorCode);
        reject(event.target.errorCode);
      };

      request.onsuccess = function (event) {
        const dbInstance = event.target.result;
        console.log("(s) indexedDB is loaded version", dbInstance.version);

        resolve(dbInstance);
      };

      request.onupgradeneeded = function (event) {
        const dbInstance = event.target.result;
        console.log("(u) indexedDB is loaded version", dbInstance.version);

        if (dbInstance.version === defaultIDBVersion) {
          createTables(dbInstance);
        } else {
          runMigrations(dbInstance);
        }

        resolve(dbInstance);
      };
    };

    openRequest();
  });

  // Private

  function createTables(dbInstance) {
    Schema.tables.forEach(table => {
      const tableName = table.name;
      const objectStore = dbInstance.createObjectStore(tableName, { keyPath: 'id', autoIncrement: true });

      table.columns.forEach(column => {
        objectStore.createIndex(column.name, column.name, { unique: !!column.isIndexed });
      });
    });
  }
}


export function deleteDb() {
  console.log("deleting db");
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(Schema.dbName);

    request.onerror = function(event) {
      console.error("Error deleting database:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function(event) {
      console.log("Database deleted successfully");
      resolve();
    };
  });
}
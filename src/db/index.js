import MigrationManager from './bin/MigrationManager';
class IDBS {
  constructor(schema) {
    this.schema = schema;
    this.dbExists = false;
    this.checkDBExists(this.schema.dbName)
      .then(exists => {
        this.dbExists = exists;
      });
  }

  openDatabase() {
    return new Promise((resolve, reject) => {
      let request = null;

      const openRequest = () => {
        request = window.indexedDB.open(this.schema.dbName, this.schema.version);

        request.onerror = (event) => {
          console.error("indexedDB is not supported", event.target.errorCode);
          reject(event.target.errorCode);
        };

        request.onsuccess = (event) => {
          const dbInstance = event.target.result;
          console.log("(s) indexedDB is loaded version", dbInstance.version);

          resolve(dbInstance);
        };

        request.onupgradeneeded = (event) => {
          const dbInstance = event.target.result;
          console.log("(u) indexedDB is loaded version", dbInstance.version);

          if (this.dbExists) {
            this.runMigrations(dbInstance);
          } else {
            this.createTables(dbInstance);
          }

          resolve(dbInstance);
        };
      };

      openRequest();
    });
  }

  checkDBExists(dbName) {
    return window.indexedDB.databases()
      .then(dbs => {
        return dbs.some(db => db.name === dbName);
      })
      .catch(error => {
        console.error('Error checking database existence:', error);
        return false;
      });
  }

  createTables(dbInstance) {
    this.schema.tables.forEach(table => {
      const tableName = table.name;
      const objectStore = dbInstance.createObjectStore(tableName, { keyPath: 'id', autoIncrement: true });

      table.columns.forEach(column => {
        objectStore.createIndex(column.name, column.name, { unique: !!column.isIndexed });
      });
    });
  }

  runMigrations(dbInstance) {
    const migrationManager = new MigrationManager(dbInstance);

    const fromNumber = dbInstance.version;
    const toNumber = this.schema.version;

    // Perform migrations
    migrationManager.migrate(fromNumber, toNumber)
      .then(result => {
        if (result === false) {
          console.log("Migration already up-to-date.");
        } else {
          console.log("Migration completed successfully.");
        }
      })
      .catch(error => {
        console.error("Error occurred during migration:", error);
      });
  }

  destroy() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.deleteDatabase(this.schema.dbName);

      request.onerror = (event) => {
        console.error("Error deleting database:", event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        console.log("Database deleted successfully");
        resolve();
      };
    });
  }

  // Add CRUD methods here
}

export default IDBS;

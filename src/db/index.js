import DBUtils from './utils/DBUtils';
import MigrationManager from './bin/MigrationManager';
class IDBS {
  constructor(schema, migrations) {
    this.schema = schema;
    this.migrations = migrations;
    this.migrationManager = new MigrationManager(migrations);
  }

  async getCurrentVersion() {
    const version = await DBUtils.getDBVersion(this.schema.dbName);
    if (version !== null) {
      return version;
    } else {
      return this.schema.version;
    }
  }

  async getDBExists() {
    return await DBUtils.checkDBExists(this.schema.dbName);
  }

  async openDatabase(newVersion = null) {
    const dbExists = await this.getDBExists();

    return new Promise(async (resolve, reject) => {

      const currentVersion = await this.getCurrentVersion();

      if (newVersion === null) {
        newVersion = currentVersion;
      }

      const nextVersion = this.migrationManager.nextVersion(newVersion);
      if (currentVersion < nextVersion && nextVersion <= this.schema.version) {        
        this.openDatabase(nextVersion);
      }

      let request = null;

      const openRequest = () => {
        request = window.indexedDB.open(this.schema.dbName, this.schema.version);

        request.onerror = (event) => {
          console.error("indexedDB is not supported", event.target.errorCode);
          reject(event.target.errorCode);
        };

        request.onsuccess = (event) => {
          const dbInstance = event.target.result;

          resolve(dbInstance);
        };

        request.onupgradeneeded = async (event) => {
          const dbInstance = event.target.result;

          if (dbExists) {
            this.migrationManager.run(dbInstance)
          } else {
            this.createTables(dbInstance);
          }

          resolve(dbInstance);
        };
      };

      openRequest();
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

  destroy() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.deleteDatabase(this.schema.dbName);

      request.onerror = (event) => {
        console.error("Error deleting database:", event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve();
      };
    });
  }
}

export default IDBS;

export default class MigrationManager {
  constructor(dbInstance) {
    this.dbInstance = dbInstance;
    this.folder = '../migrations'
  }

  async migrate(fromNumber, toNumber) {
    if (fromNumber === toNumber) {
      console.warn("Already migrated!");
      return false;
    }

    console.log("Migrating from ", fromNumber, " to ", toNumber);

    // Start a transaction
    const transaction = this.dbInstance.transaction(['migrations'], 'readwrite');

    // Get the migration object store
    const migrationStore = transaction.objectStore('migrations');

    // file name has number_name.js
    const files = require.context(this.folder , true, /\.js$/);

    // Get keys and sort them in ascending order
    const sortedKeys = files.keys().sort();

    // Filter keys based on version numbers
    const filteredKeys = sortedKeys.filter(key => {
      const fileName = key.split('/').pop().split('.')[0];
      const parts = fileName.split('_');

      if (parts.length < 2) {
        console.error(`Error: File ${key} does not match the expected format. Use 'new Date.getTime()+"_"' prefix.`);
        return false;
      }

      const numberPart = parseInt(parts[0]);
      return numberPart > fromNumber && numberPart <= toNumber;
    });

    try {
      // Iterate through keys and execute migrations within the transaction
      for (const key of filteredKeys) {
        const migrationModule = await import(`$this.folder`+`${key.slice(1)}`);
        const migration = new migrationModule.default;
        await migration.up();
      }

      // Commit the transaction if all migrations succeed
      await transaction.commit();
      console.log("Migrations committed successfully.");
    } catch (error) {
      // Rollback the transaction if any migration fails
      console.error("Error occurred during migration:", error);
      transaction.abort();
      console.log("Transaction rolled back due to migration error.");
    }
  }
}

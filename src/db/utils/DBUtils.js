class DBUtils {
  static checkDBExists(dbName) {
    return window.indexedDB.databases()
      .then(dbs => {
        return dbs.some(db => db.name === dbName);
      })
      .catch(error => {
        console.error('Error checking database existence:', error);
        return false;
      });
  }

  static getDBVersion(dbName) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName);

      request.onerror = function (event) {
        console.error('Error opening database:', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = function (event) {
        const version = event.target.result.version;
        event.target.result.close(); // Close the database connection
        resolve(version);
      };

      request.onblocked = function (event) {
        console.error('Database access blocked:', event.target.error);
        reject(event.target.error);
      };
    });
  }
}

export default DBUtils;

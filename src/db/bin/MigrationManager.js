import { default as MigrationClass } from '../Migration.js';

export default class MigrationManager {
  constructor(migrations) {
    this.migrations = migrations;
  }

  // Check if a migration version exists
  isVersionExist(version) {
    return MigrationClass.derivedClasses.some(([_, v]) => v === version);
  }

  // Get the next migration version
  nextVersion(currentVersion) {
    const nextMigration = MigrationClass.derivedClasses
      .filter(([_, v]) => v > currentVersion)
      .sort((a, b) => a[1] - b[1])[0];
    return nextMigration ? nextMigration[1] : null;
  }

  // Get the previous migration version
  prevVersion(currentVersion) {
    const prevMigration = MigrationClass.derivedClasses
      .filter(([_, v]) => v < currentVersion)
      .sort((a, b) => b[1] - a[1])[0];
    return prevMigration ? prevMigration[1] : null;
  }

  // Execute migrations up to a specified version
  async run(dbInstance) {
    const migrationVersion = dbInstance.version;

    const migrationsToRun = MigrationClass.derivedClasses
      .filter(([_, version]) => version <= migrationVersion)
      .sort((a, b) => a[1] - b[1]); // Sorting by version in ascending order

    for (const [migrationClassName, version] of migrationsToRun) {
      const matchingMigration = this.migrations.find(
        migration => migration['default'].name === migrationClassName
      );

      if (matchingMigration) {
        const migrationInstance = new matchingMigration['default'](dbInstance);
        await migrationInstance.migrate();
      }
    }
  }
}

export default class Migration {
  static derivedClasses = [];

  constructor(dbInstance) {
    this.dbInstance = dbInstance;
  }

  static newVersion(version) {
    this.derivedClasses.push([this.name, version]); // record class name and version
  }
}

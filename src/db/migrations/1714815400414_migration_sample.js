import Migration from "../Migration";
export default class ExampleTwo extends Migration{
  static #_= this.newVersion(1714815400414);
  
  async migrate() {
    return new Promise((resolve, reject) => {
      
      // Implement your migration logic for applying changes
      //...
      console.log(`Applying migration: 1714815400414 on ${this.dbInstance.name}`);
      
      
      
      resolve();
    });
  }
}

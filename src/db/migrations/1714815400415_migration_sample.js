import { Migration } from "idbsuit";

export default class ExampleFifteen extends Migration{
  static #_= this.newVersion(1714815400415);
  
  async migrate() {
    return new Promise((resolve, reject) => {
      
      // Implement your migration logic for applying changes
      //...
      console.log(`Applying migration: 1714815400415 on ${this.dbInstance.name}`);
      
      
      
      resolve();
    });
  }
}

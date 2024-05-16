import { Migration } from "idbsuit";

export default class ExampleThree extends Migration{
  static #_= this.newVersion(1714815400420);

  async migrate() {
    return new Promise((resolve, reject) => {
      
      // Implement your migration logic for applying changes
      //...
      console.log(`Applying migration: 1714815400420 on ${this.dbInstance.name}`);
      
      
      
      resolve();
    });
  }
}


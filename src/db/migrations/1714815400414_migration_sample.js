export default class Migration_1714815400414 {
  async up() {
    return new Promise((resolve, reject) => {
      // Implement your migration logic for applying changes
      console.log("Applying migration: 1714815400414", new Date().getTime());

      // Resolve the promise when the migration is completed
      resolve();
    });
  }

  async down() {
    return new Promise((resolve, reject) => {
      // Implement your migration logic for reverting changes
      console.log("Reverting migration: 1714815400414", new Date().getTime());

      // Resolve the promise when the migration is completed
      resolve();
    });
  }
}

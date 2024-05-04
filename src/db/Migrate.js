import db from './db'

export default async function Migrate() {
  let dbInstance = await db();

  console.log("current db version ", dbInstance.version);

  if (dbInstance.version !== Schema.version) {
    dbInstance.close();

    dbInstance = await db(Schema.version);
    console.log("Updated db version", dbInstance.version);
    
    dbInstance.close();
  }

}

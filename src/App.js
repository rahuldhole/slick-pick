import { useState } from 'react';
import './App.css';
import IDBSuit from './config/IDBSuit'

// import rough from './rough/main';

function App() {

  const idbs = IDBSuit();

  const [dbVersion, setDbVersion] = useState(null);

  // const idbs = new IDBS(Schema, Migrations);

  idbs.openDatabase()
    .then(dbInstance => {
      setDbVersion(dbInstance.version);
    })
    .catch(error => {
      console.error('Error opening database:', error);
    });

  // idbs.destroy()
  //   .then(() => {
  //     console.log('Database deleted successfully');
  //   })
  //   .catch(error => {
  //     console.error('Error deleting database:', error);
  //   });


  return (
    <div className="App">
      <h1>Hello World!</h1>
      {dbVersion && <p>Database Version: {dbVersion}</p>}
    </div>
  );
}

export default App;

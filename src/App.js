import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db';
import Migrate from './db/services/Migrate'


function App() {
  const [dbVersion, setDbVersion] = useState(null);

  useEffect(() => {
    const getDBVersion = async () => {
      try {
        const dbInstance = await db();
        setDbVersion(dbInstance.version); 

        console.log("TestMigrate: ", Migrate())
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getDBVersion();

    return () => {
      // Cleanup code here
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello World!</h1>
      {dbVersion && <p>Database Version: {dbVersion}</p>}
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db';

function App() {
  const [dbVersion, setDbVersion] = useState(null);

  useEffect(() => {
    const getDBVersion = async () => {
      try {
        const dbInstance = await db();
        setDbVersion(dbInstance.version); 
      } catch (error) {
        console.error('Error initializing database:', error);
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

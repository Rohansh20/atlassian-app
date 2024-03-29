import { useEffect } from 'react';
import { start } from './javascript';
import Atlassian from './Atlassian.svg';
import { PageTree } from './browserCoding/PageTree';
// import './App.css';

function App() {
  useEffect(() => {
    start();
  }, []);
  const now = new Date();
  const dateString = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  return (
    <div className="">
      <h2>Hello Atlassian!</h2>
      <div>
        <img src={Atlassian} alt="atlassian logo" className="h-40" />
      </div>
      <h3 className="font-family-monospace">{dateString}</h3>
      <PageTree />
    </div>
  );
}

export default App;

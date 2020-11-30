import Atlassian from './Atlassian.svg';
// import './App.css';

function App() {
  const now = new Date();
  const dateString = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  return (
    <div className="text-align-center">
      <h2>Hello Atlassian</h2>
      <div>
        <img src={Atlassian} alt="atlassian logo" className="h-40" />
      </div>
      <h3 className="font-family-monospace">{dateString}</h3>
    </div>
  );
}

export default App;

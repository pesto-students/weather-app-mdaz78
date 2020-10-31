import './App.css';
import Search from './components/search/Search.js';
import CurrentInfo from './components/current-info/CurrentInfo';
import FutureForecasts from './components/future-forecasts/FutureForecasts';

function App() {
  return (
    <>
      <h1 className='heading'>Weather</h1>
      <Search />
      <main className='main-area'>
        <CurrentInfo />
        <FutureForecasts />
      </main>
    </>
  );
}

export default App;

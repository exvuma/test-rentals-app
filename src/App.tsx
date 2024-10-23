import React from 'react';
import './App.css';
import LinkFetcher from './components/ImageFetcher';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Test!
        <h1>Link Fetcher App</h1>
        <LinkFetcher />
      </header>
    </div>
  );
}

export default App;

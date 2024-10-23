import React, { useState } from 'react';
import './App.css';
import ListingFetcher from './components/ListingFetcher';

function App() {
  const [rentalIds, setRentalIds] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ids = event.target.value.split(',').map(id => id.trim());
    setRentalIds(ids);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fetch Rental Data</h1>
      </header>
      <main className="App-main">
        <div className="grid-container">
          <div className="grid-item">
            <label htmlFor="rentalIds">Input Rental IDs (comma-separated):</label>
            <input
              type="text"
              id="rentalIds"
              onChange={handleInputChange}
              placeholder="e.g., 123, 456, 789"
            />
          </div>
        </div>
        <div className="grid-container">
          {rentalIds.map((rentalId) => (
            <div key={rentalId} className="grid-item">
              <ListingFetcher rentalId={parseInt(rentalId, 10)} />
            </div>
          ))}
          <div className="grid-item">
            <ListingFetcher rentalId={410504} />
          </div>
          {/* Add more grid items here as needed */}
        </div>
      </main>
    </div>
  );
}

export default App;

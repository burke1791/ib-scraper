import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('/api/scrape').then(response => {
      console.log(response);
    });
  });
  
  return (
    <div className="App">
      IB Scraper
    </div>
  );
}

export default App;

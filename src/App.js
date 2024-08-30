import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehiclePage from './components/VehiclePage';
import BillingPage from './components/BillingPage';

function App() {
  const [jobCard, setJobCard] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehiclePage setJobCard={setJobCard} />} />
        <Route path="/billing" element={<BillingPage jobCard={jobCard} />} />
      </Routes>
    </Router>
  );
}

export default App;

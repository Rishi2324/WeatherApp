import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Weather from './components/Weather';
import SavedCities from './components/SavedCities';
import './App.css'

const App = () => {
  return (
    <Router>   
      <nav >
        <div className="navbar">   
        <Link to="/">Home</Link>    
         <Link to="/saved">Saved Cities</Link>
</div>
      </nav>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/saved" element={<SavedCities />} />
      </Routes>
    </Router>
  );
};

export default App;

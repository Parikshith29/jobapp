import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import SavedPage from './pages/SavedPage';
import DigestPage from './pages/DigestPage';
import SettingsPage from './pages/SettingsPage';
import ProofPage from './pages/ProofPage';
import TestPage from './pages/TestPage';
import ShipPage from './pages/ShipPage';


function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingTop: '80px' }}>
        <Navigation />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/digest" element={<DigestPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/proof" element={<ProofPage />} />
          <Route path="/jt/07-test" element={<TestPage />} />
          <Route path="/jt/08-ship" element={<ShipPage />} />
          <Route path="/jt/proof" element={<ProofPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

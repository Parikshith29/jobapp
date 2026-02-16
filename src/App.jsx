import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
        <Navigation />

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
          <Route path="/saved" element={<PlaceholderPage title="Saved Jobs" />} />
          <Route path="/digest" element={<PlaceholderPage title="Daily Digest" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/proof" element={<PlaceholderPage title="Proof Verification" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layouts/Header';
import HomePage from './pages/HomePage';
import LanguagePage from './pages/LanguagePage';
import FrameworkPage from './pages/FrameworkPage';
import DataStoragePage from './pages/DataStoragePage';
import RecommendationPage from './pages/RecommendationPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recommendation" element={<RecommendationPage />} />
            <Route path="/languages" element={<LanguagePage />} />
            <Route path="/frameworks" element={<FrameworkPage />} />
            <Route path="/datastorages" element={<DataStoragePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
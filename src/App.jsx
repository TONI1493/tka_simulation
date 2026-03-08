import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AuthPage from './components/AuthPage';
import ConfirmationPage from './components/ConfirmationPage';
import TestConfirmationPage from './components/TestConfirmationPage'; // Import new page
import ExamPage from './components/ExamPage';
import ResultPage from './components/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/test-confirmation" element={<TestConfirmationPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;

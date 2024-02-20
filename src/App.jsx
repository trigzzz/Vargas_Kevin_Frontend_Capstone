import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'; // Import Navigation
import HomePage from './views/HomePage';
import AboutPage from './views/AboutPage';
import DashboardPage from './views/DashboardPage';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation /> {/* Use the Navigation component */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

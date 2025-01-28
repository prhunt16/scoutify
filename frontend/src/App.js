import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import AuthDashboard from './pages/AuthDashboard';
import StatsAnalytics from './pages/StatsAnalytics';
import FilmRoom from './pages/FilmRoom';
import MyTeam from './pages/MyTeam';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Scoutify.io</h1>
        <Link to="/login">
          <Button variant="scoutify">Login</Button>
        </Link>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="flex items-center w-full max-w-5xl">
          <div className="flex-grow flex flex-col space-y-2">
            <div className="h-2 bg-blue-600"></div>
            <div className="h-2 bg-blue-600"></div>
          </div>
          <h2 className="text-4xl font-bold mx-8 whitespace-nowrap">Welcome to Scoutify.io</h2>
          <div className="flex-grow flex flex-col space-y-2">
            <div className="h-2 bg-blue-600"></div>
            <div className="h-2 bg-blue-600"></div>
          </div>
        </div>
        <div className="mt-8">
          <Link to="/get-started">
            <Button variant="scoutify" size="lg">Get Started</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AuthDashboard />} />
        <Route path="/statsanalytics" element={<StatsAnalytics />} />
        <Route path="/film-room" element={<FilmRoom />} />
        <Route path="/my-team" element={<MyTeam />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Film, Users, Calendar, BarChart2 } from 'lucide-react';

const DashboardTile = ({ title, icon, link }) => (
  <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center">
    {icon}
    <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
  </Link>
);

const AuthDashboard = () => {
  console.log("AuthDashboard is rendering");
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">Scoutify.io</Link>
        <div className="flex space-x-4">
          <Link to="/profile">
            <Button variant="outline">Profile</Button>
          </Link>
          <Link to="/">
            <Button variant="scoutify">Logout</Button>
          </Link>
        </div>
      </header>
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardTile 
            title="Film Room" 
            icon={<Film size={48} className="text-blue-500" />} 
            link="/film-room" 
          />
          <DashboardTile 
            title="My Team" 
            icon={<Users size={48} className="text-green-500" />} 
            link="/my-team" 
          />
          <DashboardTile 
            title="Schedule" 
            icon={<Calendar size={48} className="text-yellow-500" />} 
            link="/schedule" 
          />
          <DashboardTile 
            title="Stats & Analytics" 
            icon={<BarChart2 size={48} className="text-purple-500" />} 
            link="/statsanalytics" 
          />
        </div>
      </main>
    </div>
  );
};

export default AuthDashboard;
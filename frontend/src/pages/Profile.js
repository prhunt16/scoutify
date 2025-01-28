import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(localStorage.getItem('userTeam') || '');

  useEffect(() => {
    fetchTeams();
    console.log('Teams state on mount:', teams);  // Log the state after fetchTeams is called
  }, []);
  

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/teams');
      const data = await response.json();
      console.log('Fetched teams:', data);  // Log the fetched data
      setTeams(data);
    } catch (err) {
      console.error('Failed to fetch teams:', err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
            Scoutify.io
          </Link>
          <Link to="/">
            <Button variant="scoutify">Logout</Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow p-8 relative">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">User Information</h3>
              <div className="space-y-2">
                <p>Name: John Doe</p>
                <p>Email: john.doe@example.com</p>
                <p>Role: Coach</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Team Selection</h3>
              <select 
                className="w-full border rounded-md p-2"
                value={selectedTeam}
                onChange={(e) => {
                  setSelectedTeam(e.target.value);
                  localStorage.setItem('userTeam', e.target.value);
                }}
              >
                <option value="">Select your team</option>
                {teams.length === 0 ? (
                  <option value="">No teams available</option>
                ) : (
                  teams.map(team => (
                    <option key={team.team_id} value={team.team_id}>
                      {team.name}
                    </option>
                  ))
                )}
              </select>

            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Preferences</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Email notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Game reminders</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

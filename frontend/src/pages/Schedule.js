import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Schedule = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamName, setTeamName] = useState('');
  const userTeamId = localStorage.getItem('userTeam');

  const getTeamRecord = (games) => {
    let wins = 0;
    let losses = 0;
    games.forEach(game => {
      if (game.home_team_score !== null) {  // Only count completed games
        const isHomeTeam = game.home_team_id === parseInt(userTeamId);
        const userScore = isHomeTeam ? game.home_team_score : game.away_team_score;
        const opponentScore = isHomeTeam ? game.away_team_score : game.home_team_score;
        if (userScore > opponentScore) {
          wins++;
        } else {
          losses++;
        }
      }
    });
    return `(${wins}-${losses})`;
  };

  useEffect(() => {
    console.log('Component mounted, userTeamId:', userTeamId);
    
    if (!userTeamId) {
      setError('Please select your team in Profile first');
      setLoading(false);
      return;
    }

    const ScheduleContent = ({ games, navigate }) => (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Opponent</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {games.map((game) => (
              <tr 
                key={game.game_id} 
                onClick={() => navigate(`/filmroom/${game.game_id}`)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 text-sm text-gray-900">{game.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{game.time}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{game.opponent}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{game.location}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{game.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
        
    

    const fetchSchedule = async () => {
      try {
        console.log('Fetching schedule for team:', userTeamId);
        setLoading(true);
        setError(null);

        const cleanTeamId = parseInt(userTeamId);

        // Fetch schedule data
        console.log('Fetching from URL:', `http://localhost:5001/api/teams/${cleanTeamId}/schedule`);
        const scheduleResponse = await fetch(`http://localhost:5001/api/teams/${cleanTeamId}/schedule`);
        console.log('Schedule API Response:', scheduleResponse);
        
        if (!scheduleResponse.ok) {
          throw new Error(`HTTP error! status: ${scheduleResponse.status}`);
        }
        
        const scheduleData = await scheduleResponse.json();
        console.log('Schedule data:', scheduleData);

        // Get team name from the first game's data
        if (scheduleData.length > 0) {
          const game = scheduleData[0];
          const isHomeTeam = game.home_team_id === cleanTeamId;
          setTeamName(isHomeTeam ? game.home_team_name : game.away_team_name);
        }

        setSchedule(scheduleData);
        setLoading(false);
      } catch (err) {
        console.error('Schedule fetch error:', err);
        setError('Unable to load schedule. Please try again later.');
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [userTeamId]);

  const getRowStyle = (game, index) => {
    if (game.home_team_score !== null) {
      return "bg-gray-100"; // Completed games
    }
    const nextGameIndex = schedule.findIndex(g => g.home_team_score === null);
    if (index === nextGameIndex) {
      return "bg-blue-600 text-white"; // Next game
    }
    return "bg-white"; // Future games
  };

  const getOutcome = (game) => {
    if (game.home_team_score === null) return "-";
    
    const isHomeTeam = game.home_team_id === parseInt(userTeamId);
    const userScore = isHomeTeam ? game.home_team_score : game.away_team_score;
    const opponentScore = isHomeTeam ? game.away_team_score : game.home_team_score;
    
    return userScore > opponentScore ? "Win" : "Loss";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
            Scoutify.io
          </Link>
          <div className="flex space-x-4">
            <Link to="/profile">
              <Button variant="outline">Profile</Button>
            </Link>
            <Link to="/">
              <Button variant="scoutify">Logout</Button>
            </Link>
          </div>
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

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {teamName ? `${teamName}'s Schedule` : 'Schedule'}
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            {schedule.length > 0 ? getTeamRecord(schedule) : ''}
          </p>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading schedule...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            {error}
          </div>
        ) : schedule.length > 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Time</th>
                    <th className="px-6 py-3 text-left">Opponent</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Outcome</th>
                    <th className="px-6 py-3 text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((game, index) => (
                    <tr key={game.game_id} className={`border-t ${getRowStyle(game, index)}`}>
                      <td className="px-6 py-4">
                        {new Date(game.game_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {game.game_time.slice(0, 5)}
                      </td>
                      <td className="px-6 py-4">
                        {game.home_team_id === parseInt(userTeamId) 
                          ? game.away_team_name
                          : `@ ${game.home_team_name}`}
                      </td>
                      <td className="px-6 py-4">{game.location}</td>
                      <td className="px-6 py-4">{getOutcome(game)}</td>
                      <td className="px-6 py-4">
                        {game.home_team_score !== null 
                          ? `${game.home_team_score} - ${game.away_team_score}`
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-gray-600">
            No games scheduled at this time
          </div>
        )}
      </main>
    </div>
  );
};

export default Schedule;
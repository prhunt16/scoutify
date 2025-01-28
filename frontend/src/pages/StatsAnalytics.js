import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowUpIcon, ArrowDownIcon, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

const StatsAnalytics = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      fetchRoster(selectedTeam);
    }
  }, [selectedTeam]);

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/teams');
      if (!response.ok) throw new Error('Failed to fetch teams');
      const data = await response.json();
      const userTeamId = localStorage.getItem('userTeam');
      const filteredTeams = data.filter(team => team.team_id !== parseInt(userTeamId));
      setTeams(filteredTeams);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchRoster = async (teamId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/api/teams/${teamId}/roster`);
      if (!response.ok) throw new Error('Failed to fetch roster');
      const data = await response.json();
      setRoster(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedRoster = () => {
    if (!sortConfig.key) return roster;
    return [...roster].sort((a, b) => {
      if (sortConfig.key === 'name') {
        const aVal = `${a.first_name} ${a.last_name}`;
        const bVal = `${b.first_name} ${b.last_name}`;
        return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      let aVal = a[sortConfig.key] || 0;
      let bVal = b[sortConfig.key] || 0;
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
  };

  const SortArrow = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <div className="w-4 h-4 inline-block"></div>;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUpIcon className="w-4 h-4 inline-block text-blue-500" />
    ) : (
      <ArrowDownIcon className="w-4 h-4 inline-block text-blue-500" />
    );
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
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

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Stats & Analytics</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Team</h2>
          <div className="flex gap-4 flex-wrap">
            {teams.map(team => (
              <Button
                key={team.team_id}
                onClick={() => setSelectedTeam(team.team_id)}
                variant={selectedTeam === team.team_id ? "default" : "outline"}
              >
                {team.name}
              </Button>
            ))}
          </div>
        </div>

        {loading && <div className="text-gray-600">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {roster.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Team Roster</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left cursor-pointer hover:bg-gray-100" onClick={() => requestSort('name')}>
                      Name <SortArrow columnKey="name" />
                    </th>
                    <th className="px-6 py-3 text-left cursor-pointer hover:bg-gray-100" onClick={() => requestSort('position')}>
                      Position <SortArrow columnKey="position" />
                    </th>
                    <th className="px-6 py-3 text-right cursor-pointer hover:bg-gray-100" onClick={() => requestSort('avg_points')}>
                      Points <SortArrow columnKey="avg_points" />
                    </th>
                    <th className="px-6 py-3 text-right cursor-pointer hover:bg-gray-100" onClick={() => requestSort('avg_rebounds')}>
                      Rebounds <SortArrow columnKey="avg_rebounds" />
                    </th>
                    <th className="px-6 py-3 text-right cursor-pointer hover:bg-gray-100" onClick={() => requestSort('avg_assists')}>
                      Assists <SortArrow columnKey="avg_assists" />
                    </th>
                    <th className="px-6 py-3 text-right cursor-pointer hover:bg-gray-100" onClick={() => requestSort('avg_steals')}>
                      Steals <SortArrow columnKey="avg_steals" />
                    </th>
                    <th className="px-6 py-3 text-right cursor-pointer hover:bg-gray-100" onClick={() => requestSort('avg_blocks')}>
                      Blocks <SortArrow columnKey="avg_blocks" />
                    </th>
                    <th className="px-6 py-3 text-right cursor-pointer hover:bg-gray-100" onClick={() => requestSort('avg_turnovers')}>
                      TO <SortArrow columnKey="avg_turnovers" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedRoster().map(player => (
                    <tr
                      key={player.player_id}
                      className="border-t hover:bg-gray-100 cursor-pointer"
                      onClick={() => handlePlayerClick(player)}
                    >
                      <td className="px-6 py-4">{`${player.first_name} ${player.last_name}`}</td>
                      <td className="px-6 py-4">{player.position || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        {player.avg_points ? Number(player.avg_points).toFixed(1) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {player.avg_rebounds ? Number(player.avg_rebounds).toFixed(1) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {player.avg_assists ? Number(player.avg_assists).toFixed(1) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {player.avg_steals ? Number(player.avg_steals).toFixed(1) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {player.avg_blocks ? Number(player.avg_blocks).toFixed(1) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {player.avg_turnovers ? Number(player.avg_turnovers).toFixed(1) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className={cn(
          "fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
          "border-l border-gray-200 overflow-y-auto",
          selectedPlayer ? "translate-x-0" : "translate-x-full"
        )}>
          {selectedPlayer && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Player Details</h2>
                <button onClick={() => setSelectedPlayer(null)} className="text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
                  <div className="space-y-2">
                    <p>Name: {selectedPlayer.first_name} {selectedPlayer.last_name}</p>
                    <p>Position: {selectedPlayer.position}</p>
                    <p>Jersey: #{selectedPlayer.jersey_number}</p>
                    <p>Height: {selectedPlayer.height}</p>
                    <p>Weight: {selectedPlayer.weight} lbs</p>
                    <p>Year: {selectedPlayer.year}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Season Statistics</h3>
                  <div className="space-y-2">
                    <p>Points: {selectedPlayer.avg_points}</p>
                    <p>Rebounds: {selectedPlayer.avg_rebounds}</p>
                    <p>Assists: {selectedPlayer.avg_assists}</p>
                    <p>Steals: {selectedPlayer.avg_steals}</p>
                    <p>Blocks: {selectedPlayer.avg_blocks}</p>
                    <p>Turnovers: {selectedPlayer.avg_turnovers}</p>
                    <p>Minutes: {selectedPlayer.avg_minutes}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Scouting Report</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Offensive Strengths:</span> {selectedPlayer.offensive_strengths || 'Not evaluated'}</p>
                    <p><span className="font-medium">Offensive Weaknesses:</span> {selectedPlayer.offensive_weaknesses || 'Not evaluated'}</p>
                    <p><span className="font-medium">Offensive Tendencies:</span> {selectedPlayer.offensive_tendencies || 'Not evaluated'}</p>
                    <p><span className="font-medium">Defensive Strengths:</span> {selectedPlayer.defensive_strengths || 'Not evaluated'}</p>
                    <p><span className="font-medium">Defensive Weaknesses:</span> {selectedPlayer.defensive_weaknesses || 'Not evaluated'}</p>
                    <p><span className="font-medium">Defensive Tendencies:</span> {selectedPlayer.defensive_tendencies || 'Not evaluated'}</p>
                    <p><span className="font-medium">Notes:</span> {selectedPlayer.notes || 'No additional notes'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StatsAnalytics;
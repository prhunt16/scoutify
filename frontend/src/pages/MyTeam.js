import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';


const PlayerCard = ({ player, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, player)}
      className="bg-gray-50 p-3 mb-2 rounded-md shadow-sm flex items-center transition-all duration-300 ease-in-out"
    >
      <span>{player.jersey_number} - {player.first_name} {player.last_name}</span>
      <span className="text-gray-500">{player.position}</span>
    </div>
  );
};

const formatName = (firstName, lastName) => {
  return `${firstName[0]}. ${lastName}`;
};

const CourtDiagram = ({ starters }) => {
  const getPlayerPosition = (index) => {
    const positions = {
      0: { cx: "50", cy: "80", name: "1", labelY: "87" },    // Point guard bottom
      1: { cx: "90", cy: "60", name: "2", labelY: "67" },    // Right wing
      2: { cx: "10", cy: "60", name: "3", labelY: "67" },    // Left wing
      3: { cx: "25", cy: "25", name: "4", labelY: "32" },    // Left forward
      4: { cx: "75", cy: "25", name: "5", labelY: "32" }     // Right forward
    };
    return positions[index];
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <h2 className="text-xl font-semibold mb-6">Court View</h2>
      <div className="relative w-full" style={{ paddingBottom: "75%" }}>
        <svg 
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: '#ffffff' }}
        >
          {/*Half court outline*/}
          <rect x="0" y="10" width="98" height="90" fill="none" stroke="#333" strokeWidth="0.5"/>
          
          {/* Key/Paint lines*/}
          <line x1="33" y1="10" x2="33" y2="45" stroke="#333" strokeWidth="0.5"/>
          <line x1="64" y1="10" x2="64" y2="45" stroke="#333" strokeWidth="0.5"/>

          
          {/* Free throw line*/}
          <line x1="33" y1="45" x2="64" y2="45" stroke="#333" strokeWidth="0.5"/>
          
          {/* Free throw dashed half circle */}
          <path
            d="M 33 45 A 15 15 0 0 1 64 45"
            fill="none"
            stroke="#333"
            strokeWidth="0.5"
            strokeDasharray="2"
          />

          {/* Free throw consistent half circle */}
          <path 
          d="M 64 45 A 15 15 0 0 1 33 45" 
          fill="none" stroke="#333" 
          strokeWidth="0.5" 
          />
          
          {/* Three-point arc */} 
          <path 
          d="M 5 20 A 30 30 0 0 0 93 20"
          fill="none" 
          stroke="#333" 
          strokeWidth="0.5" 
          />
          {/* Three straight lines*/}
          <line x1="5" y1="10" x2="5" y2="20" stroke="#333" strokeWidth="0.5"/>
          <line x1="93" y1="10" x2="93" y2="20" stroke="#333" strokeWidth="0.5"/>
          
          {/* Backboard*/}
          <line x1="44" y1="11" x2="54" y2="11" stroke="#333" strokeWidth="0.5"/>

          {/* Basket */}
          <circle cx="49" cy="13" r="2" fill="#333"/>

          
          {/* Player positions */}
          {starters.map((player, index) => {
            const pos = getPlayerPosition(index);
            return (
              <g key={index}>
                {/* Player name */}
                <text
                  x={pos.cx}
                  y={pos.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="3"
                  fill="#DC2626"
                >
                  {formatName(player.first_name, player.last_name)}
                </text>
                {/* Position circle */}
                <circle 
                  cx={pos.cx} 
                  cy={pos.cy} 
                  r="4" 
                  fill="#FEF08A" 
                  stroke="#333"
                  strokeWidth="0.5"
                />
                {/* Position number */}
                <text
                  x={pos.cx}
                  y={pos.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="4"
                  fill="#000"
                >
                  {pos.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

const RosterContent = ({ players }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <table className="min-w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">#</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Position</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Year</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Height</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Weight</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {players.map((player) => (
          <tr key={player.player_id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-900">{player.jersey_number}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              {`${player.first_name} ${player.last_name}`}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">{player.position}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{player.year}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{player.height}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{player.weight}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LineupContent = React.memo(({ starters, bench, handleDragOver, handleDrop, handleDragStart, isDragging }) => {
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragEnter = (index) => {
    setDragOverIndex(index);
  };

  const handleDragLeave = (e) => {
    const dropTarget = e.target.closest('[draggable]');
    if (dropTarget) {
      dropTarget.classList.remove('drag-over');
    }
  };
  
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Lineup Builder</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Starting 5 {starters.length === 5 && <span className="text-sm text-gray-500">(Full)</span>}
            </h3>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'starters')}
              className={`min-h-[200px] border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
                isDragging ? 'bg-blue-50 border-blue-300' : 'border-gray-200'
              }`}
            >
              {starters.map((player, index) => (
                <div
                  key={player.player_id}
                  draggable
                  data-player-id={player.player_id}
                  onDragStart={(e) => handleDragStart(e, player)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragLeave={handleDragLeave}
                  className={`bg-gray-50 p-3 mb-2 rounded-md shadow-sm flex items-center transition-all duration-200 hover:bg-blue-100 hover:shadow-md ${
                    dragOverIndex === index ? 'border-2 border-blue-500 transform scale-105' : ''
                  }`}
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-3">
                    {index + 1}
                  </span>
                  <span className="flex-grow">{player.jersey_number} - {player.first_name} {player.last_name}</span>
                  <span className="text-gray-500">{player.position}</span>
                </div>
              ))}
              {dragOverIndex === starters.length && (
                <div className="h-16 bg-blue-200 border-2 border-blue-500 rounded-md mb-2 transition-all duration-200"></div>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200" />
          <div>
            <h3 className="text-lg font-semibold mb-3">Bench</h3>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'bench')}
              className={`min-h-[200px] border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
                isDragging ? 'bg-blue-50 border-blue-300' : 'border-gray-200'
              }`}
            >
              {bench.map((player) => (
                <div
                  key={player.player_id}
                  draggable
                  data-player-id={player.player_id}
                  onDragStart={(e) => handleDragStart(e, player)}
                  className="bg-gray-50 p-3 mb-2 rounded-md shadow-sm flex items-center justify-between transition-all duration-200 hover:bg-blue-100 hover:shadow-md"
                >
                  <span>{player.jersey_number} - {player.first_name} {player.last_name}</span>
                  <span className="text-gray-500">{player.position}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CourtDiagram starters={starters} />
    </div>
  );
});




const PlayStyleContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Play Style</h2>
    <div className="space-y-6">
      <p>Play style settings coming soon...</p>
    </div>
  </div>
);

const MyTeam = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [starters, setStarters] = useState([]);
  const [bench, setBench] = useState([]);
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const userTeamId = localStorage.getItem('userTeam');

  useEffect(() => {
    if (!userTeamId) {
      setError('Please select your team in Profile first');
      setLoading(false);
      return;
    }

    const fetchTeamAndPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        const cleanTeamId = parseInt(userTeamId);

        const rosterResponse = await fetch(`http://localhost:5001/api/teams/${cleanTeamId}/roster`);
        if (!rosterResponse.ok) throw new Error('Failed to fetch team roster');
        const playerData = await rosterResponse.json();
        setPlayers(playerData);
        setStarters(playerData.slice(0, 5));
        setBench(playerData.slice(5));

        const scheduleResponse = await fetch(`http://localhost:5001/api/teams/${cleanTeamId}/schedule`);
        if (!scheduleResponse.ok) throw new Error('Failed to fetch schedule');
        const scheduleData = await scheduleResponse.json();
        if (scheduleData.length > 0) {
          const game = scheduleData[0];
          setTeamName(game.home_team_id === cleanTeamId ? game.home_team_name : game.away_team_name);
        }

        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Unable to load team information. Please try again later.');
        setLoading(false);
      }
    };

    fetchTeamAndPlayers();
  }, [userTeamId]);

  const handleDragStart = (e, player) => {
    setDraggedPlayer(player);
    e.dataTransfer.effectAllowed = 'move';
  
    // Create a semi-transparent clone
    const draggedEl = e.target;
    const clone = draggedEl.cloneNode(true);
    clone.style.opacity = '0.5';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.transform = 'translateZ(0)';
    
    // Add clone to document
    document.body.appendChild(clone);
    
    // Set the drag image to our semi-transparent clone
    e.dataTransfer.setDragImage(clone, 0, 0);
  
    // Remove the clone after the drag operation
    requestAnimationFrame(() => {
      document.body.removeChild(clone);
    });
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const dropTarget = e.target.closest('[draggable]');
    if (dropTarget) {
      dropTarget.classList.add('drag-over');
    }
  };
  

  const handleDrop = (e, targetList) => {
    e.preventDefault();
    if (!draggedPlayer) return;
  
    const isFromStarters = starters.some(p => p.player_id === draggedPlayer.player_id);
    const isFromBench = bench.some(p => p.player_id === draggedPlayer.player_id);
  
    // Get the target element being dropped on
    const dropTarget = e.target.closest('[draggable]');
    
    if (isFromStarters && targetList === 'starters' && dropTarget) {
      // Handle reordering within starters
      const newStarters = [...starters];
      const draggedIndex = starters.findIndex(p => p.player_id === draggedPlayer.player_id);
      const dropIndex = starters.findIndex(p => p.player_id === parseInt(dropTarget.getAttribute('data-player-id')));
      
      // Remove from old position and insert at new position
      newStarters.splice(draggedIndex, 1);
      newStarters.splice(dropIndex, 0, draggedPlayer);
      setStarters(newStarters);
    } else if (isFromStarters && targetList === 'bench') {
      setStarters(starters.filter(p => p.player_id !== draggedPlayer.player_id));
      setBench([...bench, draggedPlayer]);
    } else if (isFromBench && targetList === 'starters' && starters.length < 5) {
      setBench(bench.filter(p => p.player_id !== draggedPlayer.player_id));
      setStarters([...starters, draggedPlayer]);
    }
  
    setDraggedPlayer(null);
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
          <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {teamName ? teamName : 'My Team'}
        </h1>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            {error}
          </div>
        ) : (
          <Tabs defaultValue="roster" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="roster">Roster</TabsTrigger>
              <TabsTrigger value="lineup">Lineup Builder</TabsTrigger>
              <TabsTrigger value="playstyle">Play Style</TabsTrigger>
            </TabsList>
            <TabsContent value="roster">
              <RosterContent players={players} />
            </TabsContent>
            <TabsContent value="lineup">
              <LineupContent 
                starters={starters}
                bench={bench}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleDragStart={handleDragStart}
              />
            </TabsContent>
            <TabsContent value="playstyle">
              <PlayStyleContent />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default MyTeam;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const FilmRoom = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/games/${gameId}`);
        if (!response.ok) throw new Error('Failed to fetch game details');
        const gameData = await response.json();
        setGame(gameData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Unable to load game information');
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGameDetails();
    }
  }, [gameId]);

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

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            {error}
          </div>
        ) : game ? (
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            {game.away_team_name} @ {game.home_team_name}
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Film Room</h1>
        )}
        {/* Add Film Room specific content here */}
      </main>
    </div>
  );
};

export default FilmRoom;

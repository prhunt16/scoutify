const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all teams
router.get('/teams', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get team roster with season stats and scouting details
router.get('/teams/:teamId/roster', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.player_id,
        p.first_name,
        p.last_name,
        p.position,
        p.jersey_number,
        p.height,
        p.weight,
        p.year,
        p.offensive_strengths,
        p.offensive_weaknesses,
        p.offensive_tendencies,
        p.defensive_strengths,
        p.defensive_weaknesses,
        p.defensive_tendencies,
        ss.avg_points,
        ss.avg_rebounds,
        ss.avg_assists,
        ss.avg_steals,
        ss.avg_blocks
      FROM player p
      LEFT JOIN season_stats ss ON p.player_id = ss.player_id
      WHERE p.team_id = $1
      ORDER BY ss.avg_points DESC NULLS LAST
    `, [req.params.teamId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update player scouting tags
router.patch('/players/:playerId/tags', async (req, res) => {
  try {
    const { 
      offensive_strengths,
      offensive_weaknesses,
      offensive_tendencies,
      defensive_strengths,
      defensive_weaknesses,
      defensive_tendencies
    } = req.body;
    
    const result = await pool.query(`
      UPDATE player 
      SET offensive_strengths = $1,
          offensive_weaknesses = $2,
          offensive_tendencies = $3,
          defensive_strengths = $4,
          defensive_weaknesses = $5,
          defensive_tendencies = $6
      WHERE player_id = $7
      RETURNING *
    `, [
      offensive_strengths,
      offensive_weaknesses,
      offensive_tendencies,
      defensive_strengths,
      defensive_weaknesses,
      defensive_tendencies,
      req.params.playerId
    ]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get team schedule
router.get('/teams/:teamId/schedule', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        g.*,
        ht.name as home_team_name,
        at.name as away_team_name
      FROM games g
      JOIN team ht ON g.home_team_id = ht.team_id
      JOIN team at ON g.away_team_id = at.team_id
      WHERE g.home_team_id = $1 OR g.away_team_id = $1
      ORDER BY g.game_date, g.game_time
    `, [req.params.teamId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new game to schedule
router.post('/games', async (req, res) => {
  const { home_team_id, away_team_id, game_date, game_time, location, season_year } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO games 
      (home_team_id, away_team_id, game_date, game_time, location, season_year)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [home_team_id, away_team_id, game_date, game_time, location, season_year]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update game details
router.put('/games/:gameId', async (req, res) => {
  const { home_team_score, away_team_score, game_status } = req.body;
  try {
    const result = await pool.query(`
      UPDATE games
      SET home_team_score = $1,
          away_team_score = $2,
          game_status = $3
      WHERE game_id = $4
      RETURNING *
    `, [home_team_score, away_team_score, game_status, req.params.gameId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
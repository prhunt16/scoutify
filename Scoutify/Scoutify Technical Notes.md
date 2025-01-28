prhunt@Ryans-MacBook-Pro scoutify-project % 

**Activate venv =** source venv/bin/activate
**Engage SQL =** psql -U postgres
**Engage database =** psql -U postgres -d basketball_league
**Password =** scoutify
**Engage frontend =** cd frontend
**Initiate frontend =**   npm start


Data tables:
- game_plays
	- play_id
	- game_id
	- time_stamp
	- team_id
	- player_id
	- play_type
	- points
	- assist_player_id
	- description
	- quarter
	- home_score
	- away_score
- game_schedule
	- game_id
	- home_team_id
	- away_team_id
	- game_date
	- game_time
	- location
	- game_type
	- status
	- home_team_score
	- away_team_score
	- notes
- game_stats
	- stat_id
	- player_id
	- game_date
	- points
	- rebounds
	- assists
	- steals
	- blocks
	- turnovers
	- minutes_played
- games
	- game_id
	- home_team_id
	- away_team_id
	- game_date
	- game_time  
	- location
	- home_team_score
	- away_team_score
	- game_status
	- season_year 
- player
	- player_id
	- team_id
	- first_name
	- last_name
	- jersey_number
	- position
	- height
	- weight
	- year           
	- notes
	- offensive_strengths
	- offensive_weaknesses
	- offensive_tendencies
	- defensive_strengths
	- defensive_weaknesses
	- defensive_tendencies
- season_stats
	- stat_id
	- player_id
	- season_year
	- games_played
	- avg_points
	- avg_rebounds
	- avg_assists
	- avg_steals
	- avg_blocks
	- avg_turnovers
	- avg_minutes 
- team
	- team_id  
	- name  
	- street
	- city
	- state
	- colors 
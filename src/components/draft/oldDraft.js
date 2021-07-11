import React from 'react';
import api from '../api/api';
import selectionService from '../services/selectionService';
import Button from 'react-bootstrap/Button';


export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: props.team,
      players: [],
      teams: [],
      picks: []
    }
  }

  async componentDidMount() {
    const apiPlayers = await api.getPlayers();
    const sortedPlayers = apiPlayers.data.sort((p1, p2) => (p1.rank > p2.rank) ? 1 : -1);

    sortedPlayers.map((player) => {
      player.selected = false;
    })

    const apiTeams = await api.getTeams();
    const teams = apiTeams.data;

    const apiPositions = await api.getPositions();
    const positions = apiPositions.data;

    let tempOrder = [];

    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const teamPicks = team.picks;
      for (let j = 0; j < teamPicks.length; j++) {
        tempOrder[teamPicks[j] -1] = {
          name: team.name,
          city: team.city,
          needs: team.needs
        };
      }
    }

    for (let i = 0; i < tempOrder.length; i++) {
      const team = tempOrder[i];
      const pick = await selectionService.makeSelection(i, team, sortedPlayers, positions);
      tempOrder[i].pick = pick;
    }

    this.setState({
      players: sortedPlayers,
      teams: teams,
      picks: tempOrder
    })
  }

  render() {
    const { players, teams, picks } = this.state;
    return (
      <div className="container">
        <Button variant="primary" onClick={() => this.props.setScreen("options")}>Back</Button>
        <div className="row">
          <div className="col-sm">
            <ul>
              {picks.map(team => (
                <li key={team.id}>
                  {team.city} {team.name} - {team.pick.firstName} {team.pick.lastName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
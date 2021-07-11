import React from 'react';
import api from '../api/api';


export default class Selections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    console.log(apiTeams);
    this.setState({
      players: sortedPlayers,
      teams: apiTeams.data
    })
  }

  render() {
    const { players, teams } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <ol>
              {players.map(item => (
                <li key={item.id}>
                  {item.firstName} {item.lastName} - {item.position} - {item.program}
                </li>
              ))}
            </ol>

          </div>
          <div className="col-sm">
            <ul>
              {teams.map(item => (
                <li key={item.id}>
                  {item.city} {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
import React from 'react'; 
import api from '../../api/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlayerList from './PlayerList';
import History from './History';
import selectionService from '../../services/selectionService';



export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availablePlayers: [],
      usersTurn: false,
      usersTeam: this.props.usersTeam,
      pickHistory: [],
      draftOrder: [],
      positions: [],
      pickInterval: null
    }
    this.makePick = this.makePick.bind(this);
  };

  async makePick() {
    const interval = this.state.pickInterval;
    const team = this.state.draftOrder[0];
    const pick = await selectionService.makeSelection(team, this.state.availablePlayers, this.state.positions);
    const history = this.state.pickHistory;
    pick.team = team;
    history.push(pick);
    this.setState({
      draftOrder: this.state.draftOrder.slice(1),
      pickHistory: history
    })

    if (this.state.draftOrder.length === 0) {
      clearInterval(this.state.pickInterval);
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

    this.setState({
      draftOrder: tempOrder,
      availablePlayers: sortedPlayers,
      positions: positions
    });

    const interval = setInterval(this.makePick, 100);
    this.setState({pickInterval: interval})
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h3>Picking for: {this.state.usersTeam}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <PlayerList players={this.state.availablePlayers}/>
          </Col>
          <Col>
            <History
              players={this.state.players}
              pickHistory={this.state.pickHistory}/>
          </Col>
        </Row>
      </Container>
    )
  }
}
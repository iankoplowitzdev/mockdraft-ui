import React from 'react'; 
import api from '../../api/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PlayerList from './PlayerList';
import History from './History';



export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      usersTurn: false,
      team: this.props.team,
      pickHistory: []
    }
  };

  async componentDidMount() {
    const apiPlayers = await api.getPlayers();
    const sortedPlayers = apiPlayers.data.sort((p1, p2) => (p1.rank > p2.rank) ? 1 : -1);

    sortedPlayers.map((player) => {
      player.selected = false;
    })

    this.setState({players: sortedPlayers});

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
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <PlayerList players={this.state.players}/>
          </Col>
          <Col>
            <History />
          </Col>
        </Row>
      </Container>
    )
  }
}
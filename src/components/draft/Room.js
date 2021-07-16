import React, { useState, useEffect } from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from './Board';
import History from './History';
import Api from '../../api/Api';
import Button from 'react-bootstrap/Button';


const Room = (props) => {
  const [draftData, setDraftData] = useState();

  const handleDraftStart = () => {
    const newDraftData = {
      ...draftData
    }
    newDraftData.canStartDraft = true;
    setDraftData(newDraftData);
  }

  useEffect(() => {
    const initializeDraftData = async () => {
      const apiPlayers = await Api.getPlayers();
      const sortedPlayers = apiPlayers.data.sort((p1, p2) => (p1.rank > p2.rank) ? 1 : -1);
  
      const apiPositions = await Api.getPositions();
      const positions = apiPositions.data;
  
      let teamsInDraftOrder = [];
  
      for (let i = 0; i < props.nflTeams.length; i++) {
        const team = props.nflTeams[i];
        const teamPicks = team.picks;
        for (let j = 0; j < teamPicks.length; j++) {
          teamsInDraftOrder[teamPicks[j] -1] = team;
        }
      }
  
      setDraftData({
        usersTurn: props.usersTeam.abbreviation === teamsInDraftOrder[0].abbreviation,
        usersTeam: props.usersTeam,
        draftOrder: teamsInDraftOrder,
        availablePlayers: sortedPlayers,
        pickHistory: [],
        positions: positions,
        canStartDraft: false,
        isComplete: false
      });
    }

    initializeDraftData();

  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Picking for: {props.usersTeam.name}</h3>
          <Button className="ml-auto" onClick={handleDraftStart}>Start drafting</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Board
            draftData={draftData}
            setDraftData={setDraftData}/>
        </Col>
        <Col>
          <History
            draftData={draftData}
            setDraftData={setDraftData}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Room;
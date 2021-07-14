import React, { useEffect, useState } from 'react'; 
import Api from '../../api/Api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PlayerList from './PlayerList';
import History from './History';
import selectionService from '../../services/selectionService';



export default function Room(props) {
  const [pickHistory, setPickHistory] = useState([]);

  useEffect(() => {

    console.log(props.draftOrder);

    if (props.draftOrder.length === 0 || !props.canStartDraft){
      return;
    }

    if (props.draftOrder[0].abbreviation === props.usersTeam.abbreviation) {
      return;
    }



    setTimeout(() => {
      const team = props.draftOrder[0];
      const pick = selectionService.makeSelection(team, props.availablePlayers, props.positions);
      const history = pickHistory;
      pick.team = team;
      history.push(pick);
      props.setDraftOrder(props.draftOrder.slice(1));
      setPickHistory(history);

      const playerIndexToRemove = selectionService.findPlayerIndexInAvailablePlayers(pick._id, props.availablePlayers);
      props.availablePlayers.splice(playerIndexToRemove, 1)
      props.setAvailablePlayers(props.availablePlayers);
    }, 1000)

 
  });

  function startDraft() {
    props.setCanStartDraft(true);
  }

  function selectPlayer(player) {
    const history = pickHistory;
    player.team = props.usersTeam;
    history.push(player);
    props.setDraftOrder(props.draftOrder.slice(1));
    setPickHistory(history);

    const playerIndexToRemove = selectionService.findPlayerIndexInAvailablePlayers(player._id, props.availablePlayers);
    props.availablePlayers.splice(playerIndexToRemove, 1)
    props.setAvailablePlayers(props.availablePlayers);
  }



  return (
    <Container>
      <Row>
        <Col>
          <h3>Picking for: {props.usersTeam.name}</h3>
          <Button variant="primary" disabled={props.canStartDraft} onClick={startDraft}>
            Start draft!
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <PlayerList isUsersTurn={props.draftOrder[0].abbreviation === props.usersTeam.abbreviation} selectPlayer={selectPlayer} players={props.availablePlayers}/>
        </Col>
        <Col>
          <History pickHistory={pickHistory}/>
        </Col>
      </Row>
    </Container>
  )
} 
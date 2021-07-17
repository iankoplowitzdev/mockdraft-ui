import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from './Board.module.css';
import { useEffect, Fragment } from 'react';
import selectionService from '../../services/selectionService';


export default function Board(props) {

  const draftData = props.draftData;

  useEffect(() => {
    if (!draftData || !draftData.draftOrder) {
      return;
    }

    if (draftData.draftOrder.length === 0 || !draftData.canStartDraft){
      return;
    }
  
    if (draftData.usersTurn) {
      return;
    }

    setTimeout(() => {
      processSelection();

      const hasNextPick = draftData.draftOrder.length > 0;
      if (!hasNextPick) {
        props.setScreen('results');
        return;
      }
      
      if (draftData.draftOrder[0].abbreviation === draftData.usersTeam.abbreviation) {
        draftData.usersTurn = true;
      }
  
      const newDraftData = {
        ...draftData
      }
      props.setDraftData(newDraftData);
    }, draftData.usersSpeed || 1000);
  });

  const processSelection = (player) => {
    const currentTeamSelecting = draftData.draftOrder[0];
    const pick = player || selectionService.makeSelection(currentTeamSelecting, draftData.availablePlayers, draftData.positions);;
    const history = draftData.pickHistory;
    pick.team = currentTeamSelecting;
    history.push(pick);
    draftData.draftOrder = draftData.draftOrder.slice(1);
    draftData.pickHistory = history;

    const playerIndexToRemove = selectionService.findPlayerIndexInAvailablePlayers(pick._id, draftData.availablePlayers);
    draftData.availablePlayers.splice(playerIndexToRemove, 1);
  }

  function selectPlayer(player) {
    processSelection(player);

    const hasNextPick = draftData.draftOrder.length > 0;
    if (!hasNextPick) {
      props.setScreen('results');
      return;
    }

    draftData.usersTurn = false;
    const newDraftData = {
      ...draftData
    }
    props.setDraftData(newDraftData);
  }

  const NameTag = (props) => {
    if (props.isUsersTurn && props.canStartDraft) {
      return (
        <Fragment>
          <span>
            {props.player.firstName} {props.player.lastName} | {props.player.position} | {props.player.program}
          </span>
          <Button className="ml-auto" onClick={() => selectPlayer(props.player)}>Draft</Button>
        </Fragment>
      )
    }
  
    return (
      <span>
        {props.player.firstName} {props.player.lastName} | {props.player.position} | {props.player.program}
      </span>
    )
  }

  if (!draftData || draftData.availablePlayers === 0) {
    return(<span>Loading...</span>)
  }

  const renderablePlayerList = draftData.availablePlayers.map((player, index) =>
    // @todo figure out better way to make unique key
    <Card className="mb-2" key={`card${player.firstName}${player.lastName}${index}`}>
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <NameTag player={player} isUsersTurn={draftData.usersTurn} canStartDraft={draftData.canStartDraft}/>
      </Card.Body>
    </Card>
  );



  return (
    <Card body className={styles.playerListContainer}>{renderablePlayerList}</Card>
  )
}
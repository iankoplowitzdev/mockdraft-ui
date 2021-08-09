import React, { useEffect } from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Board from './Board';
import History from './History';
import Controls from './Controls';
import Header from './Header';
import selectionService from '../../../services/selectionService';


export default function Room(props) {
  // we're okay losing this reference on each re-render
  let timeout;

  // variable to guard setting state if control
  // button is selected in rapid succession
  let hasPressedControlButton = false;

  const draftData = props.draftData;

  const selectPlayer = (player) => {
    processSelection(player);

    const hasNextPick = draftData.draftOrder.length > 0;
    if (!hasNextPick) {
      props.setScreen('results');
      return;
    }

    draftData.isUsersTurn = false;
    const newDraftData = {
      ...draftData
    }
    props.setDraftData(newDraftData);
  }

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

  const handleDraftPlay = () => {
    if (hasPressedControlButton) return;

    hasPressedControlButton = true;

    const newDraftData = {
      ...props.draftData
    }
    newDraftData.isPaused = false;
    props.setDraftData(newDraftData);
  }

  const handleDraftPause = () => {
    if (hasPressedControlButton) return;

    hasPressedControlButton = true;

    clearTimeout(timeout);
    const newDraftData = {
      ...props.draftData
    }
    newDraftData.isPaused = true;
    props.setDraftData(newDraftData);
  }

  const handleDraftBegin = () => {
    hasPressedControlButton = true;

    const newDraftData = {
      ...props.draftData
    }
    newDraftData.hasStarted = true;
    newDraftData.isPaused = false;
    props.setDraftData(newDraftData);
  }

  const handlePositionFilter = (selectedPosition) => {
    const newDraftData = {
      ...props.draftData
    }

    for (let i = 0; i < newDraftData.filteredPositions.length; i++) {
      if (newDraftData.filteredPositions[i].abbreviation == selectedPosition) {
        newDraftData.filteredPositions[i].selected = !newDraftData.filteredPositions[i].selected;
        break;
      }
    }

    props.setDraftData(newDraftData);
  }

  useEffect(() => {
    if (draftData.hasStarted && !draftData.isPaused && !draftData.isUsersTurn){
      timeout = setTimeout(() => {
        processSelection();
  
        const hasNextPick = draftData.draftOrder.length > 0;
        if (!hasNextPick) {
          props.setScreen('results');
          return;
        }
        
        if (draftData.draftOrder[0].abbreviation === draftData.usersTeam.abbreviation) {
          draftData.isUsersTurn = true;
        }
    
        const newDraftData = {
          ...draftData
        }
        props.setDraftData(newDraftData);
      }, draftData.usersSpeed || 100);
    }
  });

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Header team={`${props.draftData.usersTeam.city} ${props.draftData.usersTeam.name}`} />
        </Col>
        <Col className="d-flex justify-content-end">
          <Controls
            play={handleDraftPlay}
            pause={handleDraftPause}
            begin={handleDraftBegin}
            hasStarted={props.draftData.hasStarted}
            isPaused={props.draftData.isPaused}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Board
            availablePlayers={draftData.availablePlayers}
            isUsersTurn={draftData.isUsersTurn}
            hasStarted={draftData.hasStarted}
            selectPlayer={selectPlayer}
            positions={draftData.positions}
            handlePositionFilter={handlePositionFilter}
            filteredPositions={draftData.filteredPositions}/>
        </Col>
        <Col>
          <History
            draftData={props.draftData}
            setDraftData={props.setDraftData}/>
        </Col>
      </Row>
    </Container>
  )
}
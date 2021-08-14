import React, { useEffect } from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Board from './Board';
import Trades from './Trades';
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
    const currentTeamSelecting = draftData.draftOrder[0].team;
    const pick = player || selectionService.makeSelection(currentTeamSelecting, draftData.availablePlayers, draftData.positions);;
    const history = draftData.pickHistory;
    pick.team = currentTeamSelecting;
    history.push(pick);
    draftData.draftOrder = draftData.draftOrder.slice(1);
    draftData.fullDraftOrder = draftData.fullDraftOrder.slice(1);
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
    // clear the timeout to prevent additional renders considering
    // a new render cycle will begin from the state getting set at
    // the end of this function.
    clearTimeout(timeout);

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

  const handleTrade = (usersPicks, otherTeamsPicks) => {
    const arraysContainPicks = usersPicks.length > 0 && otherTeamsPicks.length > 0;
    let userPicksValue = 0;
    let otherTeamPicksValue = 0;
    const usersTeam = usersPicks[0].team;
    const otherTeam = otherTeamsPicks[0].team;

    for (let i = 0; i < usersPicks.length; i++) {
      userPicksValue += usersPicks[i].tradeChartValue;
    }

    for (let i = 0; i < otherTeamsPicks.length; i++) {
      otherTeamPicksValue += otherTeamsPicks[i].tradeChartValue;
    }

    const isAcceptedTrade = arraysContainPicks && (userPicksValue > otherTeamPicksValue);

    const tempDraftOrder = props.draftData.fullDraftOrder;
    
    if (!isAcceptedTrade) {
      // @todo update this with alert
      console.log("Trade not accepted.");
      return;
    }

    const newDraftData = {
      ...props.draftData
    }

    for (let i = 0; i < tempDraftOrder.length; i++) {
      const currentPick = tempDraftOrder[i];

      if (usersPicks.includes(currentPick)) {
        currentPick.team = otherTeam;
      }
      else if (otherTeamsPicks.includes(currentPick)) {
        currentPick.team = usersTeam;
      }
    }

    if (tempDraftOrder[0].team.name === props.draftData.usersTeam.name) {
      newDraftData.isUsersTurn = true;
    }

    props.setDraftData(newDraftData);
  }

  const TradesDisplay = () => {
    if (props.draftData.isUsersTurn || !props.draftData.isPaused) {
      return <span></span>
    }

    return (
      <Trades
        fullDraftOrder={draftData.fullDraftOrder}
        usersTeam={draftData.usersTeam}
        handleTrade={handleTrade}/>
    )
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
        
        if (draftData.draftOrder[0].team.abbreviation === draftData.usersTeam.abbreviation) {
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
    <div className="uk-container">
      <div className="uk-grid">
        <div className="uk-width-1-2">
          <Header team={`${props.draftData.usersTeam.city} ${props.draftData.usersTeam.name}`} />
        </div>
        <div className="uk-width-1-2">
          <Controls
              play={handleDraftPlay}
              pause={handleDraftPause}
              begin={handleDraftBegin}
              hasStarted={props.draftData.hasStarted}
              isPaused={props.draftData.isPaused}/> 
        </div>
        <div className="uk-width-1-2">
          <Board
            availablePlayers={draftData.availablePlayers}
            isUsersTurn={draftData.isUsersTurn}
            hasStarted={draftData.hasStarted}
            selectPlayer={selectPlayer}
            positions={draftData.positions}
            handlePositionFilter={handlePositionFilter}
            filteredPositions={draftData.filteredPositions}/>
        </div>
        <div className="uk-width-1-2">
          <History
            draftData={props.draftData}
            setDraftData={props.setDraftData}/>
        </div>
      </div>
    </div>
    
  )
}
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function setUsersTeam(draftData, setDraftData, team) {
  const newDraftData = {
    ...draftData
  }
  newDraftData.usersTeam = team;
  newDraftData.isUsersTurn = team.abbreviation === draftData.fullDraftOrder[0].team.abbreviation;
  setDraftData(newDraftData);
}

function setUsersSpeed(draftData, setDraftData, speed) {
  const newDraftData = {
    ...draftData
  }
  newDraftData.usersSpeed = speed;
  setDraftData(newDraftData);
}

function setDraftOrder(draftData, setDraftData, numRounds) {
  const newDraftData = {
    ...draftData
  }

  delete newDraftData.draftOrder;

  let numSelections = 0;

  for (let i = 0; i < numRounds; i++) {
    numSelections += draftData.numSelections[i];
  }

  newDraftData.draftOrder = draftData.fullDraftOrder.slice(0, numSelections);

  newDraftData.hasSelectedNumRounds = true;
  newDraftData.selectedNumRounds = numRounds;
  setDraftData(newDraftData);
}

function SpeedList(props) {
  const speeds = [
    { 
      description: 'Slow',
      speed: 3000
    },
    { 
      description: 'Medium',
      speed: 1000
    },
    { 
      description: 'Fast',
      speed: 100
    }
  ];
  
  const renderedSpeeds = speeds.map((speedObj) => 
    <div className="uk-width-1-3@m">
      <button
        className={`uk-button uk-button-${props.draftData.usersSpeed == speedObj.speed ? 'primary' : 'default'} uk-width-1-1`}
        onClick={() => setUsersSpeed(props.draftData, props.setDraftData, speedObj.speed)}>{speedObj.description}</button>
    </div>
  );

  return renderedSpeeds;
}

function TeamList(props) {
  const renderedTeams = props.teams.map((team) => 
    <div className="uk-width-1-4@m">
      <button
        className={`uk-button uk-button-${props.draftData.usersTeam?.name == team.name ? 'primary' : 'default'} uk-width-1-1 uk-margin-bottom`}
        onClick={() => setUsersTeam(props.draftData, props.setDraftData, team)}>{team.name}</button>
    </div>
  );

  return renderedTeams;
}

function RoundList(props) {
  const renderedRounds = [];

  for (let i = 1; i <= 7; i++) {
    renderedRounds.push(
      <div className="uk-width-1-4@m">
        <button
          className={`uk-button uk-button-${props.draftData.selectedNumRounds == i ? 'primary' : 'default'} uk-width-1-1 uk-margin-bottom`}
          onClick={() => setDraftOrder(props.draftData, props.setDraftData, i)}>{i}</button>
      </div>
    )
  }

  return renderedRounds;
}


export default function Options (props) {
  const canGoToNextScreen = !props.draftData.usersTeam || !props.draftData.hasSelectedNumRounds || !props.draftData.usersSpeed;
  if (!props.draftData.nflTeams || !props.draftData.fullDraftOrder) {
    // @todo implement loading spinner
    return <span></span>
  }
  return (
    <div className="uk-container">
      <div class="uk-card uk-card-secondary uk-card-body uk-margin-bottom">
          <h3 class="uk-card-title">Select your team:</h3>
          <div className="uk-grid uk-child-width-expand">
            <TeamList teams={props.draftData.nflTeams} draftData={props.draftData} setDraftData={props.setDraftData}/>
          </div>
      </div>
      <div class="uk-card uk-card-secondary uk-card-body uk-margin-bottom">
          <h3 class="uk-card-title">Select your speed:</h3>
          <div className="uk-grid">
            <SpeedList draftData={props.draftData} setDraftData={props.setDraftData}/>
          </div>
      </div>
      <div class="uk-card uk-card-secondary uk-card-body uk-margin-bottom">
          <h3 class="uk-card-title">Rounds to simulate:</h3>
          <div className="uk-grid">
            <RoundList draftData={props.draftData} setDraftData={props.setDraftData}/>
          </div>
      </div>
      <div className="uk-margin-bottom">
        <button 
          className="uk-button uk-button-secondary uk-margin-auto"
          onClick={() => props.setScreen("draft")}
          disabled={canGoToNextScreen}>
            Next
          </button>
      </div>
    </div>

  )
}
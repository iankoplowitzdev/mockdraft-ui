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
    <Col className="mb-2" md={4} key={`speed-${speedObj.speed}`}>
      <Button
        className={`w-100 btn btn-${props.draftData.usersSpeed == speedObj.speed ? 'success' : 'light'}`}
        onClick={() => setUsersSpeed(props.draftData, props.setDraftData, speedObj.speed)}>{speedObj.description}</Button>
    </Col>
  );

  return renderedSpeeds;
}

function TeamList(props) {
  const renderedTeams = props.teams.map((team) => 
    <Col className="mb-2" md={3} key={team.abbreviation}>
      <Button
        className={`w-100 btn btn-${props.draftData.usersTeam?.name == team.name ? 'success' : 'light'}`}
        onClick={() => setUsersTeam(props.draftData, props.setDraftData, team)}>{team.name}</Button>
    </Col>
  );

  return renderedTeams;
}

function RoundList(props) {
  const renderedRounds = [];

  for (let i = 1; i <= 7; i++) {
    renderedRounds.push(
      <Col className="mb-2" key={`round${i}`}>
        <Button
          className={`w-100 btn btn-${props.draftData.selectedNumRounds == i ? 'success' : 'light'}`}
          onClick={() => setDraftOrder(props.draftData, props.setDraftData, i)}>{i}</Button>
      </Col>
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
    <Container>
      <Row className="mb-2">
        <Col md={12}>
          <h4 className="text-light">Select your team:</h4>
        </Col>
        <TeamList teams={props.draftData.nflTeams} draftData={props.draftData} setDraftData={props.setDraftData}/>
      </Row>
      <Row className="mb-2">
        <Col md={12}>
          <h4 className="text-light">Select your speed:</h4>
        </Col>
        <SpeedList draftData={props.draftData} setDraftData={props.setDraftData} />
      </Row>
      <Row className="mb-2">
        <Col md={12}>
          <h4 className="text-light">Rounds to simulate:</h4>
        </Col>
        <RoundList draftData={props.draftData} setDraftData={props.setDraftData}/>
      </Row>
      <Row className="mb-2 mx-auto w-100">
        <Col className="d-flex justify-content-center">
          <Button
            onClick={() => props.setScreen("draft")}
            disabled={canGoToNextScreen}>
              Next
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
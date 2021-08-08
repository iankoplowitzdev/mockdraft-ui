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
  newDraftData.isUsersTurn = team.abbreviation === draftData.draftOrder[0].abbreviation;
  setDraftData(newDraftData);
}

function setUsersSpeed(draftData, setDraftData, speed) {
  const newDraftData = {
    ...draftData
  }
  newDraftData.usersSpeed = speed;
  setDraftData(newDraftData);
}

function TeamList(props) {
  const renderedTeams = props.teams.map((team) => 
    <Col className="mb-2" md={3} key={team.abbreviation}>
      <Button className="w-100 btn btn-dark" variant="primary" onClick={() => setUsersTeam(props.draftData, props.setDraftData, team)}>{team.name}</Button>
    </Col>
  );

  return renderedTeams;
}


export default function Options (props) {
  if (!props.draftData.nflTeams || !props.draftData.draftOrder) {
    // @todo implement loading spinner
    return <span></span>
  }
  return (
    <Container>
      <Row className="mb-2">
        <Col md={12}>
          <h4>Select your team:</h4>
        </Col>
        <TeamList teams={props.draftData.nflTeams} draftData={props.draftData} setDraftData={props.setDraftData}/>
      </Row>
      <Row className="mb-2">
        <Col md={12}>
          <h4>Select your speed (default is fast):</h4>
        </Col>
        <Col className="mb-2" md={4}>
          <Button className="w-100 btn btn-dark" variant="primary" onClick={() => setUsersSpeed(props.draftData, props.setDraftData, 3000)}>Slow</Button>
        </Col>
        <Col className="mb-2" md={4}>
          <Button className="w-100 btn btn-dark" variant="primary" onClick={() => setUsersSpeed(props.draftData, props.setDraftData, 1000)}>Medium</Button>
        </Col>
        <Col className="mb-2" md={4}>
          <Button className="w-100 btn btn-dark" variant="primary" onClick={() => setUsersSpeed(props.draftData, props.setDraftData, 100)}>Fast</Button>
        </Col>
      </Row>
      <Row className="mb-2 mx-auto w-100">
        <Col className="d-flex justify-content-center">
          <Button
            variant={props.draftData.usersTeam ? "success" : "secondary"}
            onClick={() => props.setScreen("draft")}
            disabled={!props.draftData.usersTeam}>
              Next
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
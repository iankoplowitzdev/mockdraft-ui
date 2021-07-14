import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function TeamList(props) {
  const renderedTeams = props.teams.map((team) => 
    <Col className="mb-2" md={3}>
      <Button className="w-100" variant="primary" onClick={() => props.setUsersTeam(team)}>{team.name}</Button>
    </Col>
  );

  return renderedTeams;
}


export default function Options (props) {
  if (!props.nflTeams) {
    // @todo implement loading spinner
    return <span></span>
  }
  return (
    <Container>
      <Row className="mb-2">
        <Col md={12}>
          <h2>Select your team:</h2>
        </Col>
        <TeamList teams={props.nflTeams} setUsersTeam={props.setUsersTeam}/>
      </Row>
      <Row className="mb-2 mx-auto w-100">
        <Col className="d-flex justify-content-center">
          <Button variant={props.usersTeam ? "success" : "secondary"} onClick={() => props.setScreen("draft")} disabled={!props.usersTeam}>Next</Button>
        </Col>
      </Row>
    </Container>
  )
}

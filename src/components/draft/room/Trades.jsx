import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import styles from './Board.module.css';
import Filter from './Filter';
import { Fragment, useState } from 'react';


export default function Trades(props) {
  const [otherTeamsPicks, setOtherTeamsPicks] = useState([]);
  const [userTeamsPicks, setUserTeamsPicks] = useState([]);
  // let otherTeamsPicks = [];
  // let userTeamsPicks = []


  const handleOtherTeamPickToggle = (incomingPick) => {
    if (otherTeamsPicks.includes(incomingPick)) {
      const tempOtherTeamsPicks = otherTeamsPicks.filter((pick) => 
          pick.round != incomingPick.round
          || pick.selection != incomingPick.selection
      );
      setOtherTeamsPicks(tempOtherTeamsPicks);
    }
    else{
      otherTeamsPicks.push(incomingPick);
      const tempOtherTeamsPicks = [...otherTeamsPicks];
      setOtherTeamsPicks(tempOtherTeamsPicks);
    }
  };

  const handleUserTeamPickToggle = (incomingPick) => {
    if (userTeamsPicks.includes(incomingPick)) {
      userTeamsPicks = userTeamsPicks.filter((pick) =>
          pick.round != incomingPick.round
          || pick.selection != incomingPick.selection
      );
      setUserTeamsPicks(userTeamsPicks);
    }
    else{
      userTeamsPicks.push(incomingPick);
      const tempUserTeamsPicks = [...userTeamsPicks];
      setUserTeamsPicks(tempUserTeamsPicks);
    }
  };

  const currentTeamsPicks = props.fullDraftOrder.filter((pickData) => {
    return pickData.team.name == props.fullDraftOrder[0].team.name;
  });

  const usersTeamsPicks = props.fullDraftOrder.filter((pickData) => {
    return pickData.team.name == props.usersTeam.name;
  });

  const OtherTeamsPicksDisplay = (props) => {
    const displayedPicks = currentTeamsPicks.map((pick) => 
      <Button
        className="ml-2"
        variant={otherTeamsPicks.includes(pick) ? 'success' : 'primary'}
        onClick={() => {handleOtherTeamPickToggle(pick)}} key={`pick-${pick.round}-${pick.selection}`}>
        {pick.round} - {pick.selection}
      </Button>
    )
    return displayedPicks;
  };

  const UsersTeamsPicksDisplay = (props) => {
    const displayedPicks = usersTeamsPicks.map((pick) => 
      <Button
        className="ml-2"
        variant={`${userTeamsPicks.includes(pick) ? 'success' : 'primary'}`}
        onClick={() => {handleUserTeamPickToggle(pick)}} key={`pick-${pick.round}-${pick.selection}`}>
        {pick.round} - {pick.selection}
      </Button>
    )
    return displayedPicks;
  };


  return (
    <Card className="mt-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span className="font-weight-bolder">Trade Center</span>
        <Button className="dark" variant="dark" onClick={() => {props.handleTrade(userTeamsPicks, otherTeamsPicks)}}>
          Submit trade
        </Button>
      </Card.Header>
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <Container>
          <Row>
            <Col>
              <Card className="mt-4">
                <Card.Header>
                  Picks to trade away...
                </Card.Header>
                <Card.Body>
                  <UsersTeamsPicksDisplay />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mt-4">
                <Card.Header>
                  Picks to receive...
                </Card.Header>
                <Card.Body>
                  <OtherTeamsPicksDisplay />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}
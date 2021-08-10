import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import styles from './Board.module.css';
import Filter from './Filter';
import { Fragment } from 'react';


export default function Trades(props) {
  const currentTeamsPicks = props.fullDraftOrder.filter((team) => {
    return team.name == props.fullDraftOrder[0].name;
  })

  const usersTeamsPicks = props.fullDraftOrder.filter((team) => {
    return team.name == props.usersTeam.name;
  })

  const OtherTeamsPicksDisplay = (props) => {
    const displayedPicks = currentTeamsPicks.map((pick) => 
      <Button className="ml-2">
        {pick.round} - {pick.selection}
      </Button>
    )
    return displayedPicks;
  }

  const UsersTeamsPicksDisplay = (props) => {
    const displayedPicks = usersTeamsPicks.map((pick) => 
      <Button className="ml-2">
        {pick.round} - {pick.selection}
      </Button>
    )
    return displayedPicks;
  }


  return (
    <Card className="mt-4">
      <Card.Header>
        <span className="font-weight-bolder">Trade Center</span>
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
                  <OtherTeamsPicksDisplay />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mt-4">
                <Card.Header>
                  Picks to receive...
                </Card.Header>
                <Card.Body>
                  <UsersTeamsPicksDisplay />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}
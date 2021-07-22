import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UserResults = (props) => {
  const userPickHistory = [];

  props.pickHistory.map((pick) => {
    if (pick.team.abbreviation === props.usersTeam.abbreviation) {
      userPickHistory.push(
        <tr key={`pick${pick.firstName}${pick.lastName}`}>
          <td>{pick.firstName} {pick.lastName}</td>
          <td>{pick.position}</td>
          <td>{pick.program}</td>
        </tr>
      );
    }
  });

  return(
    userPickHistory
  )
}

const Results = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>The results for your {props.draftData.usersTeam.city} {props.draftData.usersTeam.name} draft:</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Position</th>
                <th>Program</th>
              </tr>
              <UserResults pickHistory={props.draftData.pickHistory} usersTeam={props.draftData.usersTeam}/>
            </thead>
          </Table>
        </Col>
      </Row>
      <Row className="mb-2 mx-auto w-100">
        <Col className="d-flex justify-content-center">
          <Button
            variant="primary"
            href="/draft">
              Start over
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Results;
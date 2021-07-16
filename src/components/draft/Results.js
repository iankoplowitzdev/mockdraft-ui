import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const UserResults = (props) => {
  const userPickHistory = [];

  props.pickHistory.map((pick) => {
    if (pick.team.abbreviation === props.usersTeam.abbreviation) {
      userPickHistory.push(
        <tr>
          <td>{pick.firstName} {pick.lastName}</td>
          <td>{pick.position}</td>
          <td>{pick.program}</td>
        </tr>
      );
    }
  });

  return(
    {userPickHistory}
  )
}

const Results = (props) => {
  <Container>
    <Row>
      <Col>
        <h2>Your results:</h2>
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
  </Container>
}

export default Results;
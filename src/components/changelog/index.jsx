import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';



export default function ChangeLog() {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2">
            <Card.Body>
              <Card.Title>Maximum round selection - 8/8/2021</Card.Title>
              Users are now able to select the maximum round in which they'd like to draft through.
            </Card.Body>
          </Card>
          <Card className="mb-2">
            <Card.Body>
              <Card.Title>Position filtration - 8/8/2021</Card.Title>
              Users are now able to filter by position when determining who to choose in the draft room.
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
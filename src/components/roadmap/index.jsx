import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



export default function Roadmap() {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2">
            <Card.Body>
              <Card.Title>Roadmap to upcoming features (in current prioritized order):</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Filtering for draft board to filter by position.</ListGroup.Item>
                <ListGroup.Item>Ability to choose the maximum round you want to draft through.</ListGroup.Item>
                <ListGroup.Item>Trades based on the Jimmy Johnson NFL trade chart.</ListGroup.Item>
                <ListGroup.Item>Customizable draft rankings to run mock draft by.</ListGroup.Item>
                <ListGroup.Item>Customizable sliders to allow user the ability to tune the "needs" weight of each position for each team.</ListGroup.Item>
                <ListGroup.Item>CSV import to allow users to tweak all aspects of their draft board, including rankings and score.</ListGroup.Item>
                <ListGroup.Item>Multi-team selection to allow user to run the draft as multiple teams.</ListGroup.Item>
                <ListGroup.Item>32-team draft expert rankings per team (each team will follow a draft board supplied by a draft expert for that team, who knows the team best).</ListGroup.Item>
                <ListGroup.Item>Extending the player recognition system to allow the simulator to understand position flex (player X listed as a 3rd-round tackle, but a 1st round guard).</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
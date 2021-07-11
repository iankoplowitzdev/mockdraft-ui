import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from './PlayerList.module.css';


export default function PlayerList(props) {
  const incomingPlayerList = props.players;
  const renderablePlayerList = incomingPlayerList.map((player) =>
    <Card className="mb-2">
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <span>{player.firstName} {player.lastName} | {player.position} | {player.program}</span>
        <Button className="ml-auto">Draft</Button>
      </Card.Body>
    </Card>
  );

  if (incomingPlayerList.length > 0) {
    return (
      <Container>
        <Row>
          <Col>
            <Card body className={styles.playerListContainer}>{renderablePlayerList}</Card>
          </Col>
        </Row>
      </Container>
    )
  }
  
  return(<span>Loading...</span>)


}
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './PlayerList.module.css';


export default function History(props) {
  const pickHistory = props.pickHistory;
  
  if (!pickHistory || pickHistory.length === 0) {
    return(<span>No players have been selected yet.</span>)
  }

  const renderableHistory = pickHistory.map((pick) =>
    <Card className="mb-2">
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <span>{pick.team.name} - {pick.firstName} {pick.lastName}</span>
      </Card.Body>
    </Card>
  );

  return (
    <Container>
      <Row>
        <Col>
          <Card body className={styles.playerListContainer}>{renderableHistory}</Card>
        </Col>
      </Row>
    </Container>
  )
  
  
}
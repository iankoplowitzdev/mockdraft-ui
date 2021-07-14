import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from './PlayerList.module.css';
import { Fragment } from 'react';

function NameTag(props) {
  if (props.isUsersTurn) {
    return (
      <Fragment>
        <span>
          {props.player.firstName} {props.player.lastName} | {props.player.position} | {props.player.program}
        </span>
        <Button className="ml-auto" onClick={() => props.selectPlayer(props.player)}>Draft</Button>
      </Fragment>
    )
  }

  return (
    <span>
      {props.player.firstName} {props.player.lastName} | {props.player.position} | {props.player.program}
    </span>
  )
}

export default function PlayerList(props) {
  const incomingPlayerList = props.players;
  if (!incomingPlayerList || incomingPlayerList === 0) {
    return(<span>Loading...</span>)
  }

  const renderablePlayerList = incomingPlayerList.map((player) =>
    <Card className="mb-2">
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <NameTag player={player} isUsersTurn={props.isUsersTurn} selectPlayer={props.selectPlayer}/>
      </Card.Body>
    </Card>
  );

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
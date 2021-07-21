import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './Board.module.css';
import { Fragment } from 'react';


export default function Board(props) {
  const NameTag = (props) => {
    if (props.isUsersTurn && props.hasStarted) {
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

  if (!props.availablePlayers) {
    return(<span>Loading...</span>)
  }

  const renderablePlayerList = props.availablePlayers.map((player, index) =>
    // @todo figure out better way to make unique key
    <Card className="mb-2" key={`card${player.firstName}${player.lastName}${index}`}>
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <NameTag
          player={player}
          isUsersTurn={props.isUsersTurn}
          hasStarted={props.hasStarted}
          selectPlayer={props.selectPlayer}/>
      </Card.Body>
    </Card>
  );



  return (
    <Card body className={styles.playerListContainer}>{renderablePlayerList}</Card>
  )
}
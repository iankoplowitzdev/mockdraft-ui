import styles from './Board.module.css';
import Filter from './Filter';
import { Fragment } from 'react';


export default function Board(props) {
  const NameTag = (props) => {
    if (props.isUsersTurn && props.hasStarted) {
      return (
        <div className="uk-grid">
          <div className="uk-width-1-2">
            <div>
              <span>{props.player.firstName} {props.player.lastName}</span>
            </div>
            <div>
              <small>{props.player.position} - {props.player.program}</small>
            </div>
          </div>
          <div className="uk-width-1-2">
            <div className="uk-button uk-button-primary uk-align-right" onClick={() => props.selectPlayer(props.player)}>
              Draft
            </div>
          </div>
        </div>
      )
    }
  
    return (
      <Fragment>
        <div>
          <div>
            <span>{props.player.firstName} {props.player.lastName}</span>
          </div>
          <div>
            <small>{props.player.position} - {props.player.program}</small>
          </div>
        </div>
      </Fragment>
    )
  }

  if (!props.availablePlayers) {
    return(<span>Loading...</span>)
  }

  let currentAvailablePositions = [];
  const tempPositionList = [];

  for (let i = 0; i < props.filteredPositions.length; i++){
    const currentPosition = props.filteredPositions[i];
    tempPositionList.push(currentPosition.abbreviation);
    if (currentPosition.selected) {
      currentAvailablePositions.push(currentPosition.abbreviation);
    }
  }

  if (currentAvailablePositions.length === 0) {
    currentAvailablePositions = tempPositionList;
  }


  const tempPlayerList = props.availablePlayers.filter((player) => {
    return currentAvailablePositions.includes(player.position);
  });

  const renderablePlayerList = tempPlayerList.map((player, index) =>
    // @todo figure out better way to make unique key
    <div className="uk-card uk-card-default uk-card-small uk-card-body uk-margin-bottom">
      <NameTag
        player={player}
        isUsersTurn={props.isUsersTurn}
        hasStarted={props.hasStarted}
        selectPlayer={props.selectPlayer}/>
    </div>
  );



  return (
    <div class="uk-card uk-card-small uk-card-secondary uk-card-body">
      <div class="uk-card-header">
        <div className="uk-grid">
          <div className="uk-width-1-2">
            <h3 className="uk-card-title">Draft Board</h3>
          </div>
          <div className="uk-width-1-2">
            <div className="uk-align-right">
              <Filter className="uk-align-right" filteredPositions={props.filteredPositions} handlePositionFilter={props.handlePositionFilter}/>
            </div>
          </div>
        </div>
      </div>
      <div className="uk-card-body">
        <div className={`${styles.playerListContainer} uk-card uk-padding-small`}>
          {renderablePlayerList}
        </div>
      </div>
    </div>
  )
}
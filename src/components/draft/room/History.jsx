import Card from 'react-bootstrap/Card';
import ScrollToBottom from 'react-scroll-to-bottom';

import styles from './Board.module.css';


export default function History(props) {
  const draftData = props.draftData;
  
  if (!draftData || draftData.pickHistory.length === 0) {
    return (
      <Card>
        <Card.Header className={styles.boardCardHeader + " d-flex align-items-center"}>
          <span className="font-weight-bolder">Selection History</span>
        </Card.Header>
        <Card.Body className={styles.playerListContainer}>
          <span>No players have been selected yet.</span>
        </Card.Body>
      </Card>
    )
  }

  const renderableHistory = draftData.pickHistory.map((pick, index) =>
    <Card className="mb-2 text-light bg-dark" key={`pick${pick.firstName}${pick.lastName}${index}`}>
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <div>
          {index + 1}. {pick.team.city} {pick.team.name}
        </div>
        <div className="ml-auto">
          {pick.firstName} {pick.lastName}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div class="uk-card uk-card-small uk-card-secondary uk-card-body">
      <div class="uk-card-header">
        <h3 className="uk-card-title">Selection History</h3>
      </div>
      <ScrollToBottom className={styles.playerListContainer}>
        <div className="uk-card-body">
          <div className={`${styles.playerListContainer} uk-card uk-padding-small`}>
          {renderableHistory}
          </div>
        </div>
      </ScrollToBottom>
    </div>
  )
}
import Card from 'react-bootstrap/Card';
import ScrollToBottom from 'react-scroll-to-bottom';

import styles from './Board.module.css';


export default function History(props) {
  const draftData = props.draftData;
  
  if (!draftData || draftData.pickHistory.length === 0) {
    return (
      <Card>
        <Card.Body className={styles.playerListContainer}>
          <span>No players have been selected yet.</span>
        </Card.Body>
      </Card>
    )
  }

  const renderableHistory = draftData.pickHistory.map((pick, index) =>
    <Card className="mb-2" key={`pick${pick.firstName}${pick.lastName}${index}`}>
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <span>{pick.team.name} - {pick.firstName} {pick.lastName}</span>
      </Card.Body>
    </Card>
  );

  return (
    <Card>
      <ScrollToBottom  className={styles.playerListContainer}>
        <Card.Body>
            {renderableHistory}
        </Card.Body>
      </ScrollToBottom>
    </Card>
  )
  
  
}
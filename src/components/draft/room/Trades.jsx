import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './Board.module.css';
import Filter from './Filter';
import { Fragment } from 'react';


export default function Trades(props) {
  return (
    <Card className="mt-4">
      <Card.Header className={styles.boardCardHeader + " d-flex justify-content-between align-items-center"}>
        <span className="font-weight-bolder">Trade Center</span>
      </Card.Header>
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        Trade center!
      </Card.Body>
    </Card>
  )
}
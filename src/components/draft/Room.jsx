import React, { useEffect } from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from './Board';
import History from './History';
import Button from 'react-bootstrap/Button';


const Room = (props) => {
  const handleDraftStart = (draftData, setDraftData) => {
    const newDraftData = {
      ...draftData
    }
    newDraftData.canStartDraft = true;
    setDraftData(newDraftData);
  }

  useEffect(() => {
    const setUsersTurn = async () => {
      const newDraftData = {
        ...props.draftData
      }
      newDraftData.usersTurn = props.draftData.usersTeam.abbreviation === props.draftData.draftOrder[0].abbreviation;
      props.setDraftData(newDraftData);
    }

    setUsersTurn();
  }, []);

  return (
    <Container>
      <Row className="mb-2">
        <Col>
          <h3>Picking for: {props.draftData.usersTeam.name}</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={() => { handleDraftStart(props.draftData, props.setDraftData) }}>Start drafting</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Board
            draftData={props.draftData}
            setDraftData={props.setDraftData}
            setScreen={props.setScreen}/>
        </Col>
        <Col>
          <History
            draftData={props.draftData}
            setDraftData={props.setDraftData}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Room;
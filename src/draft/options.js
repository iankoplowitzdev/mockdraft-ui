import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export default class Options extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row className="mb-2">
          <Col>
            <h2>Select your team below:</h2>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Cowboys")}>Cowboys</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Football Team")}>Football Team</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Eagles")}>Eagles</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Giants")}>Giants</Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Buccaneers")}>Buccaneers</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Saints")}>Saints</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Falcons")}>Falcons</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Panthers")}>Panthers</Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Packers")}>Packers</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Bears")}>Bears</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Lions")}>Lions</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Vikings")}>Vikings</Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Seahawks")}>Seahawks</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("49ers")}>49ers</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Cardinals")}>Cardinals</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Rams")}>Rams</Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Patriots")}>Patriots</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Bills")}>Bills</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Dolphins")}>Dolphins</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Jets")}>Jets</Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Colts")}>Colts</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Texans")}>Texans</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Jaguars")}>Jaguars</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Titans")}>Titans</Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Chiefs")}>Chiefs</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Raiders")}>Raiders</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Chargers")}>Chargers</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Broncos")}>Broncos</Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Steelers")}>Steelers</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Ravens")}>Ravens</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Bengals")}>Bengals</Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.props.setTeam("Browns")}>Browns</Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <h3>Selected team: {this.props.team}</h3>
          </Col>
          <Col>
            <Button variant="success" onClick={() => this.props.setScreen("draft")}>Next</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
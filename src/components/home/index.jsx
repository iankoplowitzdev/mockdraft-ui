import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <h1>Hi there!</h1>
            <p>
              Welcome to my mock draft simulator project!
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';



export default function About() {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2">
            <Card.Body>
              <Card.Title>About this app...</Card.Title>
              <Card.Text>
                This app is a mock NFL draft simulator. It will allow you to take on the identity of an NFL team, and make draft selections for them.
                It was designed, built, tested, and deployed all by me. Being a full stack software engineer by day, and huge NFL fan by night, I was looking
                for a project that would allow me to combine my need for more projects for my online portfolio, with my passion for football. I'm very much
                into the NFL draft, and love using the other mock draft simulators out on the web. One day I got the idea to make this simulator as my project.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Some disclaimers...</Card.Title>
              <Card.Text>
                As I mentioned above, this is a side project by a single developer. Thus, please be patient with any bugs, or features you'd like implemented.
                It is my goal to keep the changelog page updated with new features I add to the app, and the roadmap page updated with the features that will
                be implemented next.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
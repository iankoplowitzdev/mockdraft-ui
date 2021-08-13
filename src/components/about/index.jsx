import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';



export default function About() {
  return (
    <div class="uk-container">
      <div class="uk-card uk-card-secondary uk-margin-bottom">
          <div class="uk-card-header">
            <h3 class="uk-card-title">About this app...</h3>
          </div>
          <div class="uk-card-body">
              <p>
                This app is a mock NFL draft simulator. It will allow you to take on the identity of an NFL team, and make draft selections for them.
                It was designed, built, tested, and deployed all by me. Being a full stack software engineer by day, and huge NFL fan by night, I was looking
                for a project that would allow me to combine my need for more projects for my online portfolio, with my passion for football. I'm very much
                into the NFL draft, and love using the other mock draft simulators out on the web. One day I got the idea to make this simulator as my project.
              </p>
          </div>
      </div>  
      <div class="uk-card uk-card-secondary">
          <div class="uk-card-header">
            <h3 class="uk-card-title">Some disclaimers...</h3>
          </div>
          <div class="uk-card-body">
            <p>
              As I mentioned above, this is a side project by a single developer. Thus, please be patient with any bugs, or features you'd like implemented.
                It is my goal to keep the changelog page updated with new features I add to the app, and the roadmap page updated with the features that will
                be implemented next.
            </p>
          </div>
      </div>  
    </div>
  )
}
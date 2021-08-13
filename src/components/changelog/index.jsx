import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';



export default function ChangeLog() {
  return (
    <div class="uk-container">
      <div class="uk-card uk-card-secondary uk-margin-bottom">
        <div class="uk-card-header">
          <h3 class="uk-card-title">Maximum round selection - 8/8/2021</h3>
        </div>
        <div class="uk-card-body">
          <p>Users are now able to select the maximum round in which they'd like to draft through.</p>
        </div>
      </div>
      <div class="uk-card uk-card-secondary">
        <div class="uk-card-header">
          <h3 class="uk-card-title">Position filtration - 8/8/2021</h3>
        </div>
        <div class="uk-card-body">
          <p>Users are now able to filter by position when determining who to choose in the draft room.</p>
        </div>
      </div>
    </div>
  )
}
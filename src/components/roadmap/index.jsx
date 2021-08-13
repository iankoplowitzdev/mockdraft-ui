import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



export default function Roadmap() {
  return (
    <div className="uk-container">
      <ul className="uk-list uk-list-divider">
        <li><strike>Filtering for draft board to filter by position.</strike></li>
        <li><strike>Ability to choose the maximum round you want to draft through.</strike></li>
        <li>Trades based on the Jimmy Johnson NFL trade chart.</li>
        <li>Customizable draft rankings to run mock draft by.</li>
        <li>Customizable sliders to allow user the ability to tune the "needs" weight of each position for each team.</li>
        <li>CSV import to allow users to tweak all aspects of their draft board, including rankings and score.</li>
        <li>Multi-team selection to allow user to run the draft as multiple teams.</li>
        <li>32-team draft expert rankings per team (each team will follow a draft board supplied by a draft expert for that team, who knows the team best).</li>
        <li>Extending the player recognition system to allow the simulator to understand position flex (player X listed as a 3rd-round tackle, but a 1st round guard).</li>
      </ul>
    </div>
  )
}
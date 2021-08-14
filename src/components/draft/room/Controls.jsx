import Button from 'react-bootstrap/Button';

export default function Controls(props) {
  if (props.isPaused && !props.hasStarted) {
    return (
      <button className="uk-button uk-button-primary uk-align-right" variant="success" onClick={() => { props.begin() }}>
        Start draft
      </button>
    )
  }
  else if (props.isPaused && props.hasStarted){
    return (
      <button className="uk-button uk-button-primary uk-align-right" onClick={() => { props.play() }}>
        Resume
      </button>
    )
  }
  return(
    <button className="uk-button uk-button-primary uk-align-right" onClick={() => { props.pause() }}>
      Pause
    </button>
  );
}
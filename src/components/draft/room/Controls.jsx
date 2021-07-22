import Button from 'react-bootstrap/Button';

export default function Controls(props) {
  if (props.isPaused && !props.hasStarted) {
    return (
      <Button variant="success" onClick={() => { props.begin() }}>
        Start draft
      </Button>
    )
  }
  else if (props.isPaused && props.hasStarted){
    return (
      <Button onClick={() => { props.play() }}>
        Resume
      </Button>
    )
  }
  return(
    <Button onClick={() => { props.pause() }}>
      Pause
    </Button>
  );
}
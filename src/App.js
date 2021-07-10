import Draft from './draft/draft';
import Navbar from 'react-bootstrap/Navbar';
import Options from './draft/options';
import { useState } from 'react';

function Screens(props) {
  if(props.screen === "options") {
    return <Options team={props.team} setTeam={props.setTeam} setScreen={props.setScreen}/>
  }
  return <Draft team={props.team} setScreen={props.setScreen}/>
}

function App() {
  const [screen, setScreen] = useState("options");
  const [team, setTeam] = useState(null);

  return (
    <div>
      <Navbar>
        <Navbar.Brand>NFL Mock Draft Simulator</Navbar.Brand>
      </Navbar>
      <Screens screen={screen} setScreen={setScreen} team={team} setTeam={setTeam}/>
    </div>
  );
}

export default App;

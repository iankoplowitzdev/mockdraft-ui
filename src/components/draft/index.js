import { useState } from 'react';
import Options from './Options';
import Room from './Room';


function Screens(props) {
  if(props.screen === "options") {
    return <Options team={props.team} setTeam={props.setTeam} setScreen={props.setScreen}/>
  }
  return <Room usersTeam={props.team} setScreen={props.setScreen}/>
}

export default function Draft() {
  const [screen, setScreen] = useState('options');
  const [team, setTeam] = useState();

  return(
    <Screens screen={screen} setScreen={setScreen} team={team} setTeam={setTeam}/>
  )
}
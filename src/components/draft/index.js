import { useEffect, useState } from 'react';
import Options from './Options';
import Room from './Room';
import api from '../../api/Api';



function Screens(props) {
  if(props.screen === "options") {
    return <Options
      usersTeam={props.usersTeam}
      setUsersTeam={props.setUsersTeam}
      setScreen={props.setScreen}
      nflTeams={props.nflTeams}/>
  }
  return <Room
    usersTeam={props.usersTeam}
    setScreen={props.setScreen}
    nflTeams={props.nflTeams}/>
}

export default function Draft() {
  const [screen, setScreen] = useState('options');
  const [usersTeam, setUsersTeam] = useState();
  const [nflTeams, setNflTeams] = useState();

  useEffect(() => {
    const initializeNflTeams = async () => {
      const apiTeams = await api.getTeams();
      setNflTeams(apiTeams.data);
    }
    initializeNflTeams();
  }, []);

  return(
    <Screens
      screen={screen}
      setScreen={setScreen}
      usersTeam={usersTeam}
      setUsersTeam={setUsersTeam}
      nflTeams={nflTeams}/>
  )
}
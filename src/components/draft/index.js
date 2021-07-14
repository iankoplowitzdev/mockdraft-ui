import { useState, useEffect } from 'react';
import Options from './Options';
import Room from './Room';
import Api from '../../api/Api';


function Screens(props) {
  if(props.screen === "options") {
    return <Options
      usersTeam={props.usersTeam}
      setUsersTeam={props.setUsersTeam}
      setScreen={props.setScreen}
      nflTeams={props.nflTeams}/>
  }

  return <Room 
    nflTeams={props.nflTeams}
    usersTeam={props.usersTeam}
    setScreen={props.setScreen}
    draftOrder={props.draftOrder}
    setDraftOrder={props.setDraftOrder}
    availablePlayers={props.availablePlayers}
    setAvailablePlayers={props.setAvailablePlayers}
    positions={props.positions}
    canStartDraft={props.canStartDraft}
    setCanStartDraft={props.setCanStartDraft}
    setDraftTimeout={props.setDraftTimeout}/>
}

export default function Draft() {
  const [screen, setScreen] = useState('options');
  const [usersTeam, setUsersTeam] = useState();
  const [nflTeams, setNflTeams] = useState();
  const [draftOrder, setDraftOrder] = useState();
  const [availablePlayers, setAvailablePlayers] = useState();
  const [positions, setPositions] = useState();
  const [canStartDraft, setCanStartDraft] = useState(false);
  const [draftTimeout, setDraftTimeout] = useState();

  useEffect(async () => {
    const apiTeams = await Api.getTeams();
    const teams = apiTeams.data;
    
    const apiPlayers = await Api.getPlayers();
    const sortedPlayers = apiPlayers.data.sort((p1, p2) => (p1.rank > p2.rank) ? 1 : -1);
    
    const apiPositions = await Api.getPositions();
    const positions = apiPositions.data;
    
    let tempOrder = [];
    
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const teamPicks = team.picks;
      for (let j = 0; j < teamPicks.length; j++) {
        tempOrder[teamPicks[j] -1] = team;
      }
    }
    
    setNflTeams(teams);
    setDraftOrder(tempOrder);
    setAvailablePlayers(sortedPlayers);
    setPositions(positions);
  }, [])

  return(
    <Screens
      screen={screen}
      setScreen={setScreen}
      usersTeam={usersTeam}
      setUsersTeam={setUsersTeam}
      nflTeams={nflTeams}
      draftOrder={draftOrder}
      setDraftOrder={setDraftOrder}
      availablePlayers={availablePlayers}
      setAvailablePlayers={setAvailablePlayers}
      positions={positions}
      canStartDraft={canStartDraft}
      setCanStartDraft={setCanStartDraft}
      setDraftTimeout={setDraftTimeout}/>
  )
}
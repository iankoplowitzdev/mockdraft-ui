import { useEffect, useState } from 'react';
import Options from './Options';
import Room from './Room';
import Results from './Results';
import Api from '../../api/Api';



function Screens(props) {
  if(props.screen === "options") {
    return <Options
      setScreen={props.setScreen}
      draftData={props.draftData}
      setDraftData={props.setDraftData}/>
  }
  else if(props.screen === "results") {
    return <Results
      setScreen={props.setScreen}
      draftData={props.draftData}
      setDraftData={props.setDraftData}/>
  }
  return <Room
    setScreen={props.setScreen}
    draftData={props.draftData}
    setDraftData={props.setDraftData}/>
}

export default function Draft() {
  const [screen, setScreen] = useState('options');
  const [draftData, setDraftData] = useState({});

  useEffect(() => {
    const initializeDraftData = async () => {
      const apiPlayers = await Api.getPlayers();
      const sortedPlayers = apiPlayers.data.sort((p1, p2) => (p1.rank > p2.rank) ? 1 : -1);
  
      const apiPositions = await Api.getPositions();
      const positions = apiPositions.data;

      const apiTeams = await Api.getTeams();
  
      let teamsInDraftOrder = [];
  
      for (let i = 0; i < apiTeams.data.length; i++) {
        const team = apiTeams.data[i];
        const teamPicks = team.picks;
        for (let j = 0; j < teamPicks.length; j++) {
          teamsInDraftOrder[teamPicks[j] -1] = team;
        }
      }
  
      setDraftData({
        usersTurn: false,
        nflTeams: apiTeams.data,
        draftOrder: teamsInDraftOrder,
        availablePlayers: sortedPlayers,
        pickHistory: [],
        positions: positions,
        canStartDraft: false,
        isComplete: false
      });
    }

    initializeDraftData();
  }, []);

  return(
    <Screens
      screen={screen}
      setScreen={setScreen}
      draftData={draftData}
      setDraftData={setDraftData}/>
  )
}
import { useEffect, useState } from 'react';
import Options from './Options';
import Room from './room';
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
      const retrievedDraftOrder = (await Api.getCurrentYearDraftOrder()).data;
  
      setDraftData({
        isUsersTurn: false,
        nflTeams: apiTeams.data,
        retrievedDraftOrder: retrievedDraftOrder,
        draftOrder: [...retrievedDraftOrder.r1],
        availablePlayers: sortedPlayers,
        pickHistory: [],
        positions: positions,
        hasStarted: false,
        isComplete: false,
        isPaused: true,
        filteredPositions: [...(positions.map((position) => ({...position, selected: false})))],
        hasSelectedNumRounds: false
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
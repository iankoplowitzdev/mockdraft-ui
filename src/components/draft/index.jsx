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
      const mockDraftData = (await Api.getInitialMockDraftData()).data;
      
      setDraftData({
        isUsersTurn: false,
        nflTeams: mockDraftData.teams,
        fullDraftOrder: [...mockDraftData.draftOrder],
        numSelections: mockDraftData.numSelections,
        availablePlayers: mockDraftData.players,
        pickHistory: [],
        positions: mockDraftData.positions,
        hasStarted: false,
        isComplete: false,
        isPaused: true,
        filteredPositions: [...(mockDraftData.positions.map((position) => ({...position, selected: false})))],
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
const selectionLogic = {  
  makeSelection: async (selection, team, players, positions) => {
    let selectionPool = null;
    let position = null;
    let reSelection = true; 
    let selectionPoolRange = 4;

    while (reSelection) {
      selectionPool = await selectionLogic.getSelectionPool(selection, players, selectionPoolRange++);
      position = selectionLogic.generateSelectionPosition(team.needs);
      reSelection = !selectionLogic.positionIsInPool(position, players, selectionPool);
    }

    const finalSelection = selectionLogic.selectPlayer(position, selectionPool, players);

    // This is an arbitrary need adjustment.
    // @todo: add positional need adjustments to mongo db
    const apiPosition = selectionLogic._getPosition(positions, position);
    team.needs[position] = selectionLogic._determinePositionalNeed(team.needs[position], apiPosition.pickAdjustment[0]);
    return finalSelection;
  },
  generateSelectionPosition: (needs) => {
    const keys = Object.keys(needs);
  
    let aggregate = [];
  
    for (let i = 0; i < keys.length; i++) {
      const position = keys[i];
      for (let j = 0; j < needs[position]; j++) {
        aggregate.push(position);
      }
    }
  
    const determinedPosition = aggregate[Math.floor(Math.random() * aggregate.length)];
    return determinedPosition;
  },
  getSelectionPool: async (currentSelection, players, range) => {
    let pool = [];
    for (let i = 0; i < currentSelection + range; i++) {
      if (!players[i].selected) {
        pool.push(i);
      }
    }
    return pool;
  },
  positionIsInPool: (position, players, selectionPool) => {
    for (let i = 0; i < selectionPool.length; i++) {
      const playersListIndex = selectionPool[i];
      const currentPosition = players[playersListIndex].position;
      if (currentPosition === position) {
        return true;
      }
    }

    return false;
  },
  selectPlayer: (position, selectionPool, players) => {
    let playerToSelect = 0;
    for (let i = 0; i < selectionPool.length; i++) {
      const playersListIndex = selectionPool[i];
      const currentPosition = players[playersListIndex].position;
      if (currentPosition === position) {
        playerToSelect = players[playersListIndex];
        players[playersListIndex].selected = true;
        return playerToSelect;
      }
    }
  },
  _getPosition: (positions, positionAbbreviation) => {
    for (let i = 0; i < positions.length; i++) {
      const currentPosition = positions[i];
      if (currentPosition.abbreviation == positionAbbreviation) {
        return currentPosition;
      }
    }
  },
  _determinePositionalNeed (teamNeedValue, positionalDecrease) {
    if (positionalDecrease > teamNeedValue) {
      return 0;
    }

    return teamNeedValue - positionalDecrease;
  }
};

module.exports = selectionLogic;
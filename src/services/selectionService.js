const selectionLogic = {
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
  makeSelection: (position, selectionPool, players) => {
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
  }
};

module.exports = selectionLogic;
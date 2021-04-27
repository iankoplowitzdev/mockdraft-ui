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
  getSelectionPool: async (currentSelection, players) => {
    const pool = players.slice(0, currentSelection + 5);
    console.log(pool);

    for (let i = 0; i < pool.length; i++) {
      if (pool[i].selected) {
        pool.splice(i, 1);
      }
    }
  
    return pool;
  },
  positionIsInPool: (position, selectionPool) => {
    for (let i = 0; i < selectionPool.length; i++) {
      const currectPosition = selectionPool[i].position;
      if (currectPosition === position) {
        return true;
      }
    }

    return false;
  },
  makeSelection: (position, selectionPool, players) => {
    for (let i = 0; i < selectionPool.length; i++) {
      const currectPosition = selectionPool[i].position;
      if (currectPosition === position) {
        for (let j = 0; j < players.length; j++) {
          if (players[j].firstName === selectionPool[i].firstName && players[j].lastName === selectionPool[i].lastName) {
            players[j].selected = true;
            console.log(players[j]);
            break;
          }
        }
        return selectionPool[i];
      }
    }
  }
};

module.exports = selectionLogic;
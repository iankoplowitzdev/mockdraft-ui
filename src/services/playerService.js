const selectionService = require('./selectionService');

const logic = {
  makeSelection: async (selection, team, players) => {
    let selectionPool = null;
    let position = null;
    let reSelection = true; 
    let selectionPoolRange = 4;

    while (reSelection) {
      selectionPool = await selectionService.getSelectionPool(selection, players, selectionPoolRange++);
      position = selectionService.generateSelectionPosition(team.needs);
      reSelection = !selectionService.positionIsInPool(position, players, selectionPool);
    }

    return selectionService.makeSelection(position, selectionPool, players);
  }
}

module.exports = logic;
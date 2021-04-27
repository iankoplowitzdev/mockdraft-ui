const selectionService = require('./selectionService');

const logic = {
  makeSelection: async (selection, team, players) => {
    const selectionPool = await selectionService.getSelectionPool(selection, players);
    let position = null;
    let reSelection = true; 

    while (reSelection) {
      position = selectionService.generateSelectionPosition(team.needs);
      reSelection = !selectionService.positionIsInPool(position, selectionPool);
    }

    return selectionService.makeSelection(position, selectionPool, players);
  }
}

module.exports = logic;
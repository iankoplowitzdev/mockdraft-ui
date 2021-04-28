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

    const finalSelection = selectionService.makeSelection(position, selectionPool, players);

    // This is an arbitrary need adjustment.
    // @todo: add positional need adjustments to mongo db
    team.needs[position] = team.needs[position] - 10;
    return finalSelection;
  }
}

module.exports = logic;
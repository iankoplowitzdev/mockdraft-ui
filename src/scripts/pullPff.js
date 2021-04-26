const axios = require('axios');

async function main() {
  const response = await axios.get("https://www.pff.com/api/mock_draft_simulator/players");
  return response.data.players;
}

main()
  .then((players) => {
    const finalList = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i]
      let [firstName, ...rest] = player.name.split(" ");
      const lastName = rest.join(" ");
      const obj = {
        firstName: firstName,
        lastName: lastName,
        program: player.college,
        position: player.position,
        rank: player.pff_rank
      }
      finalList.push(obj);
    }
    console.dir(finalList, {'maxArrayLength': null});
  })
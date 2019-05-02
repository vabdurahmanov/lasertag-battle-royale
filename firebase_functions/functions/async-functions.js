async function game_initalization(firebase_admin, playerInfo, gameLocation) {
  let playerDocumentRef = await firebase_admin.firestore().collection("players").add(playerInfo);

  const gameInfo = {
    location: gameLocation,
    players: [playerDocumentRef.id]
  };

  let gameDocumentRef = await firebase_admin.firestore().collection("games").add(gameInfo);
  return gameDocumentRef;
}

async function player_add(firebase_admin, playerInfo, gameID) {
  let playerDocumentRef = await firebase_admin.firestore().collection("players").add(playerInfo);

  let gameData = await firebase_admin.firestore().collection("games").doc(gameID).get();

  let playerArray = gameData.data().players;

  playerArray.push(playerDocumentRef.id);

  let gameDocumentRef = await firebase_admin.firestore().collection("games").doc(gameID).update("players", playerArray);
  return gameDocumentRef;
}

module.exports = { game_initalization, player_add }
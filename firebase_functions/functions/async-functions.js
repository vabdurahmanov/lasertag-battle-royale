async function game_initalization(firebase_admin, playerInfo, gameLocation) {
  let playerDocumentRef = await firebase_admin.firestore().collection("player").add(playerInfo);

  const gameInfo = {
    location: gameLocation,
    players: [playerDocumentRef.id]
  };

  let gameDocumentRef = await firebase_admin.firestore().collection("games").add(gameInfo);
  return gameDocumentRef;
}

module.exports = { game_initalization }
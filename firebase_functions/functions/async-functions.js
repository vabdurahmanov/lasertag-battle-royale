async function game_initalization(firebase_admin, playerInfo, gameLocation) {
  let playerDocumentRef = await firebase_admin.firestore().collection("players").add(playerInfo);

  const gameInfo = {
    location: gameLocation,
    players: [playerDocumentRef.id]
  };

  let gameDocumentRef = await firebase_admin.firestore().collection("games").add(gameInfo);
  return gameDocumentRef;
};

async function player_add(firebase_admin, playerInfo, gameID) {
  let playerDocumentRef = await firebase_admin.firestore().collection("players").add(playerInfo);

  let gameData = await firebase_admin.firestore().collection("games").doc(gameID).get();

  let playerArray = gameData.data().players;

  playerArray.push(playerDocumentRef.id);

  let gameDocumentRef = await firebase_admin.firestore().collection("games").doc(gameID).update("players", playerArray);
  return gameDocumentRef;
};

async function decrement_ammo(firebase_admin, laserGunID) {
  let queryRef = await firebase_admin.firestore().collection("players").where("laserGunID", "==", laserGunID).get();

  queryRef.forEach(doc => {
    let data = doc.data();

    const new_ammo = data.ammo - 1;

    firebase_admin.firestore().collection("players").doc(doc.id).update({ ammo: new_ammo });
  });
};

async function decrement_health(firebase_admin, vestID) {
  let queryRef = await firebase_admin.firestore().collection("players").where("vestID", "==", vestID).get();

  queryRef.forEach(doc => {
    let data = doc.data();

    const new_health = data.health - 1;

    firebase_admin.firestore().collection("players").doc(doc.id).update({ health: new_health });
  });
};

module.exports = { game_initalization, player_add, decrement_ammo, decrement_health };
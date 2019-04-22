const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// Starts a new game with a single player
exports.initalizeGame = functions.https.onRequest((request, response) => {
  const location = {
    latitude: Number(request.body.latitude),
    longitude: Number(request.body.longitude)
  };

  const playerInfo = {
    [request.body.userID]: {
      laserGunID: Number(request.body.laserGunID),
      vestID: Number(request.body.vestID),
      health: 100
    }
  };

  const gameInfo = {
    location: location,
    players: playerInfo,
  }

  admin.firestore().collection("game").add(gameInfo)
    .then((docRef) => {
      return response.send(docRef.id);
    })
    .catch((err) => {
      console.log(err);
      return response.send(err);
    });
});

// Adds a player to an existing game
exports.addPlayer = functions.https.onRequest((request, response) => {
  const playerInfo = {
    laserGunID: Number(request.body.laserGunID),
    vestID: Number(request.body.vestID),
    health: 100
  };

  const fieldToUpdate = "players." + request.body.userID;

  admin.firestore().collection("game").doc(request.body.gameID).update({
    [fieldToUpdate]: playerInfo
  })
    .then(() => {
      return response.send("Success");
    })
    .catch((err) => {
      console.log(err);
      return response.send(err);
    });
});
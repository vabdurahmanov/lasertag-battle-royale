const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// Starts a new game with a single player
exports.initalizeGame = functions.https.onRequest((request, response) => {
  const playerInfo = {
    [request.body.userID]: {
      laserGunID: Number(request.body.laserGunID),
      vestID: Number(request.body.vestID),
      health: 100
    }
  };

  admin.firestore().collection("game").add(playerInfo)
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
    [request.body.userID]: {
      laserGunID: Number(request.body.laserGunID),
      vestID: Number(request.body.vestID),
      health: 100
    }
  };

  admin.firestore().collection("game").doc(request.body.gameID).update(playerInfo)
    .then(() => {
      return response.send("Success");
    })
    .catch((err) => {
      console.log(err);
      return response.send(err);
    });
});
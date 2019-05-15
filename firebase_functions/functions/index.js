const functions = require('firebase-functions');
const admin = require('firebase-admin');
const async_functions = require('./async-functions');

admin.initializeApp();

// Starts a new game with a single player
exports.initalizeGame = functions.https.onRequest((request, response) => {
  const gameLocation = {
    latitude: Number(request.body.latitude),
    longitude: Number(request.body.longitude)
  };

  const playerInfo = {
    name: request.body.userID,
    laserGunID: Number(request.body.laserGunID),
    vestID: Number(request.body.vestID),
    health: 100,
    ammo: 100
  };

  let _ = async_functions.game_initalization(admin, playerInfo, gameLocation)
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
    name: request.body.userID,
    laserGunID: Number(request.body.laserGunID),
    vestID: Number(request.body.vestID),
    health: 100,
    ammo: 100
  };

  let _ = async_functions.player_add(admin, playerInfo, request.body.gameID)
    .then(() => {
      return response.send("Success");
    })
    .catch((err) => {
      console.log(err);
      return response.send(err);
    });
});

// Decrements a player's weapon's ammo.
exports.decrementAmmo = functions.https.onRequest((request, response) => {
  let _ = async_functions.decrement_ammo(admin, Number(request.body.laserGunID))
    .then(() => {
      return response.send("success");
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});

// Decrements a player's health.
exports.decrementHealth = functions.https.onRequest((request, response) => {
  let _ = async_functions.decrement_health(admin, Number(request.body.vestID))
    .then(() => {
      return response.send("success");
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});

// Gets player info.
exports.playerInfo = functions.https.onRequest((request, response) => {
  let _ = async_functions.player_info(admin, request.body.name)
    .then(data => {
      console.log(data)
      return response.send(data);
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const async_functions = require('./async-functions');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Starts a new game with a single player
exports.initalizeGame = functions.https.onRequest((request, response) => {
  const gameLocation = {
    latitude: Number(request.body.latitude),
    longitude: Number(request.body.longitude),
    radius: Number(request.body.radius)
  };

  const playerInfo = {
    name: request.body.userID,
    laserGunID: Number(request.body.laserGunID),
    vestID: Number(request.body.vestID),
    health: 10,
    ammo: 100
  };

  let _ = async_functions.game_initalization(admin, playerInfo, gameLocation)
    .then((docRef) => {
      console.log("THIS IS A TEST: " + docRef.id);
      cors(request, response, () => {
        return response.send(docRef.id);
      });
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
    health: 10,
    ammo: 100
  };

  let _ = async_functions.player_add(admin, playerInfo, request.body.gameID)
    .then(() => {
      cors(request, response, () => {
        return response.send("Success");
      });
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
      return response.send("Success");
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});

// Decrements a player's health.
exports.decrementHealth = functions.https.onRequest((request, response) => {
  let _ = async_functions.decrement_health(admin, Number(request.body.vestID))
    .then(() => {
      return response.send("Success");
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
      cors(request, response, () => {
        return response.send(data);
      });
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});

// Gets number of players in a game.
exports.playerCount = functions.https.onRequest((request, response) => {
  let _ = async_functions.player_count(admin, request.body.gameID)
    .then(data => {
      cors(request, response, () => {
        return response.send({ playerCount: data });
      });
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});

// Gets list of games
exports.gameList = functions.https.onRequest((request, response) => {
  let _ = async_functions.item_list(admin)
    .then(data => {
      cors(request, response, () => {
        return response.send(data);
      });
    })
    .catch(err => {
      console.log('Error getting document', err);
    })
});

// Gets latude and longitude of game
exports.latitudeLongitude = functions.https.onRequest((request, response) => {
  let _ = async_functions.lat_long(admin, request.body.gameID)
    .then(data => {
      cors(request, response, () => {
        return response.send(data);
      });
    })
    .catch(err => {
      console.log('Error getting document', err);
    })
});
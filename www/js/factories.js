angular.module('game.factories', [])

.factory('ManufacturerService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var manufacturers = [{
    id: 0,
    name: 'Nintendo',
    img: 'http://placehold.it/350x150'
  }, {
    id: 1,
    name: 'Sony',
    img: 'http://placehold.it/350x150'
  }, {
    id: 2,
    name: 'Microsoft',
    img: 'http://placehold.it/350x150'
  }, {
    id: 3,
    name: 'Atari',
    img: 'http://placehold.it/350x150'
  }];

  return {
    all: function() {
      return manufacturers;
    },
    get: function(manufacturerId) {
      for (var i = 0; i < manufacturers.length; i++) {
        if (manufacturers[i].id === parseInt(manufacturerId)) {
          return manufacturers[i];
        }
      }
      return null;
    }
  };
})

.factory('PlatformService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var platforms = [{
    id: 0,
    name: 'GameBoy',
    manufacturer: 'Nintendo',
    img: 'http://placehold.it/350x150'
  }, {
    id: 1,
    name: 'Xbox One',
    manufacturer: 'Microsoft',
    img: 'http://placehold.it/350x150'
  }, {
    id: 2,
    name: 'PlayStation 4',
    manufacturer: 'Sony',
    img: 'http://placehold.it/350x150'
  }, {
    id: 3,
    name: 'New 3DS',
    manufacturer: 'Nintendo',
    img: 'http://placehold.it/350x150'
  }, {
    id: 4,
    name: 'PlayStation 3',
    manufacturer: 'Sony',
    img: 'http://placehold.it/350x150'
  }];

  return {
    all: function() {
      return platforms;
    },
    get: function(platformId) {
      for (var i = 0; i < platforms.length; i++) {
        if (platforms[i].id === parseInt(platformId)) {
          return platforms[i];
        }
      }
      return null;
    }
  };
})

.factory('GameService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var games = [{
    id: 0,
    name: 'Super Smash Bros.',
    platforms: ['3DS', 'New 3DS', 'Wii'],
    manufacturer: 'Nintendo'
  }, {
    id: 1,
    name: 'Mario Kart 7',
    platforms: ['3DS', 'New 3DS'],
    manufacturer: 'Nintendo'
  }, {
    id: 2,
    name: 'Pokémon Omega Ruby',
    platforms: ['3DS', 'New 3DS'],
    manufacturer: 'Nintendo'
  }, {
    id: 3,
    name: 'The Legend of Zelda: Ocarina of Time 3D',
    platforms: ['3DS', 'New 3DS'],
    manufacturer: 'Nintendo'
  }, {
    id: 4,
    name: 'Super Mario 3D Land',
    platforms: ['3DS', 'New 3DS'],
    manufacturer: 'Nintendo'
  }];

  return {
    all: function() {
      return games;
    },
    remove: function(chat) {
      games.splice(games.indexOf(chat), 1);
    },
    get: function(gameId) {
      for (var i = 0; i < games.length; i++) {
        if (games[i].id === parseInt(gameId)) {
          return games[i];
        }
      }
      return null;
    }
  };
})

.factory('CommentService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

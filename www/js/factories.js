angular.module('game.factories', ['ngCordovaOauth'])

.factory('UserService', ['$ionicPlatform', '$http', 'LOGIN_CONSTANTS', '$cordovaOauth', function($ionicPlatform, $http, LOGIN_CONSTANTS, $cordovaOauth) {

  var GOOGLE_CLIENT_ID = LOGIN_CONSTANTS.GOOGLE_CLIENT_ID;
  var GOOGLE_SCOPE_EMAIL = "https://www.googleapis.com/auth/userinfo.email";
  var GOOGLE_SCOPE_PROFILE = "https://www.googleapis.com/auth/userinfo.profile";
  var GOOGLE_SCOPES = [GOOGLE_SCOPE_EMAIL, GOOGLE_SCOPE_PROFILE];
  var GOOGLE_GET_INFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo?fields=email%2Cname%2Cpicture&access_token=";

  var FACEBOOK_CLIENT_ID = LOGIN_CONSTANTS.FACEBOOK_CLIENT_ID;
  var FACEBOOK_SCOPES = ["email", "public_profile"];
  var FACEBOOK_GET_INFO_URL = "https://graph.facebook.com/v2.2/me";
  var FACEBOOK_GET_INFO_FIELDS = "id,name,email,picture";

  var user = {
    email: 'dummy@yahoo.net',
    name: 'John Dummy',
    imageUrl: 'https://placehold.it/350x350',
    games: {
      favorites: [],
      owned: [],
      wishListed: []
    },
    profile: {
      rating: 5,
      sales: 0,
      bought: 0,
      qualifications: []
    }
  };

  return {
    current: function() {
      return user;
    },
    signIn: function() {

      return true;
    },
    signInFacebook: function() {
      $ionicPlatform.ready(function() {
        // $cordovaOauth.facebook(string clientId, array appScope, object options);
         $cordovaOauth.facebook(FACEBOOK_CLIENT_ID, FACEBOOK_SCOPES).then(function(result) {
             console.log("Response Token Object -> ", result);

             user.accessToken = result.access_token;

             $http.get(FACEBOOK_GET_INFO_URL, {
               params: {
                 access_token: result.access_token,
                 fields: FACEBOOK_GET_INFO_FIELDS,
                 format: "json"
               }}).then(function(result) {

               user.email = result.data.email;
               user.name = result.data.name;
               user.imageUrl = result.data.picture.data.url;
               console.log("User Object -> ", user);

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
         }, function(error) {
             console.log("Error -> ", error);
         });
     });

      return true;
    },
    signInGoogle: function() {
      $ionicPlatform.ready(function() {
        // $cordovaOauth.google(string clientId, array appScope);
        $cordovaOauth.google(GOOGLE_CLIENT_ID, GOOGLE_SCOPES).then(function(result) {
            console.log("Response Token Object -> ", result);

            user.accessToken = result.access_token;

            $http.get(GOOGLE_GET_INFO_URL + result.access_token).then(function(result){
              console.log("Response Info Object -> ", result);

              user.email = result.data.email;
              user.name = result.data.name;
              user.imageUrl = result.data.picture;
              console.log("User Object -> ", user);

              return true;
            }, function(error) {
                console.log("Error -> ", error);
                return false;
            });

        }, function(error) {
            console.log("Error -> ", error);
            return false;
        });
      });
    },
    signOut: function() {

      return true;
    }
  };
}])

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
    manufacturer: 'Nintendo',
    img: 'http://placehold.it/350x150'
  }, {
    id: 1,
    name: 'Mario Kart 7',
    platforms: ['3DS', 'New 3DS'],
    manufacturer: 'Nintendo',
    img: 'http://placehold.it/350x150'
  }, {
    id: 2,
    name: 'Pokémon Omega Ruby',
    platforms: ['3DS', 'New 3DS'],
    manufacturer: 'Nintendo',
    img: 'http://placehold.it/350x150'
  }, {
    id: 3,
    name: 'The Legend of Zelda: Ocarina of Time 3D',
    platforms: ['3DS', 'New 3DS'],
    manufacturer: 'Nintendo',
    img: 'http://placehold.it/350x150'
  }, {
    id: 4,
    name: 'Super Mario 3D Land',
    platforms: ['3DS', 'New 3DS'],
    manufacturer: 'Nintendo',
    img: 'http://placehold.it/350x150'
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

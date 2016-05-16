angular.module('game.factories', ['ngCordovaOauth'])

.factory('UserService', ['$ionicPlatform', '$http', '$q', 'LOGIN_CONSTANTS', '$cordovaOauth', function($ionicPlatform, $http, $q, LOGIN_CONSTANTS, $cordovaOauth) {

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
    name: 'Jon Snow',
    imageUrl: 'http://data.whicdn.com/images/183719767/large.jpg',
    level: {
      number: 1,
      status: 'I know nothing...'
    },
    games: {
      favorites: [1, 24],
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
      var deferred = $q.defer();
      $ionicPlatform.ready(function() {
        // $cordovaOauth.facebook(string clientId, array appScope, object options);
         $cordovaOauth.facebook(FACEBOOK_CLIENT_ID, FACEBOOK_SCOPES).then(function(result) {
             console.log("Response Token Object -> ", result);
             console.log(result);

             user.accessToken = result.access_token;
             console.log("Access Token Object -> ", result.access_token);

             $http.get(FACEBOOK_GET_INFO_URL, {
               params: {
                 access_token: result.access_token,
                 fields: FACEBOOK_GET_INFO_FIELDS,
                 format: "json"
               }}).then(function(result) {

               user = new User(result.data.email, result.data.name, result.data.picture.data.url);
              //  user.email = result.data.email;
              //  user.name = result.data.name;
              //  user.imageUrl = result.data.picture.data.url;
               console.log("User Object -> ", user);
               deferred.resolve(user);

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
                deferred.reject(error);
            });
         }, function(error) {
             console.log("Error -> ", error);
             deferred.reject(error);
         });
     });
     return deferred.promise;
    },
    signInGoogle: function() {
       var deferred = $q.defer();
      $ionicPlatform.ready(function() {
        // $cordovaOauth.google(string clientId, array appScope);
        $cordovaOauth.google(GOOGLE_CLIENT_ID, GOOGLE_SCOPES).then(function(result) {
            console.log("Response Token Object -> ", result);

            user.accessToken = result.access_token;

            $http.get(GOOGLE_GET_INFO_URL + result.access_token).then(function(result){
              console.log("Response Info Object -> ", result);

              user = new User(result.data.email, result.data.name, result.data.picture);
              // user.email = result.data.email;
              // user.name = result.data.name;
              // user.imageUrl = result.data.picture;
              console.log("User Object -> ", user);
              deferred.resolve(user);

              return true;
            }, function(error) {
                console.log("Error -> ", error);
                deferred.reject(error);
            });

        }, function(error) {
            console.log("Error -> ", error);
            deferred.reject(error);
        });
      });
      return deferred.promise;
    },
    signOut: function() {
       var deferred = $q.defer();
       deferred.resolve(true);
       return deferred.promise;
    },
    user: {
      hasFavorite: function(gameId) {
        console.log("Game ID: ",gameId);
        console.log("Before Checking", user.games.favorites);
        return _.contains(user.games.favorites, gameId);
      },
      addFavorite: function(gameId) {
        console.log(gameId);
          console.log("Before Adding", user.games.favorites);
        user.games.favorites.push(gameId);
          console.log("After Adding", user.games.favorites);
      },
      removeFavorite: function(gameId) {
        user.games.favorites =  _.reject(user.games.favorites, function(num){ return num  == gameId; });
      },
      hasOwned: function(gameId) {
        return _.contains(user.games.owned, gameId);
      },
      addOwned: function(gameId) {
        user.games.owned.push(gameId);
      },
      removeOwned: function(gameId) {
        user.games.owned =  _.reject(user.games.owned, function(num){ return num  == gameId; });
      },
      hasWished: function(gameId) {
        return _.contains(user.games.wishListed, gameId);
      },
      addWished: function(gameId) {
        user.games.wishListed.push(gameId);
      },
      removeWished: function(gameId) {
        user.games.wishListed =  _.reject(user.games.wishListed, function(num){ return num  == gameId; });
      },
      addQualification: function(comment) {
        user.profile.qualifications.push(comment);
      }
    }
  };
}])

.factory('ManufacturerService', ['API_CONSTANTS', function(API_CONSTANTS) {
  // Might use a resource here that returns a JSON array
  var pagination = {
    limit: 30,
    offset : 0
  };

  // var manufacturers = [];

  // Some fake testing data
  var manufacturers = [
  {
    id: 70,
    name: "Nintendo",
    slug: "nintendo",
    average_rating: "8.14930433455434",
    founded_year: 1889,
    parent: null,
    company_logo: {
      url: "//res.cloudinary.com/igdb/image/upload/t_logo_med/u8wz0wrq0qctizzm66mj.png",
      width: 2000,
      height: 493
    }
  }, {
    id: 45,
    name: "Sony",
    slug: "sony",
    average_rating: "8.21894379080336",
    founded_year: 1946,
    parent: null,
    company_logo: {
      url: "//pbs.twimg.com/profile_images/418161175642128384/u24Glc4J_400x400.png",
      width: 400,
      height: 400
    }
  }, {
    id: 37,
    name: "Capcom",
    slug: "capcom",
    average_rating: "7.96955871700374",
    founded_year: 1979,
    parent: null,
    company_logo: {
      url: "//res.cloudinary.com/igdb/image/upload/t_logo_med/hcbqwbhbmrabsfk600zs.png",
      width: 5592,
      height: 1024
    }
  }, {
    id: 128,
    name: "Microsoft",
    slug: "microsoft",
    average_rating: "7.85103991660402",
    founded_year: 1975,
    parent: null,
    company_logo: {
      url: "//res.cloudinary.com/igdb/image/upload/t_logo_med/turtcfbxl1ounask0dfp.png",
      width: 2096,
      height: 771
    }
  }, {
    id: 82,
    name: "Atari",
    slug: "atari",
    average_rating: "7.94324593171652",
    founded_year: 1972,
    parent: null,
    company_logo: {
      url: "//upload.wikimedia.org/wikipedia/commons/5/58/Atari_Official_2012_Logo.svg",
      width: 1023,
      height: 1125
    }
  }, {
    id: 248,
    name: "Bandai Namco Entertainment",
    slug: "bandai-namco-entertainment",
    average_rating: "8.09211773808564",
    founded_year: 1955,
    parent: null,
    company_logo: {
      url: "//res.cloudinary.com/igdb/image/upload/t_logo_med/m3mj346jzlrjwhtdven7.png",
      width: 450,
      height: 375
    }
  }, {
    id: 112,
    name: "Sega",
    slug: "sega",
    average_rating: "7.71207927746858",
    founded_year: 1960,
    parent: null,
    company_logo: {
      url: "//res.cloudinary.com/igdb/image/upload/t_logo_med/hbil3xrhnp8fdust2juk.png",
      width: 3066,
      height: 1024
    }
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
}])

.factory('PlatformService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var platforms = [{
    id: 0,
    name: 'GameBoy',
    manufacturer: 'Nintendo',
    image: 'http://placehold.it/350x150'
  }, {
    id: 1,
    name: 'Xbox One',
    manufacturer: 'Microsoft',
    image: 'http://placehold.it/350x150'
  }, {
    id: 2,
    name: 'PlayStation 4',
    manufacturer: 'Sony',
    image: 'http://placehold.it/350x150'
  }, {
    id: 3,
    name: 'New 3DS',
    manufacturer: 'Nintendo',
    image: 'http://placehold.it/350x150'
  }, {
    id: 4,
    name: 'PlayStation 3',
    manufacturer: 'Sony',
    image: 'http://placehold.it/350x150'
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

.factory('GameService', ['API_CONSTANTS', function(API_CONSTANTS) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var games = [{
    id: 1037,
    name: "The Legend of Zelda: Phantom Hourglass",
    slug: "the-legend-of-zelda-phantom-hourglass",
    release_date: "2007-06-23",
    created_at: "2012-01-12 14:42:29 +0000",
    updated_at: "2016-05-06 06:36:23 +0000",
    synopsis: "The Legend of Zelda: Phantom Hourglass (Japanese: ゼルダの伝説 夢幻の砂時計 Hepburn: Zeruda no Densetsu: Mugen no Sunadokei?) \
    is the fourteenth installment in Nintendo's The Legend of Zelda series. The sequel to the 2002 GameCube title The Wind Waker, \
    it was developed by Nintendo Entertainment Analysis & Development and published by Nintendo for the Nintendo DS handheld game console. \
    Phantom Hourglass was released in Japan in June 2007; in North America, Australia, and Europe in October 2007; and in Korea in April 2008. \
    The game was re-released for the Wii U Virtual Console in North America in May 2016.\
    \
    The game features 3D cel-shaded graphics with an overhead camera perspective, employs controls involving the console's touchscreen and microphone, \
    and takes advantage of the Nintendo Wi-Fi Connection for online play. The game's story follows that of The Wind Waker, focusing on series protagonist \
    Link's journey to save his friend Tetra from the story's antagonist, Bellum, with the help of Captain Linebeck and his ship, the S.S. Linebeck.",
    alternative_names: [{
      name: "ゼルダの伝説 夢幻の砂時計",
      comment: null
    }],
    genres: [{
      name: "Adventure"
    }],
    themes: [{
      name: "Action"
    }, {
      name: "Fantasy"
    }],
    rating: 7.715646743774414,
    release_dates: [{
      platform_name: "Nintendo DS",
      release_date: "2007-06-23"
    }],
    companies: [{
      id: 421,
      developer: true,
      publisher: false,
      name: "Nintendo EAD"
    }, {
      id: 70,
      developer: false,
      publisher: true,
      name: "Nintendo"
    }],
    cover: {
      url: "//res.cloudinary.com/igdb/image/upload/t_cover_small/n8f0ndxrfhvagzez2luz.png",
      width: 857,
      height: 768,
      id: "n8f0ndxrfhvagzez2luz"
    },
    videos: [{
      title: "Trailer",
      uid: "X0Le3FvZWHA"
    }]
  }];

  return {
    all: function() {
      return games;
    },
    remove: function(chat) {
      games.splice(games.indexOf(chat), 1);
    },
    getByPlatform: function(platformId){
      return $http.get(API_CONSTANTS.API_BASE_URL + '/platforms/' + platformId + '/games?token='+API_CONSTANTS.API_KEY).then(function(result) {
        var data = result.data;

        if (data.errors.length > 0) {
          throw new Error(data.errors.join('\n'));
        }

        return data;
      });
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
}])

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

angular.module('game.factories', ['ngCordovaOauth', 'ngStorage'])

.factory('UserService', ['$ionicPlatform', '$http', '$q', 'LOGIN_CONSTANTS', '$cordovaOauth', 'StorageService', function($ionicPlatform, $http, $q, LOGIN_CONSTANTS, $cordovaOauth, StorageService) {

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

  var save = function(){
    StorageService.set('currentUser', user);
  };

  var retrieveUser = function(){
    console.log("retrieveUser");
    console.log(StorageService.get('currentUser'));
    return StorageService.get('currentUser');
  };

  return {
    current: function() {
      return user;
    },
    save: function(){
      save();
    },
    signIn: function() {
      user = retrieveUser();
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
               var temp = retrieveUser();
               if (temp !== null){
                 user = temp;
               }
              //  user.email = result.data.email;
              //  user.name = result.data.name;
              //  user.imageUrl = result.data.picture.data.url;
               console.log("User Object -> ", user);
               save();
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
              var temp = retrieveUser();
              if (temp !== null){
                user = temp;
              }
              // user.email = result.data.email;
              // user.name = result.data.name;
              // user.imageUrl = result.data.picture;
              console.log("User Object -> ", user);
              save();
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
        return _.contains(user.games.favorites, gameId);
      },
      addFavorite: function(gameId) {
        user.games.favorites.push(gameId);
        save();
      },
      removeFavorite: function(gameId) {
        user.games.favorites =  _.reject(user.games.favorites, function(num){ return num  == gameId; });
        save();
      },
      hasOwned: function(gameId) {
        return _.contains(user.games.owned, gameId);
      },
      addOwned: function(gameId) {
        user.games.owned.push(gameId);
        save();
      },
      removeOwned: function(gameId) {
        user.games.owned =  _.reject(user.games.owned, function(num){ return num  == gameId; });
        save();
      },
      hasWished: function(gameId) {
        return _.contains(user.games.wishListed, gameId);
      },
      addWished: function(gameId) {
        user.games.wishListed.push(gameId);
        save();
      },
      removeWished: function(gameId) {
        user.games.wishListed =  _.reject(user.games.wishListed, function(num){ return num  == gameId; });
        save();
      },
      addQualification: function(comment) {
        user.profile.qualifications.push(comment);
        save();
      }
    }
  };
}])

.factory('ManufacturerService', ['API_CONSTANTS', function(API_CONSTANTS) {

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

  var platforms = [{
    id: 7,
    name: "PlayStation",
    manufacturerID: 45,
    manufacturer: 'Sony',
    slug: "ps",
    image: '//upload.wikimedia.org/wikipedia/commons/3/39/PSX-Console-wController.jpg'
  }, {
    id: 8,
    name: "PlayStation 2",
    manufacturerID: 45,
    manufacturer: 'Sony',
    slug: "ps2",
    image: '//upload.wikimedia.org/wikipedia/commons/3/39/PS2-Versions.png'
  }, {
    id: 9,
    name: "PlayStation 3",
    manufacturerID: 45,
    manufacturer: 'Sony',
    slug: "ps3",
    image: '//upload.wikimedia.org/wikipedia/commons/d/d3/PS3Versions.png'
  },  {
    id: 48,
    name: "PlayStation 4",
    manufacturerID: 45,
    manufacturer: 'Sony',
    slug: "ps4--1",
    image: '//upload.wikimedia.org/wikipedia/commons/8/8c/PS4-Console-wDS4.png'
  },  {
    id: 38,
    name: "PlayStation Portable",
    manufacturerID: 45,
    manufacturer: 'Sony',
    slug: "psp",
    image: '//upload.wikimedia.org/wikipedia/commons/4/46/Psp-1000.jpg'
  },  {
    id: 46,
    name: "PlayStation Vita",
    manufacturerID: 45,
    manufacturer: 'Sony',
    slug: "psvita",
    image: '//upload.wikimedia.org/wikipedia/commons/b/b4/PlayStation-Vita-1101-FL.jpg'
  },
  {
    id: 37,
    name: "Nintendo 3DS",
    manufacturerID: 70,
    manufacturer: 'Nintendo',
    slug: "3ds",
    image: '//upload.wikimedia.org/wikipedia/commons/f/f0/Nintendo-3DS-AquaOpen.jpg'
  },
  {
    id: 4,
    name: "Nintendo 64",
    manufacturerID: 70,
    manufacturer: 'Nintendo',
    slug: "n64",
    image: '//upload.wikimedia.org/wikipedia/commons/e/e9/Nintendo-64-wController-L.jpg'
  },
  {
    id: 20,
    name: "Nintendo DS",
    manufacturerID: 70,
    manufacturer: 'Nintendo',
    slug: "nds",
    image: '//upload.wikimedia.org/wikipedia/commons/a/a0/Nintendo-DS-Lite-Black-Open.jpg'
  },
  {
    id: 18,
    name: "Nintendo Entertainment System (NES)",
    manufacturerID: 70,
    manufacturer: 'Nintendo',
    slug: "nes",
    image: '//upload.wikimedia.org/wikipedia/commons/8/82/NES-Console-Set.jpg'
  },
  {
    id: 21,
    name: "Nintendo GameCube",
    manufacturerID: 70,
    manufacturer: 'Nintendo',
    slug: "ngc",
    image: '//upload.wikimedia.org/wikipedia/commons/2/2b/GameCube-Console-Set.png'
  },
  {
    id: 58,
    name: "Super Famicom",
    manufacturerID: 70,
    manufacturer: 'Nintendo',
    slug: "sfam",
    image: '//upload.wikimedia.org/wikipedia/commons/e/ee/Nintendo-Super-Famicom-Set-FL.jpg'
  },
  {
    id: 19,
    name: "Super Nintendo Entertainment System (SNES)",
    manufacturerID: 70,
    manufacturer: 'Nintendo',
    slug: "snes--1",
    image: '//upload.wikimedia.org/wikipedia/commons/3/31/SNES-Mod1-Console-Set.jpg'
  },
  {
    id: 5,
    name: "Wii",
    manufacturerID: 70,
    manufacturer: 'Nintendo',
    slug: "wii",
    image: '//upload.wikimedia.org/wikipedia/commons/f/f3/Wii-Console.png'
  },
  {
    id: 41,
    name: "Wii U",
    manufacturerID: 70,
    manufacturer: 'Nintendo',
    slug: "wiiu",
    image: '//upload.wikimedia.org/wikipedia/commons/4/4a/Wii_U_Console_and_Gamepad.png'
  },
  {
    id: 11,
    name: "Xbox",
    manufacturerID: 128,
    manufacturer: 'Microsoft',
    slug: "xbox",
    image: '//upload.wikimedia.org/wikipedia/commons/4/43/Xbox-console.jpg'
  },
  {
    id: 12,
    name: "Xbox 360",
    manufacturerID: 128,
    manufacturer: 'Microsoft',
    slug: "xbox360",
    image: '//upload.wikimedia.org/wikipedia/commons/a/a8/Xbox-360-Pro-wController.png'
  },
  {
    id: 49,
    name: "Xbox One",
    manufacturerID: 128,
    manufacturer: 'Microsoft',
    slug: "xboxone",
    image: '//upload.wikimedia.org/wikipedia/commons/4/42/Xbox_One_Console_Set.jpg'
  },
  {
    id: 59,
    name: "Atari 2600",
    manufacturerID: 82,
    manufacturer: 'Atari',
    slug: "atari2600",
    image:'//upload.wikimedia.org/wikipedia/commons/b/b9/Atari-2600-Wood-4Sw-Set.jpg'
  },
  {
    id: 66,
    name: "Atari 5200",
    manufacturerID: 82,
    manufacturer: 'Atari',
    slug: "atari5200",
    image: '//upload.wikimedia.org/wikipedia/commons/a/a0/Atari-5200-4-Port-wController-L.jpg'
  },
  {
    id: 60,
    name: "Atari 7800",
    manufacturerID: 82,
    manufacturer: 'Atari',
    slug: "atari7800",
    image: '//upload.wikimedia.org/wikipedia/commons/c/cf/Atari-7800-Console-Set.png'
  },
  {
    id: 62,
    name: "Atari Jaguar",
    manufacturerID: 82,
    manufacturer: 'Atari',
    slug: "jaguar",
    image: '//upload.wikimedia.org/wikipedia/commons/9/90/Atari-Jaguar-Console-Set.png'
  },
  {
    id: 61,
    name: "Atari Lynx",
    manufacturerID: 82,
    manufacturer: 'Atari',
    slug: "lynx",
    image:  '//upload.wikimedia.org/wikipedia/commons/d/d6/Atari-Lynx-I-Handheld.jpg'
  },
  {
    id: 84,
    name: "SG-1000",
    manufacturerID: 112,
    manufacturer: 'Sega',
    slug: "sg1000",
    image: '//en.wikipedia.org/wiki/File:Sega-SG-1000-Console-Set.jpg'
  },
  {
    id: 30,
    name: "Sega 32X",
    manufacturerID: 112,
    manufacturer: 'Sega',
    slug: "sega32",
    image: '//en.wikipedia.org/wiki/File:Sega-Genesis-Model2-32X.jpg'
  },
  {
    id: 35,
    name: "Sega Game Gear",
    manufacturerID: 112,
    manufacturer: 'Sega',
    slug: "gamegear",
    image: '//upload.wikimedia.org/wikipedia/commons/1/18/Game-Gear-Handheld.jpg'
  },
  {
    id: 64,
    name: "Sega Master System",
    manufacturerID: 112,
    manufacturer: 'Sega',
    slug: "sms",
    image: '//upload.wikimedia.org/wikipedia/commons/9/98/Master_System_II.jpg'
  },
  {
    id: 29,
    name: "Sega Mega Drive/Genesis",
    manufacturerID: 112,
    manufacturer: 'Sega',
    slug: "smd",
    image: '//upload.wikimedia.org/wikipedia/commons/a/a1/Sega-Mega-Drive-JP-Mk1-Console-Set.jpg'
  },
  {
    id: 32,
    name: "Sega Saturn",
    manufacturerID: 112,
    manufacturer: 'Sega',
    slug: "saturn",
    image: '//upload.wikimedia.org/wikipedia/commons/2/20/Sega-Saturn-Console-Set-Mk1.png'
  },
  {
    id: 23,
    name: "Dreamcast",
    manufacturerID: 112,
    manufacturer: 'Sega',
    slug: "dc",
    image: '//upload.wikimedia.org/wikipedia/commons/0/07/Dreamcast-Console-Set.png'
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
    },
    getByCompany: function(id) {

      return _.filter(platforms, function(platform){ return platform.manufacturerID == id; });
    },
  };
})

.factory('GameService', ['API_CONSTANTS', '$http', '$q', function(API_CONSTANTS, $http, $q) {

  var pagination = {
    limit: 30,
    offset : 0
  };

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
      var deferred = $q.defer();
      $http.get(API_CONSTANTS.API_BASE_URL + '/platforms/' + platformId + '/games?token='+API_CONSTANTS.API_KEY).then(function(result) {
        var data = result.data;

        console.log(data);
        deferred.resolve(data.games);
      });
      return deferred.promise;
    },
    getNextByPlatform: function(platformId){
      var deferred = $q.defer();
      $http.get(API_CONSTANTS.API_BASE_URL + '/platforms/' + platformId + '/games?limit=' + pagination.limit + '&offset=' + pagination.offset + '&token='+API_CONSTANTS.API_KEY).then(function(result) {
        var data = result.data;
        pagination.offset += pagination.limit;

        console.log(data);
        deferred.resolve(data.games);
      });
      return deferred.promise;
    },
    get: function(gameId) {
      var deferred = $q.defer();
      $http.get(API_CONSTANTS.API_BASE_URL + '/games/' + gameId + '?token='+API_CONSTANTS.API_KEY).then(function(result) {
        var data = result.data;

        console.log(data);
        deferred.resolve(data.game);
      });
      return deferred.promise;
    }
  };
}])

.factory('StorageService', ['$localStorage', function($localStorage) {
  // Might use a resource here that returns a JSON array

  return {
    get: function(key) {
      return $localStorage[key];
    },
    set: function(key, value) {
      $localStorage[key] = value;
    },
    clear: function(chatId) {
      $localStorage.$reset();
    }
  };
}]);

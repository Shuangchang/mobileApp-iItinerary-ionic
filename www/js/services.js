angular.module('app.services', ['ngCookies'])

.factory('BlankFactory', [function(){

}])
  .factory('Auth', function ($cookieStore) {
    var _user = $cookieStore.get('app.user');
    var setUser = function (user) {
      _user = user;
      $cookieStore.put('app.user', _user);
    }

    return {
      setUser: setUser,
      isLoggedIn: function () {
        return _user ? true : false;
      },
      getUser: function () {
        return _user;
      },
      logout: function () {
        $cookieStore.remove('app.user');
        _user = null;
      }
    }
  })

  .factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      phone: '58512345567',
      face: 'img/ben.png',
      checked: false
    }, {
      id: 1,
      name: 'Max Lynx',
      phone: '58512345567',
      face: 'img/max.png',
      checked: false
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      phone: '58512345567',
      face: 'img/adam.jpg',
      checked: false
    }, {
      id: 3,
      name: 'Perry Governor',
      phone: '58512345567',
      face: 'img/perry.png',
      checked: false
    }, {
      id: 4,
      name: 'Mike Harrington',
      phone: '58512345567',
      face: 'img/mike.png',
      checked: false
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
  })
  .service('selectedTripInfo', function() {
    this.seletedTrip;
  })

.service('BlankService', [function(){
}]);


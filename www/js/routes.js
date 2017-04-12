angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


    $ionicConfigProvider.tabs.position('bottom'); // other values: top


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/trips.html',
      controller: 'loginCtrl',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
          $state.go('login');
        }
      }
    })
      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('trips', {
    url: '/Trips',
    templateUrl: 'templates/trips.html',
    controller: 'tripsCtrl'
  })

  .state('addNewTrip', {
    url: '/AddNewTrip',
    templateUrl: 'templates/addNewTrip.html',
    controller: 'addNewTripCtrl'
  })

  .state('events', {
    url: '/Events/:tTitle',
    templateUrl: 'templates/events.html',
    controller: 'displayCtrl'
  })

  .state('event2', {
    url: '/event2',
    templateUrl: 'templates/event2.html',
    controller: 'event2Ctrl'
  })

  .state('addNewEvent', {
    url: '/newEvent',
    templateUrl: 'templates/addNewEvent.html',
    controller: 'addNewEventCtrl'
  })

  .state('settings', {
    url: '/settings',
    abstract:true,
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

  .state('settings.profile', {
    url: '/profile',
    views: {
      'profile': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('settings.trips', {
    url: '/trips',
    views: {
      'archive': {
        templateUrl: 'templates/trips2.html',
        controller: 'trips2Ctrl'
      }
    }
  })

  .state('settings.social', {
    url: '/social',
    views: {
      'social': {
        templateUrl: 'templates/social.html',
        controller: 'socialCtrl'
      }
    }
  })

  .state('newFriend', {
    url: '/addFriend',
    templateUrl: 'templates/newFriend.html',
    controller: 'newFriendCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

$urlRouterProvider.otherwise('/login')



});

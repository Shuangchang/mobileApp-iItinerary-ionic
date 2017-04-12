// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite, $rootScope, $cordovaLocalNotification) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //if(device.platform === "iOS") {
    //  window.plugin.notification.local.promptForPermission();
    //}

    // This will create an empty database when the app runs the first time
    // and create the table 'joke'.
    // for a browser:
    $rootScope.db = window.openDatabase("dbtrip.db", '1.0', 'trip database', 65536);
    // for the device:
    //$rootScope.db = $cordovaSQLite.openDB({name: "ex05.db"});
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS trip (tTitle text, tDate date, tDestination text)");
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS event (tEvent text, tDate date, tTime time, tLocation text, tTitle text)");
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS userinfo (username text, useremail email, userpassword password, userphone tel)");
  });
})

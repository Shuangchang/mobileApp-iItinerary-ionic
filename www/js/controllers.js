angular.module('app.controllers', [])

.controller('loginCtrl', function($scope,$ionicModal, Auth, $state) {
//  .controller('loginCtrl', function($scope) {
  $scope.loginData = {};

  // Logout of the app
  $scope.logout = function () {
    Auth.logout();
    $state.go("login");
  };

// Perform the login action when the user submits the login form.
// This function gets called by this line in the login.html file:
//     <form ng-submit="doLogin()">
  $scope.doLogin = function() {


// Check if username and password were entered
    if(!angular.isDefined($scope.loginData.username) ||
      !angular.isDefined($scope.loginData.password) || $scope.loginData.username.trim() == "" ||
      $scope.loginData.password.trim() == ""){
      alert("Enter both user name and password");
      return;
    }
    // If a username and password are entered then
    // send the username to the setUser function
    // in this example, the password is never set
    Auth.setUser({
      username: $scope.loginData.username
    });
    // allow the user to go to the playlists page
    $state.go("trips");
    console.log('Doing login', $scope.loginData);
  };
  //})

  // Form data for the login modal
  //$scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  //$scope.doLogin = function() {
  //  console.log('Doing login', $scope.loginData);
  //
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    //$timeout(function() {
    //  $scope.closeLogin();
    //}, 1000);
  //};
})

.controller('tripsCtrl', function($scope) {

})

.controller('PopupCtrl',function($scope, $ionicPopup, $cordovaSQLite) {
// Triggered on a button click, or some other target

  $scope.showPopup = function () {
    $scope.data = {};
    // An elaborate, custom popup
    $scope.inputTitle = {text: ""};
    $scope.inputDate = {date: ""};
    $scope.inputDestination = {text: ""};

    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/addNewTrip.html',

      title: 'New Trip',
      scope: $scope,
      buttons: [
        {text: 'Cancel'},

        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function (e) {
            if (!angular.isDefined($scope.inputTitle.text) || !angular.isDefined($scope.inputDate.date) ||
              !angular.isDefined($scope.inputDestination.text)) {
              alert("Enter trip info.");
              return;
            }
            var myTitle = $scope.inputTitle.text;
            var myDate = $scope.inputDate.date;
            var myDestination = $scope.inputDestination.text;

            var query = "INSERT INTO trip(tTitle, tDate, tDestination) VALUES(?,?,?)";
            $cordovaSQLite.execute($scope.db, query, [myTitle, myDate, myDestination]).then(function (result) {
                console.log("INSERT ID -> " + result.insertId);
              },
              function (error) {
                console.error(error);
              });
          }
        }
      ]
    });

    myPopup.then(function (res) {
      console.log('Tapped!', res);
    });

  };
})
.controller('displayCtrl', function($scope, $cordovaSQLite, selectedTripInfo) {

  $scope.dbData = { trips:[ { tTitle:"text", tDate:"date",tDestination:"text"}
  ]};

    $scope.select = function(){
      var query = "SELECT * FROM trip where tTitle IS NOT NULL";
      $scope.dbData.trips.length = 0;
      $cordovaSQLite.execute($scope.db,query,[]).then(function(result){
        console.log("result length:"+result.rows.length);
        console.log("result title:"+result.rows.item(0).tTitle);
        if(result.rows.length>0)
        {
          for(var i=0; i<result.rows.length;i++)
          {
            $scope.dbData.trips.push({
              tTitle: result.rows.item(i).tTitle,
              tDate: result.rows.item(i).tDate,
              tDestination: result.rows.item(i).tDestination
            });
            console.log("Trip number: "+ result.rows.item(i).tDate);
            //console.log("Test title: "+ test[0].tTitle + "date"+test[0].tDate + "destination"+ test[0].tDestination);
            console.dir($scope.dbData.trips);
          }
        }
        else{
          console.log("NO ROWS EXIST");
        }
      }, function(error){
        console.error(error);
      });
    };
  $scope.onItemDelete = function(item) {
    $scope.dbData.trips.splice($scope.dbData.trips.indexOf(item), 1);
  };

    $scope.pass = function(trip)
    {
      selectedTripInfo.selectedTrip = trip;
      console.log("pass "+trip);
      //$scope.selectedTrip = trip;
      //console.log("show "+ $scope.selectedTrip.tTitle);
    }

  })

.controller('PopupCtrl2',function($scope, $ionicPopup,$cordovaSQLite) {

// Triggered on a button click, or some other target
    $scope.showPopup = function (trip) {
      //$scope.data = {};
      var tTitle = trip;
      $scope.inputevent = {text: ""};
      $scope.inputdate = {date: ""};
      $scope.inputtime = {time:""};
      $scope.inputlocation = {text: ""};
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        templateUrl:'templates/addNewEvent.html',

        title: tTitle,
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!angular.isDefined($scope.inputevent.text) || !angular.isDefined($scope.inputdate.date) ||
                !angular.isDefined($scope.inputtime.time) ||!angular.isDefined($scope.inputlocation.text)) {
                //don't allow the user to close unless he enters wifi password
                console.log("Enter event info.");
                return;
              }
              var myEvent = $scope.inputevent.text;
              var myDate = $scope.inputdate.date;
              var myTime = $scope.inputtime.time;
              var myLocation = $scope.inputlocation.text;
              var query = "INSERT INTO event(tEvent, tDate, tTime, tLocation, tTitle) VALUES(?,?,?,?,?)";
              $cordovaSQLite.execute($scope.db, query, [myEvent, myDate, myTime, myLocation, tTitle]).then(function (result) {
                  console.log("INSERT ID -> " + result.insertId);
                },
                function (error) {
                  console.error(error);
                });
            }
          }
        ]
      });

      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });
    }
  })

.controller('addNewTripCtrl', function($scope) {

})


.controller('eventsCtrl', function($scope, selectedTripInfo,$cordovaSQLite) {
  $scope.sTrip = selectedTripInfo.selectedTrip;
  console.log("select "+selectedTripInfo.selectedTrip);

  $scope.dbData = { Events:[ { tEvent:"text", tDate:"date",tTime:"time",tLocation:"text"}
  ]};

  $scope.select = function(trip){
    var trip = "\"" + trip +"\"";
    console.log(trip);
    var query1 = "SELECT tTitle, tDate, tDestination FROM trip where tTitle = " +trip;
    $cordovaSQLite.execute($scope.db,query1,[]).then(function(res){
      if(res.rows.length>0){
        for(var i=0; i<res.rows.length;i++)
        {
          $scope.tripDate = res.rows.item(i).tDate;
          $scope.tripDestination = res.rows.item(i).tDestination;
        }
        //console.log("First event is: "+ res.rows.item(i).tDestination);
      }else
      {
        console.log("No trip found.");
      }
    });

    var query = "SELECT tEvent,tDate, tTime, tLocation FROM event where tTitle = "+trip;
    console.log(query);
    $scope.dbData.Events.length = 0;
    $cordovaSQLite.execute($scope.db,query,[]).then(function(result){
      console.log("result length:"+result.rows.length);
      console.log("result title:"+result.rows.item(0).tEvent);
      if(result.rows.length>0)
      {
        for(var i=0; i<result.rows.length;i++)
        {
          $scope.dbData.Events.push({
            tEvent: result.rows.item(i).tEvent,
            tDate: result.rows.item(i).tDate,
            tTime: result.rows.item(i).tTime,
            tLocation: result.rows.item(i).tLocation
          });
          console.log("First event is: "+ result.rows.item(i).tEvent);
          //console.log("Test title: "+ test[0].tTitle + "date"+test[0].tDate + "destination"+ test[0].tDestination);
          console.dir($scope.dbData.Events);
        }
      }
      else{
        console.log("NO ROWS EXIST");
      }
    }, function(error){
      console.error(error);
    });
  };

  $scope.onItemDelete = function(item) {
    $scope.dbData.Events.splice($scope.dbData.Events.indexOf(item), 1);
  };


})

  .controller('notificationCtrl', function($scope, $cordovaLocalNotification) {
    $scope.pushNotificationChange = function() {
      var alarmTime = new Date();
      alarmTime.setMinutes(alarmTime.getMinutes() - 10);
      $cordovaLocalNotification.schedule({
        id: "1234",
        date: alarmTime,
        message: "This is a message",
        title: "This is a title",
        autoCancel: true,
        sound: null
      }).then(function () {
        console.log("The notification has been set");
      });
    console.log('Push Notification Change', $scope.pushNotification.checked);
  };
    $scope.pushNotification = { checked: true };

    $scope.isScheduled = function() {
      $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
        alert("Notification 1234 Scheduled: " + isScheduled);
      });
    }
  })

.controller('event2Ctrl', function($scope) {

})

.controller('addNewEventCtrl', function($scope) {

})

.controller('settingsCtrl', function($scope) {

})

.controller('profileCtrl', function($scope, $cordovaSQLite) {
  //$scope.userinfo = {userone:[ { username:"text", useremail:"email",userpassword:"password", userphone:"phone"}
  //  ]};

    $scope.select = function(){
      var query = "SELECT * FROM userinfo";
      //$scope.userinfo.userone.length = 0;
      $cordovaSQLite.execute($scope.db,query,[]).then(function(result){
        console.log("result length:"+result.rows.length);
        console.log("result title:"+result.rows.item(0).username);
        if(result.rows.length>0)
        {
          for(var i=0; i<result.rows.length;i++)
          {
            $scope.username = result.rows.item(i).username;
            $scope.useremail= result.rows.item(i).useremail;
            $scope.userpassword = result.rows.item(i).userpassword;
            $scope.userphone=result.rows.item(i).userphone;
            console.log("user is: "+ result.rows.item(i).username);
          }
        }
        else{
          console.log("NO ROWS EXIST");
        }
      }, function(error){
        console.error(error);
      });
    };

  $scope.modify = function(username){
    //console.log("modify"+username);
    var username = "\"" + username + "\"";
    var uemail = $scope.useremail;
    var upassword = $scope.userpassword;
    var uphone = $scope.userphone;
    //console.log("changeinfo"+uemail+upassword+uphone);
    var query1 = "UPDATE userinfo SET useremail="+"\""+uemail+"\", userpassword ="+"\""+upassword+"\", userphone ="+"\""+uphone+"\" where username = " + username;
    //console.log(query1);
    $cordovaSQLite.execute($scope.db,query1,[]).then(function(res){
      if(res.rows.length>0) {
        for (var i = 0; i < res.rows.length; i++) {
          $scope.useremail = res.rows.item(i).useremail;
          $scope.userpassword = res.rows.item(i).userpassword;
          $scope.userphone = res.rows.item(i).userphone;
          console.log("user is: " + res.rows.item(i).username);
        }
      }
      alert(username+" is updated.");
    });
  }
})

.controller('trips2Ctrl', function($scope) {

})

.controller('socialCtrl', function($scope,Chats,$cordovaContacts) {
  $scope.chats = Chats.all();

  $scope.getContacts = function() {
    $scope.phoneContacts = [];
    function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }
    }
    //function onError(contactError) {
    //  alert(contactError);

    //var options = {};
    //options.multiple = true;
    //$cordovaContacts.find(options).then(onSuccess, onError);
  };

  $scope.onItemDelete = function(item) {
    $scope.dbData.Events.splice($scope.dbData.Events.indexOf(item), 1);
  };
})

.controller('newFriendCtrl', function($scope, $ionicPopup,Chats) {
  $scope.chats = Chats.all();
  $scope.socialPopup = function () {
    $scope.data = [];
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/newFriend.html',

      title: 'Add people',
      scope: $scope,
      buttons: [
        {text: 'Cancel'},
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function (e) {
            for(var i=0;i<$scope.chats.length;i++){
              if ($scope.chats[i].checked) {
                $scope.data.push($scope.chats[i]);
                console.log('selected: '+ $scope.chats[i].name);
              }
            }
          }
        }
      ]
    });
    myPopup.then(function (res) {
      console.log('Tapped!', res);
    });
  };

  $scope.onItemDelete = function(item) {
    $scope.dbData.Events.splice($scope.dbData.Events.indexOf(item), 1);
  };
})

.controller('signupCtrl', function($scope,$cordovaSQLite) {
  $scope.inputuser;
  $scope.inputemail;
  $scope.inputpassword;
  $scope.inputphone;

  $scope.insert = function( ) {
    if(!angular.isDefined($scope.inputuser) ||
       !angular.isDefined($scope.inputpassword))
    {
      alert("Enter both user info:  " + $scope.inputuser + " and "+$scope.inputpassword);
      return;
    }
    console.log("INSERT ID -> " + $scope.inputuser);
    //console.log("INSERT ID -> " + $scope.inputemail);
    //console.log("INSERT ID -> " + $scope.inputpassword);
    var user = $scope.inputuser;
    var useremail = $scope.inputemail;
    var userpassword = $scope.inputpassword;
    var userphone = $scope.inputphone;
    var query = "INSERT INTO userinfo (username, useremail, userpassword,userphone) VALUES (?,?,?,?)";
    $cordovaSQLite.execute($scope.db,query,[user,useremail,userpassword,userphone]).then(function(result) {
        console.log("INSERT ID -> " + user);
      },
      function(error) {
        console.error(error);
      });
  };
});

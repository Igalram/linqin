app.controller("homeCtrl", function ($scope, $q, $http, $routeParams, $location, feedSrv) {
  $scope.testhomeCtrl = "try try home Ctrl";
  $scope.receivedToken = 'asdf';
  var token = $location.$$url.substring(15);
  
  //new code for dynamic redirect
  var host = $location.host();
  $scope.host = host;
  if (host=="localhost"){host+=":5500";}
  else if (host=="127.0.0.1"){host+=":5500";}
  console.log(host);
  
  
  if (token) {
    feedSrv.token = token;
    localStorage.setItem("token", token);
    $location.path("/feed");
  }

})

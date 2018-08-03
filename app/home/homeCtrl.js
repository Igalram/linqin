app.controller("homeCtrl", function ($scope, $q, $http, $routeParams, $location, feedSrv) {
  $scope.testhomeCtrl = "try try home Ctrl";
  $scope.receivedToken = 'asdf';
  var token = $location.$$url.substring(15);
  if (token) {
    feedSrv.token = token;
    localStorage.setItem("token", token);
    $location.path("/feed");
  }

})

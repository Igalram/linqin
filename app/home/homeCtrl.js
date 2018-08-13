app.controller("homeCtrl", function ($scope, $q, $http, $routeParams, $location, feedSrv) {
  $scope.testhomeCtrl = "try try home Ctrl";
  $scope.receivedToken = 'asdf';
  var token = $location.$$url.substring(15);

  //new code for dynamic redirect
  var host = $location.host();
  var url = "https://api.instagram.com/oauth/authorize/?client_id=f4be7d884aff47a49265754517616a0c&redirect_uri=";
  console.log(host);
  if (host == "http://localhost") { host = url + "http://localhost" + ":5500/" + "&response_type=token"; }
  else if (host == "127.0.0.1") { host = url + "http://localhost" + ":5500/" + "&response_type=token"; }
  else {
    host = url + "https://igalram.github.io/linqin/#!/" + "&response_type=token";
  }

  $scope.host = host;
  console.log($scope.host);


  if (token) {
    feedSrv.token = token;
    localStorage.setItem("token", token);
    $location.path("/feed");
  }

})

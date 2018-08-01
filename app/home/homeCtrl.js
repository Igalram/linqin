app.controller("homeCtrl", function ($scope, $q, $http) {
$scope.testhomeCtrl = "try try home Ctrl";
$scope.receivedToken='asdf';

})
/*
$scope.authenticate = function () {
    console.log("authenticate is called");

    var async = $q.defer();
    var igCallUrl = "https://api.instagram.com/oauth/authorize/?client_id=f4be7d884aff47a49265754517616a0c&redirect_uri=https://igalram.github.io/linqin/#!/feed.html&response_type=token";

    $http.get(igCallUrl).then(function (response) {
            console.log($scope.receivedToken);
            $scope.receivedToken = response.data.results;
            async.resolve($scope.receivedToken);

        },
        function (error) {
            console.error(error);
            async.reject("failed to get response");
        })
}

return $scope.receivedToken;
});*/


/*
favMoviesSrv.getMovie(result).then(function (results) {
  $scope.movies = favMoviesSrv.movies;
  $scope.tempResults.splice(0, $scope.tempResults.length);
},
  function (error) {
    $log.error(error);
  })

  */

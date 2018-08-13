
app.controller('viewerCtrl', function ($scope, $q, $http, $location, $routeParams, feedSrv) {

  
            var username = $routeParams.name;
            console.log(username);

            getDbByName(username);
            $scope.userFeed = feedSrv.userFeed; 

        


});

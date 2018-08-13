
app.controller('viewerCtrl', function ($scope, $timeout, $q, $http, $location, $routeParams, feedSrv) {
    var username = $routeParams.name;
    console.log(username);

    getDbByName(username);

    // $timeout(function () {
    //     $scope.userFeed = feedSrv.userFeed;
    //     console.log("profilePicture="+feedSrv.profilePicture());
    //     $scope.profilePicture = feedSrv.profilePicture();
    //     console.log("profilePicture scope="+$scope.profilePicture);
    //     $scope.userName = feedSrv.userName();
    //     $scope.fullName = feedSrv.fullName();
    // }, 2000)

    // $scope.profilePicture = '';
    // $scope.userName = '';
    // $scope.fullName = '';
    feedSrv.getAllInfo().then(function (data) {
        console.log(data);
        $scope.userFeed = feedSrv.userFeed;
        $scope.userInfo = data.user;
        $scope.profilePicture = data.user.profile_picture;
    });

   
    $scope.profilePicture = '';
    $scope.userName = '';
    $scope.fullName = '';

});

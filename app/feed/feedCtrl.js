angular.module("linquinApp").directive('instagramProfile', function () {

    //https://api.instagram.com/v1/users/self/?access_token=ACCESS-TOKEN

    return {
        restrict: "E",
        controllerAs: "instagramFeed",
        templateUrl: "instagramTemplate",
        controller: function ($scope, $http) {

            var instagramFeed = this;
            $http({
                url: 'https://api.instagram.com/v1/users/self/media/recent',
                params: {
                    access_token: instagram_key
                }
            }).then(function (response) {
                console.log(response);

                //userInfo
                var userInfo = response.data.data[0].user;
                instagramFeed.full_name = userInfo.full_name;
                instagramFeed.username = userInfo.username;
                instagramFeed.profile_picture = userInfo.profile_picture;
            })
        }
    }
})


// app.controller('feedCtrl', function ($scope, $http, $location, feedSrv) {


//     $scope.testfeedCtrl = "try try feed Ctrl"
//     console.log($scope.testfeedCtrl);


//     });



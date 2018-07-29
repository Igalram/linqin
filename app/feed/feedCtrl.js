// angular.module("linquinApp").directive('instagramProfile', function () {

// //     //https://api.instagram.com/v1/users/self/?access_token=ACCESS-TOKEN


// })


app.controller('feedCtrl', function ($scope, $http, $location, $localStorage, feedSrv) {

    $scope.test = "testtest";
    $scope.getFeed = function(token){
        window.alert("the token is");
        window.alert($localStorage.token);
    }


    $scope.testfeedCtrl = "try try feed Ctrl"
    console.log($scope.testfeedCtrl);


    // return {
    //     restrict: "E",
    //     //controllerAs: "instagramFeed",
    //     //templateUrl: "instagramTemplate",
    //     transclude: true,
    //     controller: function ($scope, $http) {

    //         var instagramFeed = this;
    //         instagramFeed.content = [];

    //         $http({
    //             url: 'https://api.instagram.com/v1/users/self/media/recent',
    //             params: {
    //                 access_token: instagram_key
    //             }
    //         }).then(function (response) {
    //             console.log(response);

    //             //userInfo
    //             var userInfo = response.data.data[0].user;
    //             instagramFeed.full_name = userInfo.full_name;
    //             instagramFeed.username = userInfo.username;
    //             instagramFeed.profile_picture = userInfo.profile_picture;

    //             //user Images
    //             angular.forEach(response.data.data, function (Object, key) {
    //                 instagramFeed.content[key] = {};
    //                 instagramFeed.content[key].imageUrl = object.images.standard_resolution.url;
    //                 instagramFeed.content[key].instagramLink = object.link;
    //             })
    //         })
    //     }
    // }



});



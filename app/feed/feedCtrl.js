// angular.module("linquinApp").directive('instagramProfile', function () {

// //     //https://api.instagram.com/v1/users/self/?access_token=ACCESS-TOKEN


// })


app.controller('feedCtrl', function ($scope, $q, $http, $location, feedSrv) {

    $scope.test = "testtest";
    // $scope.getFeed = function (token) {
    //     window.alert("the new token is");
    //     $scope.token = localStorage.getItem("token");
    //     window.alert($scope.token);
    // }


    $scope.testfeedCtrl = "try try feed Ctrl"
    console.log($scope.testfeedCtrl);

    $scope.content = [];
    $scope.userInfo = {};
    window.alert("getting into getFeed function with q5");

    $scope.token = localStorage.getItem("token");
    window.alert($scope.token);
    var request = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + $scope.token;
    $http.get(request).then(function (response) {
        //$scope.content = response.data;

        //userInfo
        var userInfo = response.data.data[0].user;
        console.log("username" + userInfo.full_name);

        $scope.content = response.data;
        console.log($scope.content);

    }, function (error) {
        console.error(error);
    })

    console.log("user Info:" + $scope.userInfo);

    function Post(id, userId, img, thumb, date, likes, link, location) {
        thid.id = id;
        this.userId = userId;
        this.img = img;
        this.thumb = thumb;
        this.date = date;
        this.numLikes = numLikes;
        this.link = link;
        this.location = location;

    }

    $scope.posts = [];
    $http.get('feed.json').then(function (response) {
        response.data.forEach(function (plainObj) {
            var post = new Post(plainObj.id, plainObj.userId, plainObj.img, plainObj.thumb, plainObj.date, plainObj.numLikes, plainObj.link, plainObj.location);
            $scope.posts.push(post);
        });
    
        
        }
    }



    //console.log("$scope.content: " + $scope.content);




    // $scope.getFeed = function (token) {

    //     $scope.token = localStorage.getItem("token");
    //     window.alert($scope.token);
    //     var request = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + $scope.token;
    //     var async = $q.defer();
    //     $http.get(request).then(function (response) {
    //         //$scope.content = response.data;

    //         //userInfo
    //         var userInfo = response.data.data[0].user;
    //         console.log("username" + userInfo.full_name);


    //         async.resolve(request);
    //     }, function (error) {
    //         console.error(error);
    //         async.reject("Failed to get feed");
    //     })

    //     console.log("user Info:" + $scope.userInfo);
    //     //console.log("$scope.content: " + $scope.content);
    //     return async.promise;
    // }

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



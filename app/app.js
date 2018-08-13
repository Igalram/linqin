//https://igalram.github.io/linqin/#!
//https://api.instagram.com/v1/users/self/media/recent/?access_token=4045882209.f4be7d8.37249150849848b08a2376e3d5239a1f

var app = angular.module("linquinApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'homeCtrl'
    })
    .when('/feed', {
      templateUrl: 'app/feed/feed.html',
      controller: 'feedCtrl'
    })
    .when('/:access_token', {
      templateUrl: 'app/home/home.html',
      controller: 'homeCtrl'
    })

    .when('/v/:name', {
      templateUrl: 'app/viewer/viewer.html',
      controller: 'viewerCtrl'
    })




    /*
        .when('/access_token=:accessToken', {
          template: '',
          controller: function ($location,$rootScope) {
            var hash = $location.path().substr(1);
            
            var splitted = hash.split('&');
            var params = {};
    
            for (var i = 0; i < splitted.length; i++) {
              var param  = splitted[i].split('=');
              var key    = param[0];
              var value  = param[1];
              params[key] = value;
              $rootScope.accesstoken=params;
            }
            $location.path("/about");
          }
        })
    */

    .otherwise({
      redirectTo: '/'
    })
})

// code to validate URL:

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
}


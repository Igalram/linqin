var app = angular.module("linquinApp", ["ngRoute"]); 



app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'app/home.html',
      controller: 'homeCtrl'
    })

    .when('/feed.html', {
      templateUrl: 'app/feed/feed.html',
      controller: 'feedCtrl'
    })


    .otherwise({
      redirectTo: '/'
    })
  })
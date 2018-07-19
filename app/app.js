var app = angular.module("toDoApp", ["ngRoute"]); 



app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'app/home.html',
      controller: 'toDoCtrl'
    })


    .otherwise({
      redirectTo: '/'
    })
  })
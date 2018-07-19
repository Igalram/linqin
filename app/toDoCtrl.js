app.controller('toDoCtrl', function ($scope, $http, $location, toDoSrv) {
    
  $scope.tasks = toDoSrv.getTaskList();

  $scope.mouseOver = false;

  $scope.currentFilter = "";

  $scope.setTask = function () {
    toDoSrv.setTask($scope.newTask);
    $scope.newTask = '';
  }

  $scope.delTask = function (index) {
    toDoSrv.delTask(index);
    console.log("CTRL: delTask is called");
  }

  $scope.checkTask = function (index) {
    toDoSrv.checkTask(index);
    console.log("CTRL: checkTask is called");
  }

  $scope.setFilterBy = function (filterBy) {

    $scope.currentFilter = filterBy;
    

  }

  $scope.getFilterBy = function () {
    
    return $scope.currentFilter;

  }

  $scope.numActive = function () {
    var i;
    var x = 0; 
    for (i=0; i<$scope.tasks.length; i++)
    {
      if ($scope.tasks[i].status==false) {x++};
    }  
    return x;

  }

  
    




});

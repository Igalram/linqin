app.factory('toDoSrv', function($http, $log, $q) {

    var testSrv= "do you see favMovieservice service???";
    console.log (testSrv);

    var tasks=[];

  //constructor
  function Tasks (id, text, isDone) {
    this.id = id;
    this.text = text;
    this.status = isDone;

  }

  var task = new Tasks (001, "buy milk", false);
  tasks.push(task);

  var task = new Tasks (002, "call Mom", true);
  tasks.push(task);

  var task = new Tasks (003, "Wash car", false);
  tasks.push(task);

  var task = new Tasks (004, "dance the macarena", false);
  tasks.push(task);

  var task = new Tasks (005, "Play ball", true);
  tasks.push(task);

  console.log (tasks);

  function getTaskList () {
      return tasks;
  }

  function setTask (newTask) {
    var task = new Tasks (005, newTask, false);
    tasks.push(task);

  }

  function delTask (index) {
    tasks.splice(index, 1);
  }


  function checkTask (index) {
    tasks[index].status = true; 
  }

    return {

        getTaskList : getTaskList,
        setTask : setTask,
        delTask : delTask,
        checkTask : checkTask

    }

});


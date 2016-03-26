ToDoApp.namesapce("ToDoApp.view");

ToDoApp.view = {
  showTrash: false,

  render: function() {
    ToDoApp.interface.initToDoList();

    var taskInput = document.getElementsByClassName("new-todo")[0];
    taskInput.value = "";
    taskInput.addEventListener("keydown", ToDoApp.events.addTaskToView);

    var activeTasks = ToDoApp.interface.returnActiveTasks();
    var archivedTasks = ToDoApp.interface.returnArchivedTasks();
    var trashTasks = ToDoApp.interface.returnTrashTasks();
    
    var trashToggleDiv = document.getElementById("trash-toggle");
    trashToggleDiv.className = !(this.showTrash)? "show-trash": "hide-trash"
    trashToggleDiv.className += (trashTasks.length)? " some-trash": " zero-trash"
    trashToggleDiv.addEventListener("click", ToDoApp.events.trashViewToggle);

    var appContainer = document.getElementById("todo-app-container");
    var headerContainer = document.getElementById("todo-header-container");
    var listContainer = document.getElementById("todo-list-container");

    this.showTrash = this.showTrash && trashTasks.length;
    if(!(activeTasks.length || archivedTasks.length || this.showTrash)){
      listContainer.className = "zero-todo";
      headerContainer.className = "zero-todo";
      appContainer.className = "zero-todo";
    }
    else {
      var listHeading = document.getElementsByClassName('list-heading')[0];

      appContainer.className = "some-todo";
      headerContainer.className = "some-todo"
      listContainer.className = "some-todo";

      var listUlElement = document.getElementsByClassName("todo-list")[0];
      listUlElement.innerHTML = "";

      var totalTasks = activeTasks.length + archivedTasks.length;

      if (!this.showTrash) {
        listHeading.innerHTML = activeTasks.length === 1?
          "this todo...":
          "these " + activeTasks.length.toString() + " todo...";
        document.getElementById("trash-toggle").innerHTML = "show trash";
        if (activeTasks.length === 0) {
          listHeading.innerHTML = "all done! yay..."
        }
        for (var i = 0; i < activeTasks.length; i++) {
          var taskLiElement = this.createLiElement(activeTasks[i], false);
          listUlElement.appendChild(taskLiElement);
        }
        for (var i = 0; i < archivedTasks.length; i++) {
          var taskLiElement = this.createLiElement(archivedTasks[i], true);
          listUlElement.appendChild(taskLiElement);
        }
      }
      else {
        listHeading.innerHTML = "they were all todo...";
        document.getElementById("trash-toggle").innerHTML = "hide trash";
        for (var i = 0; i < trashTasks.length; i++) {
          var taskLiElement = this.createLiElement(trashTasks[i], trashTasks[i].isDone, true);
          listUlElement.appendChild(taskLiElement);
        }
      }
    }
  },

  createLiElement: function (task, isArchivedTask, isTrashTask) {
    var isTrashTask = isTrashTask || false;
    var taskLi = document.createElement("li");
    taskLi.className = "todo-item";
    taskLi.className += (isArchivedTask? " completed-todo": " active-todo");
    taskLi.setAttribute("todo-id", task.id);

    var taskCheckbox = document.createElement("input");
    taskCheckbox.className = "toggle-done";
    taskCheckbox.type = "checkbox";
    taskCheckbox.setAttribute("todo-id", task.id);
    taskCheckbox.checked = isArchivedTask;
    taskCheckbox.addEventListener("change", ToDoApp.events.archiveToggleTaskFromView);

    var taskLabel = document.createElement("label");
    taskLabel.className = "todo-text";
    taskLabel.setAttribute("todo-id", task.id);
    taskLabel.innerHTML = task.description;
    taskLabel.addEventListener("click", ToDoApp.events.archiveToggleTaskFromView)

    var taskTrashButton = document.createElement("button");
    taskTrashButton.className = "remove-todo";
    taskTrashButton.setAttribute("todo-id", task.id);
    taskTrashButton.innerHTML = isTrashTask? "<": "x";
    taskTrashButton.addEventListener("click", ToDoApp.events.trashToggleTaskFromView);

    taskLi.appendChild(taskCheckbox);
    taskLi.appendChild(taskLabel);
    taskLi.appendChild(taskTrashButton);

    return taskLi;
  }
}

ToDoApp.view.render();

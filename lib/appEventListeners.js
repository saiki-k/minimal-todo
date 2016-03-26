ToDoApp.namesapce("ToDoApp.events");

ToDoApp.events = {
  addTaskToView: function(event) {
    var taskDescription = event.target.value.substring(0, 25);
    if (!taskDescription) {
      return;
    }
    if (event.keyCode === 13) {
      var taskObject = ToDoApp.interface.createTask(taskDescription);
      ToDoApp.view.showTrash = false;
      ToDoApp.view.render();
    }
  },

  archiveToggleTaskFromView: function(event) {
    var triggerNode = event.target;
    ToDoApp.interface.archiveToggle(triggerNode.getAttribute("todo-id"));
    ToDoApp.view.render();
  },

  trashToggleTaskFromView: function(event) {
    var triggerNode = event.target;
    ToDoApp.interface.trashToggle(triggerNode.getAttribute("todo-id"));
    ToDoApp.view.render();
  },

  deleteTaskFromView: function(event) {
    var triggerNode = event.target;
    ToDoApp.interface.deleteTask(triggerNode.getAttribute("todo-id"));
    ToDoApp.view.render();
  },

  trashViewToggle: function(event) {
    var triggerNode = event.target;
    if (triggerNode.className.indexOf("show-trash") === 0) {
      triggerNode.className = "hide" + triggerNode.className.substring(4);
      triggerNode.innerHTML = "hide trash";
      ToDoApp.view.showTrash = true;
      ToDoApp.view.render();
    }
    else {
      triggerNode.className = "show" + triggerNode.className.substring(4);
      triggerNode.innerHTML = "show trash";
      ToDoApp.view.showTrash = false;
      ToDoApp.view.render();
    }
  }
}

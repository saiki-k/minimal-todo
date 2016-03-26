ToDoApp.namesapce("ToDoApp.interface");

ToDoApp.interface = {
  initToDoList: function () {
    if (!this.toDoList) {
        this.toDoList = this.loadFromLocalStorage() || [];
    }
  },

  loadFromLocalStorage: function () {
    var loadedItems = [];
    for (var i = 0; i < localStorage.length; i++) {
      var propName = localStorage.key(i);
      if (propName.indexOf("simpleTask") === 0) {
        var taskJSON = localStorage.getItem(propName);
        var taskObject = JSON.parse(taskJSON);
        loadedItems.push(taskObject);
      }
    }
    return loadedItems;
  },

  saveToLocalStorage: function () {
    for (var i = 0; i < this.toDoList.length; i++) {
      var propName = "simpleTask" + this.toDoList[i].id;
      // Trash is not saved to localStorage
      if (!this.toDoList[i].isTrash) {
        localStorage[propName] = JSON.stringify(this.toDoList[i]);
      }
      else {
        localStorage.removeItem(propName);
      }
    }
  },

  // Helper function for generating unique IDs
  guidGenerator: function () {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  },

  // Create and return a task object with appropriate props.
  // Push it to 'toDoList' array
  createTask: function (description, id, priority, isDone, isTrash) {
    var taskObject = {
      description: description,
      id: id || this.guidGenerator(),
      priority: priority || "N",
      isDone: isDone || false,
      isTrash: isTrash || false,
    };
    this.toDoList.push(taskObject);
    this.saveToLocalStorage();
    return taskObject;
  },

  // Toggle the 'isArchive' attribute of a task
  archiveToggle: function (taskId) {
    for (var i = 0; i < this.toDoList.length; i++) {
      if (this.toDoList[i].id === taskId) {
        this.toDoList[i].isDone = !this.toDoList[i].isDone;
        this.saveToLocalStorage();
        return;
      }
    }
  },

  // Toggle the 'isTrash' attribute of a task
  trashToggle: function (taskId) {
    for (var i = 0; i < this.toDoList.length; i++) {
      if (this.toDoList[i].id === taskId) {
        this.toDoList[i].isTrash = !this.toDoList[i].isTrash;
        this.saveToLocalStorage();
        return;
      }
    }
  },

  // Caution: Deletion is permanent...
  deleteTask: function (taskId) {
    for (var i = 0; i < this.toDoList.length; i++) {
      if (this.toDoList[i].id === taskId) {
        this.toDoList.splice(i, 1);
        this.saveToLocalStorage();
        return;
      }
    }
  },

  // Return an array containing desired tasks
  returnAllTasks: function() {
    var allTasks = [];
    for (var i = 0; i < this.toDoList.length; i++) {
      allTasks.push(this.toDoList[i]);
    }
    return allTasks;
  },
  returnActiveTasks: function() {
    var activeTasks = [];
    for (var i = 0; i < this.toDoList.length; i++) {
      if (!this.toDoList[i].isDone && !this.toDoList[i].isTrash) {
        activeTasks.push(this.toDoList[i]);
      }
    }
    return activeTasks;
  },
  returnArchivedTasks: function() {
    var archivedTasks = [];
    for (var i = 0; i < this.toDoList.length; i++) {
      if (this.toDoList[i].isDone && !this.toDoList[i].isTrash) {
        archivedTasks.push(this.toDoList[i]);
      }
    }
    return archivedTasks;
  },
  returnTrashTasks: function() {
    var trashArchivedTasks = [];
    var trashActiveTasks = []
    for (var i = 0; i < this.toDoList.length; i++) {
      if (this.toDoList[i].isTrash) {
        (this.toDoList[i].isDone)? trashArchivedTasks.push(this.toDoList[i]): trashActiveTasks.push(this.toDoList[i]);
      }
    }
    return trashActiveTasks.concat(trashArchivedTasks);
  }
}

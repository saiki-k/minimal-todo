var ToDoApp = ToDoApp || {};

// Module pattern sourced from Mikita Manko's blog:
// http://www.mikitamanko.com/blog/2013/05/06/javascript-design-patterns/
ToDoApp.namesapce = function(namespace) {
  var parts = namespace.split("."),
      parent = ToDoApp;

  // strip redundant leading global, if any...
  parts = (parts[0] === "ToDoApp")? parts.slice(1): parts;
  for(var i = 0; i < parts.length; i++) {
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }

  return parent;
};

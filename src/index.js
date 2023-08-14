import './style.css';
import Task from './task.js'
import Project from './project.js'

let myProj = new Project("test");
let myTask = new Task("wash deeshes", "low", "today", "hehehaha");

myProj.addTask(myTask);
myProj.displayTasks();

/*
Functionality I still need to implement:
-add tasks
  simple event listener w/ an add button
-expand/edit task
  Edit button that makes task focused and blurs out rest
-delete task
  Delete a task from obj - use an event listener probably
-add projects
  simple event listener w/ an add button
-switch project in view
  -simple event listener tab system where i clear out container contents and add new stuff
-store data locally

Things I need to figure out:
-how to keep track of each project?
  arr w/ task objects?
-array of projects?
*/
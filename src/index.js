import './style.css';
import Task from './task.js'
import Project from './project.js'

const form = document.querySelector('.add');

let myProj = new Project("test");

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskName = document.getElementById('name').value;
    const priority = document.getElementById('priority').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    let myTask = new Task(taskName, priority, date, description);
    myProj.addTask(myTask);
    form.reset();
    myProj.displayTasks();
});

let someTask = new Task("wash deeshes", "low", "today", "hehehaha");

myProj.addTask(someTask);
myProj.displayTasks();

/*
Functionality I still need to implement:
-expand/edit task
  Edit button that makes task focused and blurs out rest
-add projects
  simple event listener w/ an add button
-switch project in view
  -simple event listener tab system where i clear out container contents and add new stuff
-store data locally
*/
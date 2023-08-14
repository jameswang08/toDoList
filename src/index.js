import './style.css';
import Task from './task.js'
import Project from './project.js'
import Dash from './dashboard.js'

//New Task
const form = document.querySelector('.add');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskName = document.getElementById('name').value;
    const priority = document.getElementById('priority').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    let myTask = new Task(taskName, priority, date, description);
    dashboard.getCurrentProjectInView().addTask(myTask);
    form.reset();
    dashboard.getCurrentProjectInView().displayTasks();
});

//New Project
const newProject = document.querySelector('.addProject');

newProject.addEventListener('submit', (event) => {
  event.preventDefault();

  const newProjectName = document.getElementById('projName').value;
  dashboard.addProject(new Project(newProjectName));

  dashboard.displayProjects();

  newProject.reset();
});

let someTask = new Task("Example Project", "low", "today", "Lorem Ipsum");
let myProj = new Project("Example Project");
myProj.addTask(someTask);

let dashboard = new Dash(myProj);
dashboard.displayProjects();

/*
Functionality I still need to implement:
-switch project in view
  -simple event listener tab system where i clear out container contents and add new stuff
-store data locally
*/
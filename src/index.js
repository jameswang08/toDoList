import './style.css';
import Task from './task.js'
import Project from './project.js'
import Dash from './dashboard.js'

//Custom Sort Helper Function
const regex = /Project: (.+?) Task:/;

// Custom sorting function
function customSort(a, b) {
  const matchA = a.match(regex);
  const matchB = b.match(regex);

  if (!matchA && matchB) return -1;
  else if (matchA && !matchB) return 1;
  else return 0;
}

//Event listener for adding new tasks
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

//Event listener for adding new projects
const newProject = document.querySelector('.addProject');

newProject.addEventListener('submit', (event) => {
  event.preventDefault();

  const newProjectName = document.getElementById('projName').value;
  dashboard.addProject(new Project(newProjectName));

  dashboard.displayProjects();

  newProject.reset();
});

//CODE THAT IS RUN WHEN USER ACCESSES SITE

//If the user hasn't visited the site yet, create an exampele project and task
if(window.localStorage.length==0){
  let myProj = new Project("Example Project");
  let someTask = new Task("Example Task", "low", "today", "Lorem Ipsum");
  myProj.addTask(someTask);

  //Var so that dashboard persists outside of this loop
  var dashboard = new Dash(myProj);
}
//Otherwise, load previous projects and tasks
else{
  //Sort local data so that projects always come before tasks
  const keys = Object.keys(localStorage);
  keys.sort(customSort);
  for(let i = 0; i < keys.length; i++){

    const key = keys[i];
    const match = key.match(regex);

    let item = JSON.parse(window.localStorage.getItem(key));

    //First key in storage will always be a project
    if(i==0){
      let newProj = new Project(item.name, []);
      var dashboard = new Dash(newProj);
      continue;
    }
    //If the key in storage contains a task
    if(match && match[1]){
      //Create new task object so that it retains its methods
      let newTask = new Task(item.name, item.priority, item.date, item.description);
      //Find project in Dashboard and add task to it
      dashboard.projList.find((proj) => proj.name == match[1]).addTask(newTask);
    }
    //Otherwise if the key contains a project
    else{
      let newProj = new Project(item.name, []);
      dashboard.addProject(newProj);
    }
  }
}
dashboard.displayProjects();
dashboard.getCurrentProjectInView().displayTasks();
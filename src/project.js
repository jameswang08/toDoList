class Project{
    constructor(projName){
        this.name=projName;
        this.taskList = [];
    }
    addTask(taskObj){
        this.taskList.push(taskObj);
    }
    displayTasks(){
        const newProj = document.querySelector('.tasks');
        this.taskList.forEach( item => {
            newProj.appendChild(item.display());
        });
    }
}

export default Project
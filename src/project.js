class Project{
    constructor(projName){
        this.name=projName;
        this.taskList = [];
    }
    addButtons(task, taskElement){
        //Delete button
        const del = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        del.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        del.setAttribute("viewBox", "0 0 24 24");
        del.innerHTML = `
          <title>trash-can-outline</title>
          <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
        `;
        del.style.width ='30px';
        del.style.height='auto';
        del.addEventListener('click', () => {
            task.remove()
            const index = this.taskList.indexOf(taskElement);
            if(index !== -1) {
                this.taskList.splice(index, 1);
            }
            //Refresh task page
            this.displayTasks();
        });
        
        return del;
    }
    addTask(taskObj){
        this.taskList.push(taskObj);
    }
    displayTasks(){
        const newProj = document.querySelector('.tasks');
        this.taskList.forEach( item => {
            let aTask = item.display()
            let buttons = this.addButtons(aTask, item);
            aTask.insertBefore(buttons, aTask.firstChild);
            newProj.appendChild(aTask);
        });
    }
}

export default Project
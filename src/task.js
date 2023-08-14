class Task{
    constructor(nm, prio, date, disc){
        this.name = nm;
        this.priority = prio;
        this.date = date;
        this.description = disc;
    }
    display(){
        const task= document.createElement('div');

        const taskName = document.createElement('h2');
        taskName.textContent = this.name;
        task.appendChild(taskName);

        const taskPriority = document.createElement('h3');
        taskPriority.textContent = this.priority;
        task.appendChild(taskPriority);

        const taskDate = document.createElement('h3');
        taskDate.textContent = this.date;
        task.appendChild(taskDate);

        const taskDescription = document.createElement('p');
        taskDescription.textContent = this.description;
        task.appendChild(taskDescription);

        task.classList.add('task');

        return task;
    }
}

export default Task;
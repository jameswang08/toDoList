class Task{
    constructor(nm, prio, date, disc){
        this.name = nm;
        this.priority = prio;
        this.date = date;
        this.description = disc;
        this.edit = false;
    }
    isEditing(){
        if(this.edit) return true;
        return false;
    }
    toggleEdit(){
        this.edit = !this.edit;
    }
    update(nm, prio, date, disc){
        this.name = nm;
        this.priority = prio;
        this.date = date;
        this.description = disc;
    }
    display(){
        const task= document.createElement('div');

        const edit = document.createElement('ion-icon');
        edit.setAttribute('name', 'pencil');

        const taskName = document.createElement('h2');
        taskName.textContent = this.name;
        task.appendChild(taskName);

        const taskPriority = document.createElement('h3');
        taskPriority.textContent = `Priority: ${this.priority}`;
        task.appendChild(taskPriority);

        const taskDate = document.createElement('h3');
        taskDate.textContent = `Date: ${this.date}`;
        task.appendChild(taskDate);

        const taskDescription = document.createElement('p');
        taskDescription.textContent = `Description ${this.description}`;
        task.appendChild(taskDescription);

        task.classList.add('task');

        return task;
    }
}

export default Task;
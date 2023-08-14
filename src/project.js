class Project{
    constructor(projName){
        this.name=projName;
        this.taskList = [];
    }
    editSubmit(item, event, index){
        event.preventDefault();

        const taskName = document.getElementById('name').value;
        const priority = document.getElementById('priority').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        console.log(this.taskList[index]);
        this.taskList[index].update(taskName, priority, date, description);

        item.toggleEdit();
    }
    createEditForm(taskElement, task, index){
        // Create form element
        let form = document.createElement("form");
        form.className = "edit";

        // Helper function to create and append form elements
        function createFormElement(tag, attributes) {
            let element = document.createElement(tag);
            for (let key in attributes) {
                if (key === "textContent") {
                    element.textContent = attributes[key];
                } else {
                    element.setAttribute(key, attributes[key]);
                }
            }
            return element;
        }        

        // Labels and input values based on task object
        let labelsAndInputs = [
            { label: "Task Name:", input: "name", type: "text", required: true },
            { label: "Priority:", input: "priority", type: "select", options: ["Low", "Medium", "High"] },
            { label: "Date:", input: "date", type: "datetime-local" },
            { label: "Description:", input: "description", type: "textarea", required: true }
        ];

        // Loop through labels and inputs array and create form elements
        labelsAndInputs.forEach(function(item) {
            let label = createFormElement("label", { for: item.input, textContent: item.label });
            form.appendChild(label);

            let input;
            if (item.type === "select") {
                input = createFormElement("select", { name: item.input, id: item.input });
                item.options.forEach(function(option) {
                    let optionElement = createFormElement("option", { value: option.toLowerCase(), textContent: option });
                    if (taskElement[item.input] === option) {
                        optionElement.selected = true;
                    }
                    input.appendChild(optionElement);
                });
            } else if (item.type === "textarea") {
                input = createFormElement("textarea", { id: item.input, name: item.input, required: item.required });
                input.textContent = taskElement[item.input];
            } else {
                input = createFormElement("input", {
                    type: item.type,
                    id: item.input,
                    name: item.input,
                    value: taskElement[item.input],
                });
            }
            form.appendChild(input);
        });

        // Create and append input for Submit button
        let submitInput = createFormElement("input", { type: "submit", value: "Submit", id: "submit" });

        form.appendChild(submitInput);

        form.addEventListener('submit', (event) => {
            this.editSubmit(taskElement, event, index);
            //Clear form
            while(task.firstChild) task.removeChild(task.firstChild);

            this.displayTasks();
        });

        // Append the form to the document body
        task.appendChild(form);
    }
    addButtons(task, taskElement){
        const cont = document.createElement('div');

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

        //Edit button
        const edit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        edit.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        edit.setAttribute("viewBox", "0 0 24 24");
        edit.innerHTML = `
        <title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />`;
        edit.style.width ='30px';
        edit.style.height='auto';
        edit.addEventListener('click', () => {
            //Clear current task contents
            while(task.firstChild) task.removeChild(task.firstChild);

            //Replace with form
            const index = this.taskList.indexOf(taskElement);
            this.createEditForm(taskElement, task, index);
        });


        cont.appendChild(del);
        cont.appendChild(edit);
        return cont;
    }
    addTask(taskObj){
        this.taskList.push(taskObj);
    }
    displayTasks(){
        const newProj = document.querySelector('.tasks');

        const taskElements = newProj.querySelectorAll('.task');
        taskElements.forEach(taskElement => {
            newProj.removeChild(taskElement);
        });

        this.taskList.forEach( item => {
            let aTask = item.display()
            let buttons = this.addButtons(aTask, item);
            aTask.insertBefore(buttons, aTask.firstChild);
            newProj.insertBefore(aTask, newProj.firstChild);
        });
    }
}

export default Project
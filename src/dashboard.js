class Dashboard{
    constructor(aProject){
        this.projList = [aProject];
        this.projInView = aProject;
        aProject.displayTasks();
        window.localStorage.setItem(`${aProject.name}`, JSON.stringify(aProject));
    }
    getCurrentProjectInView(){
        return this.projInView;
    }
    addProject(obj){
        this.projList.push(obj);
        window.localStorage.setItem(`${obj.name}`, JSON.stringify(obj));
    }
    displayProjects(){
        //Clear current projects
        const cont = document.querySelector('.projects');
        while(cont.firstChild) cont.removeChild(cont.firstChild);

        const projectContainer = document.querySelector('.projects');
        this.projList.forEach((item) => {
            const newProj = document.createElement('li');
            newProj.innerText = item.name;

            newProj.addEventListener('click', () => {
                this.projInView = item;
                item.displayTasks();
            });

            projectContainer.appendChild(newProj);
        });


    }
}

export default Dashboard;
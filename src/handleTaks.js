export default class HandleTasks {
    constructor() {
        this.tasks = [] // Array to store tasks
        this.projects = [] // Array to store the projects
    }

    // Add or remove a task to the tasks array
    addTask(task) {
        this.tasks.push(task)
    }

    removeTask(task) {
        this.tasks.filter((t) => t !== task)
    }

    getTaskList() {
        return this.tasks;
    }

    addProject(project) {
        this.tasks.push(project)
    }

    removeProjects(project) {
        this.projects.filter((p) => p !== project)
    }

    getProjectsList() {
        return this.projects;
    }
    
    filterByProject(project) {
        return this.tasks.filter((t) => t.project === project)
    }

    filterByDate(day) {
        const date = day.getDate;
        const month = day.getMonth;
        const year = day.getFullYear;

        return this.tasks.filter((t) => 
            t.getDate.getDate == date &&
            t.getDate.getMonth == month &&
            t.getDate.getFullYear == year
        )
    }

    sortByDate() {
        this.tasks.sort((a, b) => a.getDate - b.getDate);
    }

    sortByPriority() {
        this.tasks.sort((a, b) => a.getPriority - b.getPriority);
    }

    sortByProject() {
        this.tasks.sort((a, b) => a.getProject - b.getProject);
    }

    sortByComplete() {
        this.tasks.sort((a, b) => a.getIsComplete - b.getIsComplete);
    }

    // Get a task by its index
    getTask(index) {
        return this.tasks[index];
    }

    // Get a project by its index
    getProject(index) {
        return this.projects[index];
    }
}
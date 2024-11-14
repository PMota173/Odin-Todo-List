import Task from './task.js';

export default class HandleTasks {
    constructor() {
        this.tasks = [] // Array to store tasks
        this.projects = [] // Array to store the projects
        this.taskCount = 0 // Number of tasks
        this.projectCount = 0 // Number of projects
    }

    // Add or remove a task to the tasks array
    addTask(task) {
        this.tasks.push(task)
        this.taskCount++
    }

    removeTask(task) {
        this.tasks.filter((t) => t !== task)
        this.taskCount--
    }

    addProjectToTask(project, task) {
        task.setProject(project);
    }


    getTaskList() {
        return this.tasks;
    }

    addProject(project) {
        this.projects.push(project)
        this.projectCount++
    }

    removeProjects(project) {
        this.projects.filter((p) => p !== project)
        this.projectCount--
    }

    getProjectsList() {
        return this.projects;
    }
    
    filterByProject(project) {
        return this.tasks.filter((t) => t.project === project)
    }

    filterByDate(day) {
        return this.tasks.filter((t) => 
            t.getTaskDate().getDate() === day.getDate()
            && t.getTaskDate().getMonth() === day.getMonth()
            && t.getTaskDate().getFullYear() === day.getFullYear()
        )   
    }

    // Sort the tasks by date, priority, project, or completion status
    sortByDate() {
        this.tasks.sort((a, b) => a.getTaskDate() - b.getTaskDate());
    }

    sortByPriority() {
        this.tasks.sort((a, b) => b.getPriority() - a.getPriority() );
    }

    sortByComplete() {
        this.tasks.sort((a, b) => b.getIsComplete() - a.getIsComplete());
    }

    // Get a task by its index
    getTask(index) {
        return this.tasks[index];
    }

    // Get a project by its index
    getProject(index) {
        return this.projects[index];
    }

    // Get the number of tasks that are complete
    getCompleteTaskCount() {
        return this.tasks.filter((t) => t.getIsComplete).length;
    }

    // Get the number of tasks that are incomplete
    getIncompleteTaskCount() {
        return this.tasks.filter((t) => !t.getIsComplete).length;
    }

}
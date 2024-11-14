export default class Task {
    // Task class constructor
    constructor(name, isComplete, description, priority, date) {
        this.name = name;
        this.isComplete = isComplete;
        this.description = description;
        this.priority = priority;
        this.date = date;
        this.project = null;
    }


    // Getters and Setters
    setProject(project) {
        this.project = project;
    }

    getProject() {
        return this.project;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getIsComplete() {
        return this.isComplete;
    }

    setIsComplete(isComplete) {
        this.isComplete = isComplete;
    }

    flipIsComplete() {
        this.isComplete = !this.isComplete;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getPriority() {
        return this.priority;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    getDate() {
        return this.date;
    }

    setDate(date) {
        this.date = date;
    }

}

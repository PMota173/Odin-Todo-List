import HandleTasks from "./handleTaks";
import Task from "./task";

const handleTasks = new HandleTasks();

// Data Format: new Date('ano', 'mes', 'dia')

const task1 = new Task("Task 1", false, "Description 1", 1, new Date(2021, 0, 5));
const task2 = new Task("Task 2", false, "Description 2", 2, new Date(2021, 0, 2));
const task3 = new Task("Task 3", false, "Description 3", 2, new Date(2021, 0, 1));
const task4 = new Task("Task 4", false, "Description 4", 3, new Date(2021, 0, 4));

handleTasks.addTask(task1);
handleTasks.addTask(task2);
handleTasks.addTask(task3);
handleTasks.addTask(task4);

handleTasks.addProject("Project 1");
handleTasks.addProject("Project 2");

handleTasks.addProjectToTask("Project 1", task1);
handleTasks.addProjectToTask("Project 1", task4);

handleTasks.addProjectToTask("Project 2", task2);
handleTasks.addProjectToTask("Project 2", task3);


task4.flipIsComplete();
task2.flipIsComplete();

handleTasks.sortByDate();
console.log(handleTasks.getTaskList());


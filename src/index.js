import "./styles.css";
import HandleTasks from "./handleTasks";
import Task from "./task";
import HandleUI from "./handleUI";
import FilterTasks from "./filterTasks";

const handleTasks = new HandleTasks();

// (name, isComplete, description, priority, date) 
// new Date(year, month, day, hours, minutes, seconds, milliseconds)
const task1 = new Task("Task 1", false, "Task 1 description", 1, new Date(2024, 10, 18));
const task2 = new Task("Task 2", false, "Task 2 description", 2, new Date(2023, 10, 18));
const task3 = new Task("Task 3", false, "Task 3 description", 3, new Date(2024, 10, 24));

// task with no date
const task4 = new Task("Task 4", false, "Task 4 description", 4, null);
const task5 = new Task("Task 5", false, "Task 5 description", 5, null);


handleTasks.addTask(task1); 
handleTasks.addTask(task2);
handleTasks.addTask(task3);
handleTasks.addTask(task4);
handleTasks.addTask(task5);


handleTasks.addProject("Project 1");

handleTasks.addProjectToTask("Project 1", task1);
const handleUI = new HandleUI(handleTasks);

handleUI.selectDaysFilterUI(handleUI.getOptions())
handleUI.createProject()
handleUI.updateFilterSelected()


// filter tasks FilterTasks(handleTasks, filter, project, date)
// filter = 0: all tasks
// filter = 1: tasks for a specific project
// filter = 2: tasks for today
// filter = 3: tasks for this week
// filter = 4: tasks for a specific date





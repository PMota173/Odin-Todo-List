import "./styles.css";
import HandleTasks from "./handleTasks";
import Task from "./task";
import HandleUI from "./handleUI";
import FilterTasks from "./filterTasks";

document.querySelector('.task-creation-form').addEventListener('submit', function(event) {
    event.preventDefault();
});

const handleTasks = new HandleTasks();

const handleUI = new HandleUI(handleTasks);
handleUI.createTask()



// filter tasks FilterTasks(handleTasks, filter, project, date)
// filter = 0: all tasks
// filter = 1: tasks for a specific project
// filter = 2: tasks for today
// filter = 3: tasks for this week
// filter = 4: tasks for a specific date





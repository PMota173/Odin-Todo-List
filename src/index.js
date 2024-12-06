import "./styles.css";
import HandleTasks from "./handleTasks";
import HandleUI from "./handleUI";

document.querySelector('.task-creation-form').addEventListener('submit', function(event) {
    event.preventDefault();
});

const handleTasks = new HandleTasks();

const handleUI = new HandleUI(handleTasks);
handleUI.createTask()

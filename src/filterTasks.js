import HandleTasks from "./handleTasks";
export default function filterTasks(taskList, filter, project) {
    const handleTasks = new HandleTasks();
    switch (filter) {
        case 0:
            // Return all tasks
            console.log(taskList);
            return taskList;
        case 1:
            // Return tasks for a specific project
            console.log(handleTasks.filterByProject(taskList, project));
            return handleTasks.filterByProject(taskList, project);
        case 2:
            // Return tasks for today
            console.log(handleTasks.filterByDate(taskList, new Date()));
            return handleTasks.filterByDate(taskList, new Date());
        case 3:
            // Return tasks for this week
            console.log(handleTasks.filterForThisWeek(taskList));
            return handleTasks.filterForThisWeek(taskList);
        case 4:
            // Return tasks for a specific date
            console.log(handleTasks.filterOverdue(taskList));
            return handleTasks.filterOverdue(taskList);
        default:
            return taskList;
    }
    
}
import HandleTasks from "./handleTasks";
export default function filterTasks(taskList, filter, project) {
    const handleTasks = new HandleTasks();
    switch (filter) {
        case 0:
            // Return all tasks
            return taskList;
        case 1:
            // Return tasks for a specific project

            return handleTasks.filterByProject(taskList, project);
        case 2:
            // Return tasks for today
            return handleTasks.filterByDate(taskList, new Date());
        case 3:
            // Return tasks for this week
            return handleTasks.filterForThisWeek(taskList);
        case 4:
            // Return tasks for a specific date
            return handleTasks.filterOverdue(taskList);
        default:
            return taskList;
    }
    
}
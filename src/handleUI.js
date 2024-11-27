import filterTasks from "./filterTasks";
import Task from "./task";

// Constants
const PRIORITY_COLORS = {
    '1': 'priority-green',
    '2': 'priority-yellow',
    '3': 'priority-red',
};

const FILTER_TYPES = {
    ALL: 0,
    TODAY: 2,
    WEEK: 3,
    OVERDUE: 4,
};

// Helper Functions
function createElement(tag, classes = [], attributes = {}) {
    const element = document.createElement(tag);
    classes.forEach(cls => element.classList.add(cls));
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    return element;
}

// Main Function
export default function HandleUI(handleTasks) {
    let taskList = handleTasks.getTaskList();
    let listOfOptions = getOptions();
    let inputOpen = false;
    let taskQuantity = taskList.length;
    let taskSelectedInfo;
    let filterSelected = document.querySelector('.selected');

    // Cache selectors for better performance
    const tasksContainer = document.querySelector('.task-list');
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const openModalBtn = document.querySelector('.btn-open');
    const closeModalBtn = document.querySelector('.btn-close');
    const saveButton = document.querySelector('.add-task-btn');
    const selectProject = document.querySelector('.select-project');
    const selectProjectInfo = document.querySelector('.select-project-info');
    const projectLabel = document.querySelector('.project-label');
    const createButton = document.querySelector('.create-project');
    const projectList = document.querySelector('.project-list');
    const infoDiv = document.querySelector('.info');
    const body = document.querySelector('body');
    const taskInfoTitle = document.querySelector('#task-info-title');
    const taskInfoDescription = document.querySelector('#task-info-description');
    const taskInfoDate = document.querySelector('#task-info-due-date');
    const priorityColor = document.querySelector('#priority-color');
    const deleteTaskInfo = document.querySelector('.delete-task-btn');
    const saveTaskInfo = document.querySelector('.save-task-btn');
    const cancelTaskInfo = document.querySelector('.cancel-task-btn');

    // Task Information Event Listeners
    saveTaskInfo.addEventListener('click', () => {
        const taskTitle = taskInfoTitle.value;
        if (taskTitle.trim() === '') {
            taskInfoTitle.classList.add('error');
            setTimeout(() => {
                taskInfoTitle.classList.remove('error');
            }, 2000);
            return;
        };

        const taskDescription = taskInfoDescription.value;
        const taskDueDate = taskInfoDate.value;
        const taskPriority = document.querySelector('input[name="task-priority-info"]:checked');
        const taskProjectValue = selectProjectInfo.options[selectProjectInfo.selectedIndex]?.value;

        const taskDueDateValue = taskDueDate ? new Date(
            taskDueDate.slice(0, 4), 
            taskDueDate.slice(5, 7) - 1, 
            taskDueDate.slice(8, 10)
        ) : null;

        let taskPriorityValue;
        switch (taskPriority.id) {
            case 'task-priority-green-info':
                taskPriorityValue = '1'
                break
            case 'task-priority-yellow-info':
                taskPriorityValue = '2'
                break
            case 'task-priority-red-info':
                taskPriorityValue = '3'
                break
        }

        taskSelectedInfo.setName(taskTitle);
        taskSelectedInfo.setDescription(taskDescription);
        taskSelectedInfo.setPriority(taskPriorityValue);
        taskSelectedInfo.setTaskDate(taskDueDateValue);
         
        if (taskProjectValue !== '0') {
            handleTasks.addProjectToTask(taskProjectValue, taskSelectedInfo);
        }
        else {
            handleTasks.removeProjectFromTask(taskSelectedInfo);
        }

        
        handleTasks.getTaskList().forEach(task => createTaskUI(task));
        updateLists();
    
        updateFilterSelected();

        toggleTaskInformation();
    });

    deleteTaskInfo.addEventListener('click', () => {

        handleTasks.removeTask(taskSelectedInfo);
        tasksContainer.innerHTML = '';

        handleTasks.getTaskList().forEach(task => createTaskUI(task));
        updateLists();
    
        updateFilterSelected();

        toggleTaskInformation();
        
        taskSelectedInfo = null;
    });

    cancelTaskInfo.addEventListener('click', () => {
        toggleTaskInformation();
        taskSelectedInfo = null;
    });


    // Task UI Creation
    function createTaskUI(task) {
        const taskDiv = createElement('div', ['task']);
        tasksContainer.appendChild(taskDiv);

        const checkbox = createElement('input', ['checkbox'], { type: 'checkbox' });
        taskDiv.appendChild(checkbox);

        // Ensure that the task is marked as complete if it is
        if (task.getIsComplete()) {
            taskDiv.classList.add('checked-task');
            checkbox.checked = true;
        }
        else {
            taskDiv.classList.remove('checked-task');
            checkbox.checked = false;
        }

        checkbox.addEventListener('click', () => {
            task.flipIsComplete();
            taskDiv.classList.toggle('checked-task', task.getIsComplete());
        });

        const taskTitle = createElement('div', ['task-title']);
        taskTitle.textContent = task.getName();
        taskDiv.appendChild(taskTitle);

        const date = createElement('div', ['date']);
        date.textContent = task.getTaskDate() 
            ? `${task.getTaskDate().getMonth() + 1}-${task.getTaskDate().getDate()}-${task.getTaskDate().getFullYear()}` 
            : 'No date';
        taskDiv.appendChild(date);

        const priority = createElement('div', ['priority'], { value: task.getPriority() });
        priority.style.width = '20px';
        priority.style.height = '20px';
        priority.style.borderRadius = '50%';
        priority.classList.add(PRIORITY_COLORS[task.getPriority()]);
        taskDiv.appendChild(priority);

        const details = createElement('div', ['details-button']);
        details.textContent = '>';
        taskDiv.appendChild(details);

        details.addEventListener('click', () => {
            taskSelectedInfo = task;
            loadTaskInformation(taskSelectedInfo);
        });
    }

    // Task Creation
    function createTask() {
        saveButton.addEventListener('click', () => {
            const taskTitle = document.querySelector('#task-title');
            if (taskTitle.value.trim() === '') {
                taskTitle.classList.add('error');
                setTimeout(() => {
                    taskTitle.classList.remove('error');
                }, 2000);
                return;
            };

            const taskDescription = document.querySelector('#task-description').value;
            const taskDueDate = document.querySelector('#task-due-date').value;
            const taskPriority = document.querySelector('input[name="task-priority"]:checked');
            const taskProjectValue = selectProject.options[selectProject.selectedIndex]?.value;

            const taskDueDateValue = taskDueDate ? new Date(
                taskDueDate.slice(0, 4), 
                taskDueDate.slice(5, 7) - 1, 
                taskDueDate.slice(8, 10)
            ) : null;

            let taskPriorityValue;
            switch (taskPriority.id) {
                case 'task-priority-green':
                    taskPriorityValue = '1'
                    break
                case 'task-priority-yellow':
                    taskPriorityValue = '2'
                    break
                case 'task-priority-red':
                    taskPriorityValue = '3'
                    break
            }

            const task = new Task(taskTitle.value, false, taskDescription, taskPriorityValue, taskDueDateValue);
            handleTasks.addTask(task);

            console.log(handleTasks.getTaskList());

            if (taskProjectValue !== '0') {
                handleTasks.addProjectToTask(taskProjectValue, task);
            }

            createTaskUI(task);

            // Reset inputs
            taskTitle.value = '';
            document.querySelector('#task-description').value = '';
            document.querySelector('#task-due-date').value = '';
            selectProject.selectedIndex = 0;

            modal.classList.add("hidden");
            overlay.classList.add("hidden");

            const filterSelected = document.querySelector('.selected');
            loadSelectedFilter(filterSelected.textContent);
            updateFilterSelected();
        });
    }

    // Modal Management
    function openCreateTaskModal() {
        const openModal = () => {
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
            const hasProjects = selectProject.childElementCount > 0;
            selectProject.classList.toggle('hidden', !hasProjects);
            projectLabel.classList.toggle('hidden', !hasProjects);
        };

        const closeModal = () => {
            modal.classList.add("hidden");
            overlay.classList.add("hidden");
        };

        openModalBtn.addEventListener("click", openModal);
        closeModalBtn.addEventListener("click", closeModal);
        overlay.addEventListener("click", closeModal);
    }

    // Project Creation
    function createProject() {
        createButton.addEventListener('click', () => {
            if (inputOpen) return;
            inputOpen = true;

            const projectInput = createElement('input', ['project-input'], {
                type: 'text',
                placeholder: 'Project name',
                maxlength: '20'
            });

            const buttonsDiv = createElement('div', ['buttons-div']);
            const projectInputButton = createElement('button', ['project-input-button']);
            projectInputButton.textContent = 'Create';

            const cancelButton = createElement('button', ['project-input-button']);
            cancelButton.textContent = 'Cancel';

            buttonsDiv.append(projectInputButton, cancelButton);

            const projectContainer = createElement('div', ['create-project-container']);
            projectContainer.append(projectInput, buttonsDiv);

            createButton.parentElement.appendChild(projectContainer);

            // Create project
            const handleProjectInput = (event) => {
                if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
                    if (projectInput.value.trim()) {
                        const projectElement = createElement('li', ['project', 'option-task', 'anima-below'], {
                            'data-project': projectInput.value
                        });
                        projectElement.textContent = projectInput.value;
                        projectList.appendChild(projectElement);

                        addProjectToOptions(projectInput.value);
                        handleTasks.addProject(projectInput.value);

                        projectContainer.remove();
                        inputOpen = false;
                        selectDaysFilterUI();
                    }
                }
            };

            projectInputButton.addEventListener('click', handleProjectInput);
            projectInput.addEventListener('keydown', handleProjectInput);

            cancelButton.addEventListener('click', () => {
                projectContainer.remove();
                inputOpen = false;
            });

            projectInput.focus();
        });
    }
    
    function loadFilteredTasks(filteredTasks) {
        tasksContainer.innerHTML = '';
        filteredTasks.forEach(task => createTaskUI(task));
    }
    
    // Task Information
    function loadTaskInformation(task) {
        toggleTaskInformation();

        const taskInfoGreen = document.querySelector('#task-priority-green-info');
        const taskInfoYellow = document.querySelector('#task-priority-yellow-info');
        const taskInfoRed = document.querySelector('#task-priority-red-info');

        taskInfoTitle.value = task.getName();
        taskInfoDescription.value = task.getDescription();

        if (task.getTaskDate() !== null) {
            taskInfoDate.value = task.getTaskDate().toISOString().split('T')[0]
        }
        else {
            taskInfoDate.value = '';
        }
        

        const project = task.getProject();
        if (project) {
            const projectIndex = [...selectProjectInfo.options].findIndex(op => op.value === project);
            selectProjectInfo.selectedIndex = projectIndex;
        }
        else {
            selectProjectInfo.selectedIndex = 0;
        }

        const priority =  task.getPriority();
        priorityColor.classList.remove('priority-yellow', 'priority-red', 'priority-green');
        switch (priority) {
            case '1':
                taskInfoGreen.checked = true;
                taskInfoYellow.checked = false;
                taskInfoRed.checked = false;
                priorityColor.classList.add('priority-green');
                break;
            case '2':
                taskInfoGreen.checked = false;
                taskInfoYellow.checked = true;
                taskInfoRed.checked = false;
                priorityColor.classList.add('priority-yellow');
                break;
            case '3':
                taskInfoGreen.checked = false;
                taskInfoYellow.checked = false;
                taskInfoRed.checked = true;
                priorityColor.classList.add('priority-red');
                break;
            default:
                taskInfoGreen.checked = true;
                taskInfoYellow.checked = false;
                taskInfoRed.checked = false;
                priorityColor.classList.add('priority-green');
        }
    }
    
    // Show / Hide task information
    function toggleTaskInformation() {
        if (infoDiv.classList.contains('hidden')) {
            infoDiv.classList.remove('hidden');
            body.style.gridTemplateColumns = '300px 1fr 400px';
        } else {
            infoDiv.classList.add('hidden');
            body.style.gridTemplateColumns = '300px 1fr 0px';
        }
    }

    // Updates the task quantity and the selected filter
    function updateFilterSelected() {
        filterSelected = document.querySelector('.selected')
        loadSelectedFilter(filterSelected.textContent);

        const selectedFilter = document.querySelector('.filter-loaded');
        const quantity = document.querySelector('.tasks-quantity');
        const selectedOption = [...listOfOptions].find(op => op.classList.contains('selected'));

        if (selectedOption) {
            selectedFilter.textContent = selectedOption.textContent;
            quantity.textContent = taskQuantity;
        }
    }

    function loadSelectedFilter(filterText) {
        let filteredTasks;
        switch (filterText.toLowerCase()) {
            case 'all':
                filteredTasks = filterTasks(taskList, FILTER_TYPES.ALL);
                break;
            case 'today':
                filteredTasks = filterTasks(taskList, FILTER_TYPES.TODAY);
                break;
            case 'this week':
                filteredTasks = filterTasks(taskList, FILTER_TYPES.WEEK);
                break;
            case 'overdue':
                filteredTasks = filterTasks(taskList, FILTER_TYPES.OVERDUE);
                break;
            default:
                filteredTasks = filterTasks(taskList, 1, filterText);
                break;
        }
        loadFilteredTasks(filteredTasks);
        taskQuantity = filteredTasks.length;
    }

    function selectDaysFilterUI() {
        updateLists();
        listOfOptions.forEach(op => {
            op.addEventListener('click', () => {
                if (op.classList.contains('selected')) return;
                removeSelected(listOfOptions);
                op.classList.add('selected');
                loadSelectedFilter(op.textContent);
                updateFilterSelected();
            });
        });
    }

    function removeSelected(list) {
        list.forEach(op => op.classList.remove('selected'));
    }

    function updateLists() {
        taskList = handleTasks.getTaskList();
        listOfOptions = getOptions();
    }

    function getOptions() {
        return document.querySelectorAll('.option-task') || [];
    }

    function addProjectToOptions(project) {
        const option = createElement('option', [], { value: project });
        option.textContent = project;
        selectProject.appendChild(option);
        selectProjectInfo.appendChild(option.cloneNode(true));
    }

    // Initialize functionality
    openCreateTaskModal();
    createTask();
    createProject();
    selectDaysFilterUI(listOfOptions);
    updateFilterSelected();

    return {
        selectDaysFilterUI,
        createProject,
        getOptions,
        updateLists,
        updateFilterSelected,
        createTask,
        toggleTaskInformation,
    };
}

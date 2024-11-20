import filterTasks from "./filterTasks";

export default function HandleUI(handleTasks) {
    let taskList = handleTasks.getTaskList();
    let projectList = handleTasks.getProjectsList();
    let listOfOptions = getOptions();
    let inputOpen = false;
    let taskQuantity = taskList.length;

    function createTask(task) {
        /* 
        <div class="task">
            <input type="checkbox">
            
            <div class="task-title">go to the gym</div>
            <div class="data">
                <div class="date">2020-07-01</div>
            </div>
            <div class="details"> > </div></div>
        </div>
        */


    }

    (function openCreateTaskModal() {
        const modal = document.querySelector(".modal");
        const overlay = document.querySelector(".overlay");
        const openModalBtn = document.querySelector(".btn-open");
        const closeModalBtn = document.querySelector(".btn-close");
        const selectProject = document.querySelector('.select-project')
        const projectLabel = document.querySelector('.project-label')


        const openModal = function () {
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
            if (selectProject.childElementCount === 0) {
                selectProject.classList.add('hidden')
                projectLabel.classList.add('hidden')
            }
            else {
                selectProject.classList.remove('hidden')
                projectLabel.classList.remove('hidden')
            }
        };

        const closeModal = function () {
            modal.classList.add("hidden");
            overlay.classList.add("hidden");
        };



        openModalBtn.addEventListener("click", openModal);          
        closeModalBtn.addEventListener("click", closeModal);
        overlay.addEventListener("click", closeModal);
    })()

    function addProjectToOptions (project) {
        const select = document.querySelector('.select-project')
            const option = document.createElement('option')
            option.textContent = project
            option.value = project
            select.appendChild(option)
    }
    

    function createProject() {
        const createButton = document.querySelector('.create-project')

        // creates a input field to create a project
        createButton.addEventListener('click', () => {
            if (inputOpen) {
                return
            }
            inputOpen = true

            const projectInput = document.createElement('input')
            
            projectInput.setAttribute('type', 'text')
            projectInput.setAttribute('placeholder', 'Project name')
            projectInput.setAttribute('maxlength', '20')
            projectInput.classList.add('project-input')
        
            createButton.parentElement.appendChild(projectInput)
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('create-project-container');
            createButton.parentElement.appendChild(projectContainer);
            projectContainer.appendChild(projectInput);

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('buttons-div');
            projectContainer.appendChild(buttonsDiv);
            
            const projectInputButton = document.createElement('button')
            projectInputButton.textContent = 'Create'
            projectInputButton.classList.add('project-input-button')
            buttonsDiv.appendChild(projectInputButton)

            const cancelButton = document.createElement('button')
            cancelButton.textContent = 'Cancel'
            cancelButton.classList.add('project-input-button')
            buttonsDiv.appendChild(cancelButton)

            cancelButton.addEventListener('click', () => {
                projectInput.remove()
                projectInputButton.remove()
                cancelButton.remove()
                buttonsDiv.remove()
                projectContainer.remove()
                inputOpen = false
            })

            // creates a project and adds it to the project list
            function handleProjectInput(event) {
                if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
                    const project = projectInput.value;
                    if (project) {
                        const projectList = document.querySelector('.project-list');
                        const projectElement = document.createElement('li');
                        
                        projectElement.textContent = project;
                        projectElement.classList.add('project');
                        projectElement.classList.add('option-task');
                        projectElement.classList.add('anima-below');
                        projectElement.dataset.project = project;
                        projectList.appendChild(projectElement);
            
                        // removes the input field and buttons
                        projectInput.remove();
                        projectInputButton.remove();
                        cancelButton.remove();
                        buttonsDiv.remove();
                        projectContainer.remove();
                        inputOpen = false

                        addProjectToOptions(project)
                        handleTasks.addProject(project)

                        selectDaysFilterUI(listOfOptions)
                    }
                }
            }
            
            projectInputButton.addEventListener('click', handleProjectInput);
            projectInput.addEventListener('keydown', handleProjectInput);
            
            projectInput.addEventListener('keydown', (event) => {
                if (event.key === "Escape") {
                    projectInput.remove();
                    projectInputButton.remove();
                    cancelButton.remove();
                    buttonsDiv.remove();
                    projectContainer.remove();
                    inputOpen = false
                }
            })
            cancelButton.addEventListener('click', () => {
                projectInput.remove();
                projectInputButton.remove();
                cancelButton.remove();
                buttonsDiv.remove();
                projectContainer.remove();
                inputOpen = false
            })
            projectInput.focus()
        })
    }

    function updateLists() {
        taskList = handleTasks.getTaskList();
        projectList = handleTasks.getProjectsList();
        listOfOptions = getOptions()
    }

    function getOptions() {
        return document.querySelectorAll('.option-task')
    }

    function removeSelected(listOfOptions) {
        listOfOptions.forEach((op) => {
            op.classList.remove('selected')
        })
    }

    function selectDaysFilterUI() {
        updateLists()
        listOfOptions.forEach((op) => {        
            op.addEventListener('click', () => {
                if (op.classList.contains('selected')) {
                    return
                }
                else {
                    removeSelected(listOfOptions)
                    op.classList.add('selected')
                    loadSelectedFilter(op.textContent, taskList)
                    updateFilterSelected()
                }
            })
        })
    }

    function updateFilterSelected() {
        const selectedFilter = document.querySelector('.filter-loaded')
        const quantity = document.querySelector('.tasks-quantity')
        listOfOptions.forEach((op) => {
            if (op.classList.contains('selected')) {
                selectedFilter.textContent = op.textContent
            }
            quantity.textContent = taskQuantity
        })
    }

    function loadSelectedFilter(filterText, taskList) {
        
        switch (filterText.toLowerCase()) {
            case 'all':
                filterTasks(taskList, 0, null)
                taskQuantity = taskList.length
                break
            case 'today':
                filterTasks(taskList, 2, null)
                taskQuantity = filterTasks(taskList, 2, null).length
                break
            case 'this week':
                filterTasks(taskList, 3, null)
                taskQuantity = filterTasks(taskList, 3, null).length
                break
            case 'overdue':
                filterTasks(taskList, 4, null)
                taskQuantity = filterTasks(taskList, 4, null).length
                break
            default:
                filterTasks(taskList, 1, filterText)
                taskQuantity = filterTasks(taskList, 1, filterText).length
                break 
        }
    }


    return {
        selectDaysFilterUI,
        createProject,
        getOptions,
        updateLists,
        updateFilterSelected
    }
}

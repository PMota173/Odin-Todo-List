import HandleTasks from "./handleTaks"
import Task from "./task"

export default function HandleUI() {

    function getElement(selector) {
        return document.querySelector(selector);
    }

    function getElements(selector) {
        return document.querySelectorAll(selector);
    }

    function addClass(selector, className) {
        const element = getElement(selector);
        if (element) element.classList.add(className);
    }

    function removeClass(selector, className) {
        const element = getElement(selector);
        if (element) element.classList.remove(className);
    }

    function toggleClass(selector, className) {
        const element = getElement(selector);
        if (element) element.classList.toggle(className);
    }

    function setText(selector, text) {
        const element = getElement(selector);
        if (element) element.textContent = text;
    }

    function setAttribute(selector, attribute, value) {
        const element = getElement(selector);
        if (element) element.setAttribute(attribute, value);
    }

    function createElement(tag, attributes = {}, parentSelector) {
        const element = document.createElement(tag);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        if (parentSelector) {
            const parent = this.getElement(parentSelector);
            if (parent) parent.appendChild(element);
        }
        return element;
    }

    function removeElement(selector) {
        const element = this.getElement(selector);
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
    
    function clearElement(selector) {
        const element = this.getElement(selector);
        if (element) element.innerHTML = "";
    }

    (function filterTasks() {
        const taskFilter = getElements('.option-task')        
        taskFilter.forEach((op) => {
            op.addEventListener('click', () => {
                if (op.classList.contains('selected')) {
                    return
                }
                else {
                    taskFilter.forEach((op) => {
                        op.classList.remove('selected')
                    })
                    op.classList.add('selected')
                }
            })
        })
    })()

    return {
    }
}

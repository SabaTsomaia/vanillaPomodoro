import { updateNavigationBar } from './common.js';

updateNavigationBar();

const form = document.getElementById('addTaskForm')
const taskTitle = document.getElementById('taskTitle')
const taskCategory = document.getElementById('taskCategory')
const taskPriority = document.querySelectorAll('.priority-label')


let tasks = JSON.parse(localStorage.getItem('focusTasks')) || [];
let states = ['ALL', 'ACTIVE', 'COMPLETED']

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    
    if(toggleError() !== null)
    {
        submitForm(Object.fromEntries(formData));
    }    
})


function toggleError() {
    // remove previous every possible previous error.
    document.querySelectorAll('#task-title-error').forEach((e) => e.remove())

    const html = `<p id="task-title-error">Title is Required. (Minimum 3 characters, Maximum 50).</p>`

    if (taskTitle.value.length < 3) {
        taskTitle.insertAdjacentHTML('afterend',html)
        return null
    } else if (taskTitle.value.length > 50)
    {
        taskTitle.insertAdjacentHTML('afterend',html)
        return null
    }

    return true
}

// blur event is when user clicks outside input.
// if that happens, check for errors (call togleError func).

taskTitle.addEventListener('blur',(e) => {
    toggleError()
})

function submitForm(data){
    console.log('FORMDATA ', data)
}

function addNewTask(title,category,priority) {
    
}

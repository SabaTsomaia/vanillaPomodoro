import { updateNavigationBar } from './common.js';

updateNavigationBar();

const form = document.getElementById('addTaskForm')
const taskTitle = document.getElementById('taskTitle')
const taskCategory = document.getElementById('taskCategory')
const taskPriority = document.querySelectorAll('.priority-label')

const boardContent = document.querySelector('.board-content')
const taskBoard = document.querySelector('.task-board')


// let tasks = JSON.parse(localStorage.getItem('focusTasks')) || [];
let states = ['ALL', 'ACTIVE', 'COMPLETED']

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    
    if(toggleError() !== null)
    {
        submitForm(Object.fromEntries(formData));
        addNewTask(Object.fromEntries(formData))
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

function addNewTask({taskTitle: title, taskCategory: category,taskPriority: priority}) {
    const taskHtml = `
                        <div class="task-focus">
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                      
                        <div class="task-text">
                            <p id="task-title">${title}</p>

                            <div class="category-priority-container">
                                <p id="category">${category}</p>
                                <p id="priority">${priority} PRIORITY</p>
                            </div>
                        </div>

                        <button class="trash-icon">
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                             <polyline points="3 6 5 6 21 6"></polyline>
                             <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                             <line x1="10" y1="11" x2="10" y2="17"></line>
                             <line x1="14" y1="11" x2="14" y2="17"></line>
                             </svg>
                        </button>

                    </div>
    `

    boardContent.insertAdjacentHTML('afterbegin',taskHtml)
    
    const taskDelete = document.querySelectorAll('.trash-icon')

    console.log(taskDelete)
    /*
    taskDelete.addEventListener('click', () => {
        console.log('saba')
    })

    */
}

// adding an event listener to the whole boardcontent.
boardContent.addEventListener('click', (e) => {
    // catch trash icon using closest() element function 
    const trashBtn = e.target.closest('.trash-icon');

    // catch closest task parent element and call deleteTask.  
    if (trashBtn) {
        const taskEl = trashBtn.closest('.task-focus');
        deleteTask(taskEl);
    }
})

function deleteTask(pressedTask) {
    // call remove() function on a whole task parent element
    pressedTask.remove()
}
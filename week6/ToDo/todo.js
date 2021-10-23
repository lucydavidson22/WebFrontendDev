const checkedChecker = document.querySelector('input[Type="checkbox"]');
const taskForm = document.querySelector(`[newTodoForm]`)
const taskInput = document.querySelector(`[todoElements]`)

let tasks = [];

//listens for a submit in the html document for the newTodoForm and then takes the value of what was input in the todoElements tag
taskForm.addEventListener('submit', e => {
    e.preventDefault()
    let task = taskInput.value.trim();
    if(task !== '') {       //checks for input, if the user has actually given something, it can continue and  
       addTask(task);       //add the task to the todo list
       taskInput.value = '';  //clears the add task bar and 
       taskInput.focus();   //refocuses the page on the bar again
    } 
})

// delete the item when the user clicks the X, otherwise, the item is struckthrough and marked completed
document.getElementById('todo-list').addEventListener('click', e => {   
  const itemKey = e.target.parentElement.dataset.key;
  if (e.target.classList.contains('isChecked')) {                       
        doneStaysDone(itemKey);                                         
    }
    if (e.target.classList.contains('delete')) {                         
        deleteTask(itemKey);
        counter();
      }    
});

// displays all the tasks on the list, complete or not and retrieves items from the localStorage
document.getElementById('All').addEventListener('click',  (e) => {
    document.getElementById('todo-list').innerHTML = ''
    const key = localStorage.getItem('tasksKey');
    if (key) {
      tasks = JSON.parse(key);
      tasks.forEach(task => {
        showTasks(task, true);
        counter();
      });
    }
})

/*displays only the tasks that have not be completed, so 
  it removes the tasks that have not been checked */
  document.getElementById('Active').addEventListener('click',  (e) => {
    document.getElementById('todo-list').innerHTML = ''
    const key = localStorage.getItem('tasksKey');
    if (key) {
      tasks = JSON.parse(key);
      tasks.filter(item => !item.checked).forEach(task => {
        showTasks(task, true);
        counter();
      });
    }
})

// displays only the tasks that have been marked as completed
document.getElementById('Completed').addEventListener('click',  (e) => {
    document.getElementById('todo-list').innerHTML = ''
    const key = localStorage.getItem('tasksKey');
    if (key) {
      tasks = JSON.parse(key);
      tasks.filter(item=>item.checked).forEach(task => {
        showTasks(task, true);
        counter();
      });
    }
})

/****************************************Event Listener for the Local Storage*******************************************/

//keeps the tasks loaded so that a page refresh doesn't delete everything that's added
document.addEventListener('DOMContentLoaded', () => {     //when the content is loaded it pulls the previously existing tasks 
  const key = localStorage.getItem('tasksKey');
  if (key) {
    //reads a values in the array from local storage and parses it as a JSON
    tasks = JSON.parse(key);
    tasks.forEach(task => {
      showTasks(task);
      counter();
    });
  }
});

/****************************************All of the functions*******************************************/
/* creates a todo object */
const addTask = (text) => {
    const todoTask = {
        text,
        checked: false,
        id: Date.now(),
    }
    tasks.push(todoTask);
    showTasks(todoTask);

};

const showTasks = (todoTask, preventMutableStorage)=> {
  //stops data in the localstorage from being changed  
  if (!preventMutableStorage) {
        localStorage.setItem('tasksKey', JSON.stringify(tasks));
    }
    const item = document.querySelector(`[data-key='${todoTask.id}']`);
    if (todoTask.deleted) {
        item.remove();
        return
      }
    const isChecked = todoTask.checked ? 'done': '';
    const node = document.createElement('li')
    //assigns an added item to the list a class and assigns it to id=todo-item
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todoTask.id);
    //add the html code for displaying each item with the newly assigned class, type, is, and checked status
    node.innerHTML = `
    <input class="isChecked" id="${todoTask.id}" type="checkbox" ${isChecked ? "checked" : ""}/>
    <span>${todoTask.text}</span>
    <span class="delete">X</span>`;
    //adds new items onto the bottom of the list of tasks
    document.getElementById('todo-list').append(node);
    if (item) {
        node.replaceWith(item)
    } else {
        document.getElementById('todo-list').append(node);
    }
    counter();

}

//displays the completed tasks from the local storage, so past user's that left completed items on the list 
// don't lose what they have completed
const showCompletedTasks = () => {
    const key = localStorage.getItem('tasksKey');
    if (key) {
      tasks = JSON.parse(key);
      tasks.filter(item => item.check).forEach(task => {
        showTasks(task, true);
        counter();
      });
    }
}

//keeps the checked off items checked when the page changes or a button is clicked
const doneStaysDone = (key) => {    
  const index = tasks.findIndex(task=> task.id === Number(key));
  tasks[index].checked = !tasks[index].checked;
  showTasks(tasks[index]);
  showCompletedTasks()
}

//function to delete a task from the list whne the X is selected
const deleteTask = (key) => {
  const index = tasks.findIndex(item => item.id === Number(key));
  const todoTask = {
      ...tasks[index],    //spreads the array into each element so they can be set to "deleted"
      deleted: true  
    };
    tasks = tasks.filter(item => item.id !== Number(key));
  showTasks(todoTask);
  
}

// to display how many items are left to be completed
const counter = () => {
  const itemsCounter =  tasks.filter(task=> !task.checked)
  const count = document.getElementById('tasksLeft');
  // has to check if there is more than one item in order to display plural items or not
  const counterString = itemsCounter.length === 1 ? 'task' : 'tasks';
  count.innerText = `${itemsCounter.length} ${counterString} left to do`
}
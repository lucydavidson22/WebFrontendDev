const switcher = document.querySelector(' input[Type="checkbox"]');
const taskForm = document.querySelector(`[newTodoForm]`)
const taskInput = document.querySelector(`[todoElements]`)

const allTasksButton = document.getElementById('All')
const activeTasksButton = document.getElementById('Active')
const completedTasksButton = document.getElementById('Completed')

let tasks = [];

taskForm.addEventListener('submit', e => {
    e.preventDefault()
    let task = taskInput.value.trim();
    if(task !== '') {
       addTask(task);
       taskInput.value = '';
       taskInput.focus();   //focuses the reloaded page on the input form
    } 
})

// delete the item when the user clicks the X, otherwise, the item is struckthrough and marked completed
document.getElementById('todo-list').addEventListener('click', e => {
  const itemKey = e.target.parentElement.dataset.key;
  if (e.target.classList.contains('isChecked')) {
        doneStaysDone(itemKey); 
    }
    if (e.target.classList.contains('delete')) {
        deleteTodo(itemKey);
        counter();
      }    
});

// displays all the tasks on the list, complete or not
allTasksButton.addEventListener('click',  (e) => {
    document.getElementById('todo-list').innerHTML = ''
    const key = localStorage.getItem('tasksKey');
    if (key) {
      tasks = JSON.parse(key);
      tasks.forEach(task => {
        renderTodo(task, true);
        counter();
      });
    }
})

/*displays only the tasks that have not be completed, so 
  it removes the tasks that have not been checked */
activeTasksButton.addEventListener('click',  (e) => {
    document.getElementById('todo-list').innerHTML = ''
    const key = localStorage.getItem('tasksKey');
    if (key) {
      tasks = JSON.parse(key);
      tasks.filter(item => !item.checked).forEach(task => {
        renderTodo(task, true);
        counter();
      });
    }
})

// displays only the tasks that have been marked as completed
completedTasksButton.addEventListener('click',  (e) => {
    document.getElementById('todo-list').innerHTML = ''
    const key = localStorage.getItem('tasksKey');
    if (key) {
      tasks = JSON.parse(key);
      tasks.filter(item=>item.checked).forEach(task => {
        renderTodo(task, true);
        counter();
      });
    }
})

//this is the loacalStorage helper function that I decided to use
//it keeps the tasks loaded so that a page refresh doesn't delete everything that's added
document.addEventListener('DOMContentLoaded', () => {
  const key = localStorage.getItem('tasksKey');
  if (key) {
    //reads a value from local storage and parses it as a JSON
    tasks = JSON.parse(key);
    tasks.forEach(task => {
      renderTodo(task);
      counter();
    });
  }
});

/* creates a todo object */
const addTask = (text) => {
    const todoTask = {
        text,
        checked: false,
        id: Date.now(),
    }
    tasks.push(todoTask);
    renderTodo(todoTask);

};

const renderTodo = (todoTask, preventMutableStorage)=> {
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
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todoTask.id);
    node.innerHTML = `
    <input class="isChecked" id="${todoTask.id}" type="checkbox" ${isChecked ? "checked" : ""}/>
    <span>${todoTask.text}</span>
    <span class="delete">X</span>`;
    document.getElementById('todo-list').append(node);

    if (item) {
        node.replaceWith(item)
    } else {
        document.getElementById('todo-list').append(node)
    }
    counter();

}

//keeps the checked off items checked when the page changes or a button is clicked
const doneStaysDone = (key) => {    
  const index = tasks.findIndex(task=> task.id === Number(key));
  tasks[index].checked = !tasks[index].checked;
  renderTodo(tasks[index]);
  renderCompletedTodos()
}

const deleteTodo = (key) => {
  const index = tasks.findIndex(item => item.id === Number(key));
  const todoTask = {
      ...tasks[index],
      deleted: true  
    };
    tasks = tasks.filter(item => item.id !== Number(key));
  renderTodo(todoTask);

}

const renderCompletedTodos = () => {
    const key = localStorage.getItem('tasksKey');
    if (key) {
      tasks = JSON.parse(key);
      tasks.filter(item => item.check).forEach(task => {
        renderTodo(task, true);
        counter();
      });
    }
}

// to display how many items are left to be completed
const counter = () => {
    const itemsCounter =  tasks.filter(task=> !task.checked)
    const count = document.getElementById('tasksLeft');
    // has to check if there is more than one item in order to display plural items or not
    const counterString = itemsCounter.length === 1 ? 'task' : 'tasks';
    count.innerText = `${itemsCounter.length} ${counterString} left to do`
}
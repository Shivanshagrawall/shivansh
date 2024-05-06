const inputBox = document.querySelector('#inputBox');
const addBtn = document.querySelector('#addBtn');
const todoLists = document.querySelector('#todoLists');

let editTodo = null;

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("Please Enter the todo Lists");
        return false;
    }
    if (addBtn.value === "Edit") {
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    } else {

        //Creating p tags
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = inputText;
        li.appendChild(p);

        //Creating Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = "Edit";
        editBtn.classList.add('btn', 'editBtn');
        li.appendChild(editBtn);

        //creating remove button
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = "Remove"
        removeBtn.classList.add('btn', 'removeBtn')
        li.appendChild(removeBtn);
        todoLists.appendChild(li);
        inputBox.value = "";

        savelocalStorage(inputText);
    }
}

const updateTodo = (event) => {
    if (event.target.innerHTML == "Remove") {
        todoLists.removeChild(event.target.parentElement);
        deleteLocalStorage(event.target.parentElement);
    }
    if (event.target.innerHTML == "Edit") {
        inputBox.value = event.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = event;
    }
}
function savelocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getLocalTodos() {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach(todo => {
            //Creating p tags
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.innerHTML = todo;
            li.appendChild(p);

            //Creating Edit Button
            const editBtn = document.createElement('button');
            editBtn.innerHTML = "Edit";
            editBtn.classList.add('btn', 'editBtn');
            li.appendChild(editBtn);

            //creating remove button
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = "Remove"
            removeBtn.classList.add('btn', 'removeBtn')
            li.appendChild(removeBtn);
            todoLists.appendChild(li);
        });
    }

}
function deleteLocalStorage(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText=todo.children[0].innerHTML;
    let Todoindex=todos.indexOf(todoText);
    todos.splice(Todoindex,1);
    localStorage.setItem('todos',JSON.stringify(todos));
}
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoLists.addEventListener('click', updateTodo);
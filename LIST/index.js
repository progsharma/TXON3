const form = document.getElementById("addtodoform");
const todoAdd = document.getElementById("addtodo");
const todoList = document.getElementById("todolist");
const rightSideAdd = document.getElementById("right-side-add");
const rightSideSearch = document.getElementById("right-side-search");
const todoSearch = document.getElementById("searchtodo")

listTodos();

function listTodos() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllToDosToUI);
    todoList.addEventListener("click",deleteToDo);
    todoSearch.addEventListener("keyup",searchTodo);
}

function searchTodo(e) {
    const searchvalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".to-do-list-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();

        if(text.indexOf(searchvalue) === -1) {
            listItem.setAttribute("style", "display : none");
        }
        else {
            listItem.setAttribute("style", "display : flex");
        }
    })
}

function loadAllToDosToUI() {
    let todos = gettodoFromStorage();

    todos.forEach(function(todo){
        addtodoToUI(todo);
    });
}

function deleteToDo(e) {

    if(e.target.className === "fas fa-trash") {
        e.target.parentElement.parentElement.remove();
        deleteToDoFromStorage(e.target.parentElement.parentElement.textContent)
    }
}

function deleteToDoFromStorage(deletetodo) {

    let todos = gettodoFromStorage();

    todos.forEach(function (todo, index) {
        if(todo === deletetodo) {
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    const newTodo = todoAdd.value.trim();

    addtodoToUI(newTodo);
    addtodoToStorage(newTodo);
    e.preventDefault();
}
 
function addtodoToUI(newTodo) {

    const newListItem = document.createElement("li");
    const newLinkItem = document.createElement("a");
    newListItem.className = "to-do-list-item";
    newLinkItem.href = "#";
    newLinkItem.className = "to-do-list-item-icon";
    newLinkItem.innerHTML = `<i class ='fas fa-trash'></i>`;

    newListItem.appendChild(document.createTextNode(newTodo));
    newListItem.appendChild(newLinkItem);

    todoList.appendChild(newListItem);
    todoAdd.value = "";
    /*
    <li class="to-do-list-item">
        todoTest 
        <a href="#" class="to-do-list-item-icon"><i class="fas fa-trash"></i></a>
    </li>
    */	
}

function gettodoFromStorage(newTodo) {
    
    let todos;

    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addtodoToStorage(newTodo) {
    
    let todos = gettodoFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
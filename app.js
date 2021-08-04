//Selector
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);
document.addEventListener("DOMContentLoaded",getTodos);

//Functions

function addTodo(event){
    event.preventDefault();

    //TodoDiv
    const TodoDiv = document.createElement("div");
    TodoDiv.classList.add("todo");
    //Create List Item
    const NewTodo = document.createElement("li");
    NewTodo.innerText = todoInput.value;
    NewTodo.classList.add('todo-item');
    TodoDiv.appendChild(NewTodo)
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    TodoDiv.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    TodoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(TodoDiv);
    //Clear todoInput value
    todoInput.value="";
}

function deleteCheck(e)
{
    //console.log(e.target);
    const item = e.target;
    //Delete
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.toggle("fall");
        removeLocalTodos(todo); 
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    } 
    if(item.classList[0] === 'completed-btn')
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e)
{
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                }else{
                        todo.style.display = "none";
                }
                break;
                
        }
    });
}

function saveLocalTodos(todo){
    //CHECK -- CZY COS JEST W LISCIE
    let todos; //zmienna
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos()
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);

    localStorage.setItem("todos",JSON.stringify(todos));
}
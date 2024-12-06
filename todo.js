class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(newTodo) {
    this.todos.push(new Todo(newTodo));
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }
}

class Todo {
  constructor(title) {
    this.title = title;
    this.isCompleted = false;
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }
}

const todoslist = new TodoList();

const addTodo = document.querySelector("#addTodo");
const tasks = document.querySelector("#tasks");

addTodo.addEventListener("click", () => {
  const todoInput = document.querySelector("#todoInput");
  if (todoInput.value === "") {
    alert("Vazifa kiritilmadi!");
    return;
  }

  todoslist.addTodo(todoInput.value);

  renderTodos();
  todoInput.value = "";
  console.log(todoslist);
});

const renderTodos = () => {
  tasks.innerHTML = "";
  todoslist.todos.forEach((todo, index) => {
    tasks.innerHTML += `
      <div class="d-flex border justify-content-between p-3">
        <div class="title d-flex">
          <div class="form-check mt-1">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault-${index}"
              ${todo.isCompleted ? "checked" : ""}
              onclick="toggleTodo(${index})"
            />
          </div>
          <h4 class="ms-3 ${todo.isCompleted ? "text-decoration-line-through text-opacity-25" : ""}">
            ${todo.title}
          </h4>
        </div>
        <div>
          <div class="action">
            <button class="btn btn-danger" onclick="deleteTodo(${index})">Delete</button>
            <button class="btn btn-warning" onclick="editTodo(${index})">Edit</button>
          </div>
        </div>
      </div>
    `;
  });
};

const deleteTodo = (index) => {
  todoslist.removeTodo(index);
  renderTodos();
};

const editTodo = (index) => {
  const newTask = prompt("Vazifani o'zgartirish", todoslist.todos[index].title);
  if (newTask !== "" && newTask.trim() !== "") {
    todoslist.todos[index].title = newTask;
    renderTodos();
  }
};

const toggleTodo = (index) => {
  todoslist.todos[index].toggleCompleted();
  renderTodos();
};

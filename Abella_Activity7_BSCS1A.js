const taskInput = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn");
const taskBox = document.querySelector(".task-box");

let editId;
let isEditTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

console.log(todos);

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo();
  });
});

function showTodo() {
  let liTag = "";

  if (todos.length > 0) {
    todos.forEach((todo, id) => {
      let completed = todo.status === "completed" ? "checked" : "";
      let liTag_New = "";

      switch (todo.name.toLowerCase()) {
        case "textarea":
          liTag_New = `<li class="task">
                        <label for="${id}">
                            <p class="${completed}">${todo.name}:</p><br>
                            <textarea name="${todo.name.trim()}" id="${id}" placeholder="Enter ${todo.name}"></textarea>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id}, '${todo.name}')">Edit</li>
                                <li onclick="deleteTask(${id}, '${todo.status}')">Delete</li>
                            </ul>
                        </div>
                    </li>`;
          break;
        case "radio":
          liTag_New = `<li class="task">
                        <label for="${id}">
                            <p class="${completed}">${todo.name}: </p><br>
                            <input type="radio" id="option1${id}" name="${todo.name.trim()}" value="option1">
                            <span class="radio-checkmark"></span>
                            Option1
                            <input type="radio" id="option2${id}" name="${todo.name.trim()}" value="option2">
                            <span class="radio-checkmark"></span>
                            Option2
                            <input type="radio" id="option3${id}" name="${todo.name.trim()}" value="option3">
                            <span class="radio-checkmark"></span>
                            Option3
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id}, '${todo.name}')">Edit</li>
                                <li onclick="deleteTask(${id}, '${todo.status}')">Delete</li>
                            </ul>
                        </div>
                    </li>`;
          break;
        case "select":
          liTag_New = `<li class="task">
                        <label for="${id}">
                            <p class="${completed}">${todo.name}:</p><br>
                            <select id="${id}" name="${todo.name.trim()}">
                                <option value="s1">1st Selection</option>
                                <option value="s2">2nd Selection</option>
                                <option value="s3">3rd Selection</option>
                            </select>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id}, '${todo.name}')">Edit</li>
                                <li onclick="deleteTask(${id}, '${todo.status}')">Delete</li>
                            </ul>
                        </div>
                    </li>`;
          break;
        default:
          liTag_New = `<li class="task">
                        <label for="${id}">
                            <p class="${completed}">${todo.name}:</p><br>
                            <input type="text" id="${id}" placeholder="Enter ${todo.name}">
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id}, '${todo.name}')">Edit</li>
                                <li onclick="deleteTask(${id}, '${todo.status}')">Delete</li>
                            </ul>
                        </div>
                    </li>`;
          break;
      }

      liTag += liTag_New;
    });
  }

  taskBox.innerHTML = liTag || `<span>No current form elements.</span>`;

  let checkTask = taskBox.querySelectorAll(".task");
  clearAll.classList.toggle("active", checkTask.length > 0);
  taskBox.classList.toggle("overflow", taskBox.offsetHeight >= 300);
}

showTodo();

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.toggle("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "I" || e.target !== selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos = [];
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key === "Enter" && userTask) {
    if (!isEditTask) {
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }

    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});

const taskInput = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn");
const taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list")) || [];

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

  if (todos && Array.isArray(todos)) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      let inputTag = "";

      if (todo && todo.category) {
        switch (todo.category.toLowerCase()) {
          case "gender":
            inputTag = `<input type="radio" name="${id}" id="male${id}" value="Male">Male
                      <input type="radio" name="${id}" id="female${id}" value="Female">Female`;
            break;

          case "civil status":
            inputTag = `<select name="${id}" id="${id}">
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>`;
            break;

          case "address":
            inputTag = `<textarea name="${id}" id="${id}" placeholder="Enter ${todo.category}"></textarea>`;
            break;

          default:
            inputTag = `<input type="text" name="${id}" id="${id}" placeholder="Enter ${todo.category}">`;
        }

        let liTag_New = `<li class="task">
                        <label for="${id}">
                            <p class="${completed}">${todo.category}</p><br>
                            ${inputTag}
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick='editTask(${id}, "${todo.category}")'>Edit</li> 
                                <li onclick='deleteTask(${id})'>Delete</li>
                            </ul>
                        </div>
                      </li>`;
        liTag += liTag_New;
      }
    });
  }

  taskBox.innerHTML = liTag || '<span>No current form elements.</span>';
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
  taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}

showTodo();

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.toggle("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function editTask(taskId, category) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = category;
  taskInput.focus();
  taskInput.classList.add("active");
}

function deleteTask(deleteId) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { category: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].category = userTask;
    }

    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});

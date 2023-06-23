const taskInput = document.querySelector("-task-input input"),
filters = document.querySelectorAll("filters span"),
clearAll = document.querySelector("clear-btn"),
taskBox = document.querySelector(".task-box");

let editId,
isEditTask = false,
todos = JS0N.parse(localStorage.getItem("todo-list"));
console.log(todos);

filters.forEach(btn => {
     btn.addEventListener("click", () =>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo (btn. id);

    });
});

function showTodo(filter) {
  let liTag = "";
  let liTag_New = "";

if(todos) {
     todos.forEach((todo, id) => {
          let completed = todo.status == "completed" ? "checked" : ""; 
                switch (todo.name, toLowerCase()){
                     case "textarea":
                        liTag_New = `   <li class="task">
                                           <label for= "$(id)">
                                              <p class = "${completed}"> ${todo.name}": </p><br>
                                              <textarea name="${todo.name.trim()}" id="${id}" placeholder="Enter ${todo.name}"></textarea>
                                           </label>
                                           <div class="settings">
                                              <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                              <ul class= "task-menu">
                                                   <li onclick='editTask(${id}, "${todo.name}")'>Edit</li>
                                                   <li onclick='delateTask(${id}, "${filter}")'>Delete</li>
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
                                       <Option3
                                   </label>
                                   <div class="settings">
                                       <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                       <ul class="task-menu">
                                           <li onclick 'editTask(${id}, "${todo.name}")'>Edit</li> 
                                           <li onclick='deleteTask(${id}, "${filter}")'>Delete</li>
                                       </ul>
                                   </div>
                                 </li>`;

                    break;
                case "select":
                    liTag_New = `<li class="task">
                                   <label for="${id}">
                                        <p class="${completed}">${todo.name}:</p><br>
                                        <select id="${id}" name="${todo.name.trim()}">
                                              <option value-"s1">1st Selection</option> 
                                              <option value="s2">2nd Selection</option>
                                              <option value-"s3">3rd Selection</option>
                                        </select>
                                   </label>
                                   <div class="settings">
                                       <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                       <ul class="task-menu">
                                            <1i onclick='editTask(${id}, "${todo.name}")'>Edit</li> 
                                            <li onclick='deleteTask(${id}, "${filter}")'>Delete</li>
                                       </ul>
                                   </div>
                                 </li>`;
            break;

           default:
                liTag_New= `<li class="task">
                <label for="${id}"
                     <p class="${completed} ${todo.name}:</p><br> 
                     <input type""text" id="${id}" placeholder="Enter ${todo.name}">
                </label>
                <div class="settings">
                     <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i> 
                     <ul class" task-menu">
                          <li onclick='editTask(${id}, "${todo.name}")'>Edit</li>
                          <li onclick='deleteTask(${id}, "${filter}")'>Delete</1i>
                     </ul>
                </div>
             </li> `;
break;

            } 
            liTag += liTag_New;

    });

}
taskBox.innerHTML = liTag || `<span>No current form elements.</span>`;
let checkTask = taskBox.querySelectorAll(".task");
!checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active"); 
taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");

}
showTodo("all");

function showMenu(selectedTask) {
let menuDiv= selectedTask.parentElement. lastElementChild; 
menuDiv.classList.add("show");
document.addEventListener("click", e => { 
    if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");

         }
    });

}

 function editTask(taskId, textName) {

      editId = taskId;
      isEditTask = true;
      taskInput.value textName;
      taskInput.focus();
      taskInput.classList.add("active");

 }
function deleteTask(deleteId, filter) {
      isEditTask = false;
      todos.splice(deleteId, 1); 
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo (filter);
}

clearAll.addEventListener("click", () => {
      isEditTask= false;
      todos.splice(0, todos.length); 
      localStorage.setItem("todo-list", JSON.stringify(todos)); 
      showTodo()
});

taskInput.addEventListener("keyup", e => { 
     let userTask = taskInput.value.trim();
     if(e.key == "Enter" && userTask) { 
          if(!isEditTask) {
          todos = !todos ? [] : todos; 
          let taskInfo = {name: userTask, status: "pending"};
          todos.push(taskInfo); 
     } else {
          isEditTask = false;
          todos[editId].name = userTask;
     }

     taskInput.value = ""; 
     localStorage.setItem("todo-list", JSON.stringify(todos)); 
     showTodo(document.querySelector("span.active").id);
    }

});
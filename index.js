let userTaskInput = document.querySelector(".text-input input");
let todolist = document.querySelector(".todo-list");
let todos = JSON.parse(localStorage.getItem("todos-list"));
let clear = document.querySelector(".clear-btn");
clear.addEventListener('click', ()=>{
  todos.splice(0, todos.length);
  localStorage.setItem("todos-list", JSON.stringify(todos));
  showtodos("all");
})
function deleteTask(deleteId, status) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todos-list", JSON.stringify(todos));
  showtodos(status);
}

let editTaskId;
let isEditStatus = false;
function edit(id, oldTask) {
  userTaskInput.value = oldTask;
  editTaskId = id;
  isEditStatus = true;
}

let items = document.querySelectorAll(".category > span");
items.forEach((span) => {
  span.addEventListener("click", () => {
    document.querySelector("span.activespan").classList.remove("activespan");
    span.classList.add("activespan");
    showtodos(span.id);
  });
});

function showtodos(filterStatus) {
  li = "";
  if (todos) {
    todos.forEach((tasks, id) => {
      let completeStatus = tasks.status == "complete" ? "active" : "";
      let completeCheck = tasks.status == "complete" ? "checked" : "";
      if (filterStatus == tasks.status || filterStatus == "all") {
        li += `<li class="todo-item">
            <label for="${id}">
                <div class="inputp">
                    <input type="checkbox" id="${id}" onclick="statusUpdate(this)" ${completeCheck}>
                    <p class="todo-text ${completeStatus}">${tasks.tasks}</p>
                </div>
            </label>
                <div class="icons">
                    <i class="fas fa-edit edit" onclick="edit(${id}, '${tasks.tasks}')"></i>
                    <i class="fas fa-trash delete" onclick="deleteTask(${id}, '${tasks.status}')"></i>
                </div>
        </li>`;
      }
    });
  }
  todolist.innerHTML = li || "<p class='no-task'>No task to show here.</p>";
}
showtodos("all");

function statusUpdate(item) {
  let text = item.parentElement.lastElementChild;
  if (item.checked) {
    text.classList.add("active");
    todos[item.id].status = "complete";
  } else {
    text.classList.remove("active");
    todos[item.id].status = "pending";
  }
  localStorage.setItem("todos-list", JSON.stringify(todos));
}

userTaskInput.addEventListener("keyup", (e) => {
  let userInput = userTaskInput.value.trim();
  if (e.key === "Enter" && userInput) {
    if (isEditStatus) {
      todos[editTaskId].tasks = userInput;
      editTaskId;
      isEditStatus = false;
    } else {
      if (!todos) {
        todos = [];
      }
      let userTask = { tasks: userInput, status: "pending" };
      todos.push(userTask);
    }

    userTaskInput.value = "";
    localStorage.setItem("todos-list", JSON.stringify(todos));
    showtodos('all');
  }
});
// document.querySelector(".clear-btn").onclick = function () {
//   localStorage.clear();
// };

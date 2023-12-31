let form = document.querySelector("form"),
  todoList = document.getElementById("task__list"),
  todoField = document.getElementById("todo_field"),
  submitBtn = document.getElementById("submit_btn");
(markAudio = new Audio("mp3-mark.mp3")),
  (deleteAudio = new Audio("trash.mp3")),
  (todos = []);

form.addEventListener("submit", handleFormSubmission);


function handleFormSubmission(e) {
  e.preventDefault();
  validateForm();
}

function validateForm() {
  if (todoField.value === "") {
    alert("Make sure to add a task!!!");
  } else {
    clearField();
  }
}

function clearField() {
  acceptAndStoreDate();
  todoField.value = "";
}

function acceptAndStoreDate() {
  let todo = todoField.value;
  let newTodo = { title: todo, id: crypto.randomUUID(), status: "pending" };
  console.log(todos);

  todos.push(newTodo);
  addNewTodo();
  localStorage.setItem("todoList", JSON.stringify(todos));
  console.log(localStorage.setItem("todoList", JSON.stringify(todos)));
}

function addNewTodo() {
  console.log(window);
  console.log(typeof todos);

  if (!todos.length) {
    let feedBackElement = document.createElement("h3");
    feedBackElement.style.fontSize = "2.3rem";
    feedBackElement.style.color = "green";
    feedBackElement.textContent = "Make sure to add new task!!!";
    todoList.appendChild(feedBackElement);
  } else {
    todoList.innerHTML = "";
    todos.map((todo) => {
      return (todoList.innerHTML += `
      <li class="task__list--item standard-todo" id=${todo.id}>
                  <p class="task__description">${todo.title}</p>
                  <div class="task__actions">
                    <button class="check__btn" id="check__btn" onclick='markAsDone(this)' >
                    <i class="fa-solid fa-check check-icon"></i>
                    </button>
                    <button class="delete__btn" id="delete__btn" onclick='deleteTask(this)'>
                    <i class="fa-regular fa-trash-can delete-icon"></i>
                    </button>
                  </div>
                </li>
      `);
    });
  }
}

(function () {
  todos =
    localStorage.getItem("todoList") === null
      ? []
      : JSON.parse(localStorage.getItem("todoList"));
  addNewTodo();
})();

function deleteTask(e) {
  deleteAudio.play();
  let targetId = e.parentElement.parentElement.id;
  let newList = todos.filter((todo) => todo.id !== targetId);
  todos = newList;
  localStorage.setItem("todoList", JSON.stringify(todos));
  addNewTodo();
}

function markAsDone(e) {
  console.log(e.parentElement.parentElement);
  e.parentElement.parentElement.firstElementChild.classList.add("completed");
  markAudio.play();
}

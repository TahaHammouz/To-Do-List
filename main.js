const counterDisplayElem = document.querySelector(".counter-display");
var listCount = localStorage.getItem("counter");
function updateCounter(count) {
  if (count == null) count = 0;
  counterDisplayElem.textContent = `To-Do : ${count}`;
}

window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  const newTodoForm = document.getElementById("new-todo-form");
  updateCounter(todos.length);

  console.log(todos.length);
  newTodoForm.addEventListener("submit", (e) => {
    if (validateForm() == true) {
      const todo = {
        content: e.target.elements.content.value,
        done: false,
      };

      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos)); //convert the new task to string

      e.target.reset();

      localStorage.setItem("counter", todos.length);
      updateCounter(todos.length);

      renderTodos();

      e.preventDefault();
    }
  });

  renderTodos();
});

function renderTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    //for task check
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    //todo content
    const content = document.createElement("div");
    const actions = document.createElement("div");
    //delete button
    const deleteButton = document.createElement("button");

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    content.classList.add("todo-content");

    actions.classList.add("actions");

    deleteButton.classList.add("delete");

    content.innerHTML = `<input id="innertext" type="text" value="${todo.content}" readonly>`;

    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);

    actions.appendChild(deleteButton);

    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("progress");
      }

      renderTodos();
    });
    content.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      console.log(input.value);
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      document.getElementById("id01").style.display = "block";

      document.getElementById("delete").onclick = function () {
        todos = todos.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem("counter", todos.length);
        updateCounter(todos.length);
        renderTodos();
        document.getElementById("id01").style.display = "none";
      };
    });
  });
}

function Search() {
  var input, filter, value;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();

  var todoitem = document.getElementsByClassName("todo-item");
  var todocontent = document.getElementsByClassName("todo-content"); //inside it has the value

  for (var i = 0; i < todocontent.length; i++) {
    var content = todocontent[i].getElementsByTagName("input");
    if (content.item(0).value.toUpperCase().indexOf(filter) > -1) {
      todoitem[i].style.display = "";
    } else {
      todoitem[i].style.display = "none";
    }
  }
}

function validateForm() {
  var x = document.forms["form1"]["content"].value;
  if (x == "" || x == null) {
    alert("Write your Todo");
    return false;
  } else {
    return true;
  }
}

let wage = document.getElementById("userInput");
let mode = "all";


wage.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    addTask();
  }
});
let appState = {};

function getOldSession() {
  if (localStorage.getItem("appState") == null) {
    appState = {
      currentUser: "Anonymous",
      tasks: []
    };
  } else {
    appState = JSON.parse(localStorage.getItem("appState"));
  }
}

function saveCurrentSession() {
  localStorage.setItem("appState", JSON.stringify(appState));
}

function addTask() {
  const prioritySelected = document.getElementById("priorityMenu").value;
  const userInput = document.getElementById("userInput").value;
  if (userInput && prioritySelected) {
    const newTask = {
      note: "",
      priority: prioritySelected,
      dateDone: "",
      username: appState.currentUser,
      isDone: false,
      dateCreated: new Date(),
      body: userInput
    };
    appState.tasks.push(newTask);
    document.getElementById("userInput").value = "";
  }
  thisIsAFunctionThatRenderTodoList(mode);
}

function thisIsAFunctionThatRenderTodoList(mode) {
  let todoListContent = "";
  const toDoListShowCase = document.getElementById("toDoListCollumn");
  if (appState.tasks.length > 0 && mode == "all") {
    appState.tasks.sort((a, b) => b.priority - a.priority);
    appState.tasks.map((todo, i) => {
      if (todo.username === appState.currentUser && todo.isDone == false) {
        todoListContent += `
        <div id="listRenderArea" class="form-check">
            <input class="form-check-input pt-2" type="checkbox" value="" onchange="handleCheck(this);" id="todo-id-${i}">
            <label class="form-check-label" for="todo-id-${i}" id="label-id-${i}" onmouseover="showDeleteBtn(this)" onmouseout="hideDeleteBtn(this)">${todo.body} ${todo.priority == 1 ? '&#x2606;' : todo.priority == 2 ? '&#x2606;&#x2606;' : '&#x2606;&#x2606;&#x2606;'} <button class="btn btn-sm btn-outline-danger btn-delete invisible" onclick='thisFunctionWillDeleteSomethingOnToDoList(${i})'>X</button></label>
        </div>`;
      } else if (
        todo.username === appState.currentUser &&
        todo.isDone == true
      ) {
        todoListContent += `
        <div id="listRenderArea" class="form-check">
            <input class="form-check-input pt-2" type="checkbox" value="" onchange="handleCheck(this);" checked id="todo-id-${i}">
            <label class="form-check-label" for="todo-id-${i}" id="label-id-${i}" onmouseover="showDeleteBtn(this)" onmouseout="hideDeleteBtn(this)"><del>${todo.body}  ${todo.priority == 1 ? '&#x2606;' : todo.priority == 2 ? '&#x2606;&#x2606;' : '&#x2606;&#x2606;&#x2606;'}</del> <button class="btn btn-sm btn-outline-danger btn-delete invisible" onclick='thisFunctionWillDeleteSomethingOnToDoList(${i})'>X</button></label>
        </div>`;
      }
    });
  }
  if (appState.tasks.length > 0 && mode === "done") {
    appState.tasks.map((todo, i) => {
      if (todo.username === appState.currentUser && todo.isDone == true) {
        todoListContent += `
        <div id="listRenderArea" class="form-check">
            <input class="form-check-input pt-2" type="checkbox" value="" onchange="handleCheck(this);" id="todo-id-${i}" checked>
            <label class="form-check-label" for="todo-id-${i}" id="label-id-${i}" onmouseover="showDeleteBtn(this)" onmouseout="hideDeleteBtn(this)"><del>${todo.body}  ${todo.priority == 1 ? '&#x2606;' : todo.priority == 2 ? '&#x2606;&#x2606;' : '&#x2606;&#x2606;&#x2606;'}</del> <button class="btn btn-sm btn-outline-danger btn-delete invisible" onclick='thisFunctionWillDeleteSomethingOnToDoList(${i})'>X</button></label>
        </div>`;
      }
    });
  }
  if (appState.tasks.length > 0 && mode === "undone") {
    appState.tasks.map((todo, i) => {
      if (todo.username === appState.currentUser && todo.isDone == false) {
        todoListContent += `
        <div id="listRenderArea" class="form-check">
            <input class="form-check-input pt-2" type="checkbox" value="" onchange="handleCheck(this);" id="todo-id-${i}">
            <label class="form-check-label" for="todo-id-${i}" id="label-id-${i}" onmouseover="showDeleteBtn(this)" onmouseout="hideDeleteBtn(this)">${todo.body}  ${todo.priority == 1 ? '&#x2606;' : todo.priority == 2 ? '&#x2606;&#x2606;' : '&#x2606;&#x2606;&#x2606;'}<button class="btn btn-sm btn-outline-danger btn-delete invisible" onclick='thisFunctionWillDeleteSomethingOnToDoList(${i})'>X</button></label>
        </div>`;
      }
    });
  }
  updateCurrentStatic();
  saveCurrentSession();
  toDoListShowCase.innerHTML = todoListContent;
}

function handleCheck(checkbox) {
  let index = checkbox.id.split("-")[2];
  changeTaskState(index);
  updateCurrentStatic;
  thisIsAFunctionThatRenderTodoList(mode);
}

function changeTaskState(index) {
  if (appState.tasks[index].isDone === false) {
    appState.tasks[index].isDone = true;
  } else {
    appState.tasks[index].isDone = false;
  }
}

function thisFunctionWillDeleteSomethingOnToDoList(id) {
  appState.tasks.splice(id, 1);
  thisIsAFunctionThatRenderTodoList(mode);
  updateCurrentStatic();
}

function updateCurrentStatic() {
  doneLen = appState.tasks.filter(todo => todo.isDone === true).length;
  undoneLen = appState.tasks.filter(todo => todo.isDone === false).length;
    document.getElementById("currentStatic").innerHTML = ``;
    document.getElementById("showallbadge").innerHTML = `${doneLen + undoneLen}`;
    document.getElementById("showundonebadge").innerHTML = `${undoneLen}`;
    document.getElementById("showdonebadge").innerHTML = `${doneLen}`;
}

function showDeleteBtn(element) {
  element.lastChild.classList.remove("invisible");
}

function hideDeleteBtn(element) {
  element.lastChild.classList.add("invisible");
}

function activeButton(button) {
  const listVariable = ["showundonebutton", "showallbutton", "showdonebutton"];
  listVariable.map(variable => {
    if (variable === button) {
      document.getElementById(variable).classList.add("active");
    } else {
      document.getElementById(variable).classList.remove("active");
    }
  });
}

function handleChangeMode(newmode) {
  mode = newmode;
  thisIsAFunctionThatRenderTodoList(mode);
}

getOldSession();
updateCurrentStatic;
thisIsAFunctionThatRenderTodoList(mode);
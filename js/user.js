const elUlserForm = document.querySelector(".user-form");
const elUser = elUlserForm.querySelector("#userName");
const elGreetings = document.querySelector(".greetings");
const elTodos = document.querySelector(".todos");
const elTodoForm = elTodos.querySelector(".todo-form");
const elTodoInput = elTodoForm.querySelector("#todo-input");
const elTodoList = elTodos.querySelector(".todo-list-item");
const elFinishedList = elTodos.querySelector(".finished-list-item");

const USER = "USER";
const TODO_LIST = "TODO";
const FINISHED_LIST = "FINISHED";
const SHOWING_CN = "showing";

let todoList = [];
let finishedList = [];

function saveToLocal(section, data) {
  localStorage.setItem(section, JSON.stringify(data));
}

function deleteItem(type, targetLi) {
  const targetID = targetLi.id;
  let targetParent, targetList;
  if (type === TODO_LIST) {
    targetParent = elTodoList;
    targetList = todoList;
  } else {
    targetParent = elFinishedList;
    targetList = finishedList;
  }
  targetParent.removeChild(targetLi);
  const cleanList = targetList.filter((item) => {
    return Number(item.id) !== Number(targetID);
  });

  if (type === TODO_LIST) {
    todoList = cleanList;
  } else {
    finishedList = cleanList;
  }
  saveToLocal(type, cleanList);
}

function moveToFinished(event) {
  const elLi = event.target.parentNode;
  const moveItem = todoList.find((item) => Number(item.id) === Number(elLi.id));
  deleteItem(TODO_LIST, elLi);
  addItemToAList(FINISHED_LIST, moveItem.value, moveItem.id);  
}

function moveToTodo(event) {
  const elLi = event.target.parentNode;
  const moveItem = finishedList.find((item) => Number(item.id) === Number(elLi.id));
  deleteItem(FINISHED_LIST, elLi);
  addItemToAList(TODO_LIST, moveItem.value, moveItem.id);  
}

function deleteItemFromTodo(event) {
  const elLi = event.target.parentNode;
  deleteItem(TODO_LIST, elLi);
}

function deleteItemFromFinished(event) {
  const elLi = event.target.parentNode;
  deleteItem(FINISHED_LIST, elLi);
}

function showItem(type, ul, obj) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  delBtn.innerText = "💥";
  if (type === TODO_LIST) {
    delBtn.addEventListener("click", deleteItemFromTodo);
    moveBtn.innerText = "🔜";
    moveBtn.addEventListener("click", moveToFinished);
  } else {
    delBtn.addEventListener("click", deleteItemFromFinished);
    moveBtn.innerText = "🔙";
    moveBtn.addEventListener("click", moveToTodo);
  }
  span.innerText = obj.value;
  li.id = obj.id;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBtn);
  ul.appendChild(li);
}

function addItemToAList(type, value, id = null) {
  let targetElement;
  let targetList;
  if (!id) {
    const now = new Date();
    id = now.getTime();
  }
  if (type === TODO_LIST) {
    targetElement = elTodoList;
    targetList = todoList;
  } else {
    targetElement = elFinishedList;
    targetList = finishedList;
  }
  const item = {id: id, value: value};
  showItem(type, targetElement, item);
  targetList.push(item);
  saveToLocal(type, targetList);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  if (elTodoInput.value) {
    addItemToAList(TODO_LIST, elTodoInput.value);
    elTodoInput.value = "";
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  if (elUser.value) {
    const user = elUser.value;
    elUlserForm.classList.remove(SHOWING_CN);    
    saveToLocal(USER, user);
    showUserInfo(user);
  }
}

function askForUserName() {
  elUlserForm.classList.add(SHOWING_CN);
  elUlserForm.addEventListener("submit", handleLoginSubmit);  
}

function showUserInfo(user) {  
  elGreetings.innerHTML = `Hello! ${user}`;
  elGreetings.classList.add(SHOWING_CN);
  elTodos.classList.add(SHOWING_CN);
  elTodoForm.addEventListener("submit", handleTodoSubmit);
}

function loadUserInfo() {
  const loadedUser = localStorage.getItem(USER);
  if (loadedUser === null) {
    askForUserName();
  } else {
    const user = JSON.parse(loadedUser);
    showUserInfo(user);
    loadListFromLocal(TODO_LIST);
    loadListFromLocal(FINISHED_LIST);
    
  }  
}

function loadListFromLocal(type) {
  let targetElement;
  let targetList;

  if (type === TODO_LIST) {
    targetElement = elTodoList;
    targetList = todoList;
  } else {
    targetElement = elFinishedList;
    targetList = finishedList;
  }
  const loaded = localStorage.getItem(type);
  if (loaded !== null) {
    const parsed = JSON.parse(loaded);
    parsed.forEach((item) => {
      showItem(type, targetElement, item);
      targetList.push(item);
    });
  }
}

function init() {
  loadUserInfo();
}

init();
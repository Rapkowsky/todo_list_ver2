let $todoInput; // miejsce, gdzie użytkownik wpisuje treść
let $alertInfo; // info o braku zadań / konieczności dodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; // nowo dodany LI, nowe zadanie
let $allTasks; // lista wszystkich dodanych LI
let $idNumber = 0; // ID dodawane do każdego nowego zadania
let $popup; //pobrany popup
let $popupInfo; // alert w popupie, jak się doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput; //tekst wpisywany w inputa w popup'ie
let $addPopupBtn; // przycisk "zatwierdź" w popup'ie
let $closeTodoBtn; //przycisk od zamykania popup'a

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	$todoInput = document.querySelector(".todo-input");
	$alertInfo = document.querySelector(".alert-info");
	$addBtn = document.querySelector(".add-btn");
	$ulList = document.querySelector(".todo-list ul");
	$allTasks = document.getElementsByTagName("li");
	$popup = document.querySelector(".popup");
	$popupInfo = document.querySelector(".popup-info");
	$popupInput = document.querySelector(".popup-input");
	$addPopupBtn = document.querySelector(".accept");
	$closeTodoBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	$addBtn.addEventListener("click", addNewTask);
	$todoInput.addEventListener("keyup", enterCheck);
	$ulList.addEventListener("click", checkClick);
	$addPopupBtn.addEventListener("click", changeToDo);
	$closeTodoBtn.addEventListener("click", closePopup);
};

const addNewTask = () => {
	if ($todoInput.value !== "") {
		$idNumber++;
		$newTask = document.createElement("li");
		$newTask.innerText = $todoInput.value;
		$newTask.setAttribute("id", `todo-${$idNumber}`);
		$ulList.appendChild($newTask);
		$todoInput.value = "";
		$alertInfo.innerText = "";
		createToolsArea();
	} else {
		$alertInfo.innerText = "Wpisz treść zadania!";
	}
};

const enterCheck = () => {
	if (event.keyCode === 13) {
		addNewTask();
	}
};

const createToolsArea = () => {
	const toolsPanel = document.createElement("div");
	toolsPanel.classList.add("tools");
	$newTask.appendChild(toolsPanel);

	const completeBtn = document.createElement("button");
	completeBtn.classList.add("complete");
	completeBtn.innerHTML = `<ion-icon name="checkmark-circle"></ion-icon>`;

	const editBtn = document.createElement("button");
	editBtn.classList.add("edit");
	editBtn.innerHTML = `<ion-icon name="create"></ion-icon>`;

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.innerHTML = `<ion-icon name="close-circle"></ion-icon>`;

	toolsPanel.appendChild(completeBtn);
	toolsPanel.appendChild(editBtn);
	toolsPanel.appendChild(deleteBtn);
};

const checkClick = (e) => {
	if (e.target.classList.value !== "") {
		if (e.target.closest("button").classList.contains("complete")) {
			e.target.closest("li").classList.toggle("completed");
			e.target.closest("button").classList.toggle("completed");
		} else if (e.target.closest("button").classList.contains("edit")) {
			e.target.closest("button").classList.toggle("completed");
			editTask(e);
		} else if (e.target.closest("button").classList.contains("delete")) {
			e.target.closest("button").classList.toggle("completed");
			deleteTask(e);
		}
	}
};

const editTask = (e) => {
	const oldToDo = e.target.closest("li").id;
	$editedTodo = document.getElementById(oldToDo);
	$popupInput.value = $editedTodo.firstChild.textContent;

	$popup.style.display = "flex";
};

const changeToDo = () => {
	if ($popupInput.value !== "" && $popupInput.value !== $editedTodo.firstChild.textContent) {
		$editedTodo.firstChild.textContent = $popupInput.value;
		$popupInfo.innerHTML = "";
		$popup.style.display = "none";
	} else if ($popupInput.value === $editedTodo.firstChild.textContent) {
		$popupInfo.innerHTML = "Treść nie może być taka sama";
	} else {
		$popupInfo.innerHTML = "Musisz podać jakąś treść";
	}
};

const deleteTask = (e) => {
	const deleteToDo = e.target.closest("li");
	deleteToDo.remove();
	if ($allTasks.length === 0) {
		$alertInfo.innerText = "Brak zadań na liście.";
	}
};

const closePopup = () => {
	$popup.style.display = "none";
	$popupInfo.innerText = "";
};

document.addEventListener("DOMContentLoaded", main);

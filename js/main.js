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
	} else {
		$alertInfo.innerText = "Wpisz treść zadania!";
	}
};

const enterCheck = () => {
	if (event.keyCode === 13) {
		addNewTask();
	}
};

document.addEventListener("DOMContentLoaded", main);

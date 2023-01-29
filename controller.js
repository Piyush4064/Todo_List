import view from './view.js';
import taskList, { saveData } from './model.js';

const push = document.querySelector('#push');
const input = document.querySelector('#newtask input');
const dropDownSelection = document.querySelector('#taskType')

function addButton(type) {
    const button = document.createElement('button');
    button.innerHTML = type;
    return button;
}

function createObj(id, category, value) {
    this.id = id;
    this.category = category;
    this.value = value;
    this.isComplete = false;
}

function addItemAccordingToList(newEntry){
    const newItem = createItem(newEntry);
    view.appendItem(newItem, newEntry);
}

function eventListnerInput(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      push.click();
    }
}

function eventListnerAddButton(){
    if(input.value.trim().length == 0){
        alert("Please Enter a Task")
    }
    else{
        const value = input.value;
        let taskCategory = dropDownSelection.value;
        let id = 0;
        if(taskList.length==0) {
            id = 1;
        }
        else {
            let lastEntry = taskList[taskList.length-1];
            id = lastEntry.id + 1;
        }
        let newEntry = new createObj(id, taskCategory, value);
        taskList.push(newEntry);
        addItemAccordingToList(newEntry);
        input.value = "";
    }
}

input.addEventListener("keypress", eventListnerInput);
push.addEventListener("click", eventListnerAddButton);



function createItem(newEntry) {
    const div = document.createElement('div');
    let isPin = false;

    const inputCheckBox = document.createElement('input');
    inputCheckBox.setAttribute("type", "checkbox");
    inputCheckBox.classList.add("checkBox");

    const span = document.createElement('span');
    span.classList.add('inputSpan');
    span.innerText = newEntry.value;


    div.classList.add("task");

    const button = addButton('<i class="fa-solid fa-trash"></i>');
    button.classList.add("delete");

    const pinButton = addButton('<i class="fa-solid fa-thumbtack"></i>');
    pinButton.classList.add('pinStyle')

    span.addEventListener('click', function() {
        if(!div.classList.contains('completed')) {
            span.setAttribute('contenteditable', true);
        }
    });
    
    span.addEventListener('blur', function() {
        span.setAttribute('contenteditable', false);
    });
    span.addEventListener('keypress', function(event) {
        if(event.key === "Enter") {
            span.setAttribute('contenteditable', false);
        }
    });



    div.appendChild(inputCheckBox);
    div.appendChild(span);
    div.appendChild(button);
    div.appendChild(pinButton);

    input.value = "";

    button.onclick = function() {
        div.remove();
    }

    inputCheckBox.onclick = function() {
        if(!div.classList.contains('completed')) {
            div.classList.add('completed');
        } 
        else {
            div.classList.remove("completed"); 
        }
    }

    pinButton.onclick = function(){
        if(!this.isPin) {
            pinButton.style.backgroundColor = "#000";
            this.isPin = true;
            const tmpDiv = div;
            div.remove();
            view.prependItem(tmpDiv, newEntry);
        }
        else {
            pinButton.style.backgroundColor = "grey";
            this.isPin = false;
            const tmpDiv = div;
            div.remove();
            view.appendItem(tmpDiv, newEntry);
        }
    }
    return div;
}










// Jquery for select2

$(function(){
    $("#taskType").select2();
});

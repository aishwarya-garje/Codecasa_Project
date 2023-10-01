const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// Array to store tasks
let listArray = [];

// Function to update the tasks in the UI
function showTasks() {
    let newLiTag = "";
    listArray.forEach((task, index) => {
        newLiTag += `<li class="${task.completed ? 'completed' : ''}">
                        <input type="checkbox" class="taskCheckbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
                        ${task.text}
                        <span class="icon" onclick="deleteTask(${task.id})">
                            <i class="fas fa-trash"></i>
                        </span>
                    </li>`;
    });
    todoList.innerHTML = newLiTag;
    updatePendingTasksCount();

    // Adding event listener to checkboxes
    const checkboxes = document.querySelectorAll(".taskCheckbox");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            let index = this.getAttribute("data-index");
            listArray[index].completed = this.checked;
            updateLocalStorage();
            updatePendingTasksCount();


            // Toggle completed class based on checkbox state
            let listItem = this.parentNode;
            if (this.checked) {
                listItem.classList.add("completed");
            } else {
                listItem.classList.remove("completed");
            }
        });

        // Set initial state for checkboxes
        let listItem = checkbox.parentNode;
        if (checkbox.checked) {
            listItem.classList.add("completed");
        }
    });
};

//  input box to enable/disable add button
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value.trim();
    if (userEnteredValue !== "") {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
};

// add button to add new task
addBtn.onclick = () => {
    let userEnteredValue = inputBox.value.trim();
    if (userEnteredValue !== "") {
        let task = {
            id: Date.now(),
            text: userEnteredValue,
            completed: false
        };
        listArray.push(task);
        updateLocalStorage();
        showTasks();
        inputBox.value = "";
        addBtn.classList.remove("active");
    }
};

function deleteTask(id) {
    listArray = listArray.filter(task => task.id !== id);
    updateLocalStorage();
    showTasks();
}

deleteAllBtn.onclick = () => {
    listArray = [];
    updateLocalStorage(); 
    showTasks(); 
}

// Function to update tasks count in the UI
function updatePendingTasksCount() {
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.filter(task => !task.completed).length;
}

// Function to update tasks in local storage
function updateLocalStorage() {
    localStorage.setItem("New Todo", JSON.stringify(listArray));
}

const taskForm = document.querySelector(".input-area");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const searchInput = document.querySelector("#search-input");

let tasks = [];
let searchTerm = "";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
}
loadTasks();

function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(function (task) {
        return task.text.toLowerCase().includes(searchTerm);
    });
    if (filteredTasks.length === 0) {
        const noTaskMessage = document.createElement("li");
        noTaskMessage.textContent = "No tasks found";
        noTaskMessage.classList.add("no-tasks");
        taskList.appendChild(noTaskMessage);
        return;
    }

    filteredTasks.forEach(function (task) {
        const taskItem = document.createElement("li");

        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = task.text;
        if (task.completed)  {
            taskTextElement.classList.add("completed");
        }

        const editButton = document.createElement("button");
        editButton.textContent = "✏️";
        editButton.addEventListener("click", function () {
            const updateTask = prompt("Edit your task...", task.text);
        
        if (updateTask !== null && updateTask.trim() !== "") {
            task.text = updateTask.trim();

            saveTasks();
            renderTasks();
        }
    });

        const completeButton = document.createElement("button");
        completeButton.textContent = "✓";
        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;

            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑";
        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            renderTasks();
        });

        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(editButton);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
});

searchInput.addEventListener("input", function () {
    searchTerm = searchInput.value.trim().toLowerCase();

    renderTasks();
});

const emptyImage = document.querySelector(".empty-image");
const taskForm = document.querySelector(".input-area");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const searchInput = document.querySelector("#search-input");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];
let searchTerm = "";
let currentFilter = "all";

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
    emptyImage.style.display = "none";

    const filteredTasks = tasks.filter(function (task) {

        const matchesSearch = task.text.toLowerCase().includes(searchTerm);

        const matchesFilter = 
            currentFilter === "all" ||
            (currentFilter === "pending" && !task.completed) ||
            (currentFilter === "completed" && task.completed);
        
        return matchesSearch && matchesFilter;
    });
    if (filteredTasks.length === 0) {
        emptyImage.style.display = "block";
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
        editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        editButton.addEventListener("click", function () {
            const updateTask = prompt("Edit your task...", task.text);
        
        if (updateTask !== null && updateTask.trim() !== "") {
            task.text = updateTask.trim();

            saveTasks();
            renderTasks();
        }
    });

        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;

            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
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

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");

        renderTasks();
    });
    });

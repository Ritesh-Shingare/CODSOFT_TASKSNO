const totalCount = document.querySelector("#total-count");
const pendingCount = document.querySelector("#pending-count");
const completedCount = document.querySelector("#completed-count");
const emptyImage = document.querySelector(".empty-image");
const taskForm = document.querySelector(".input-area");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const searchInput = document.querySelector("#search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const taskCategory = document.querySelector("#task-category");

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

function updateTaskStats() {
  const total = tasks.length;

  const completed = tasks.filter(function (task) {
    return task.completed;
  }).length;

  const pending = tasks.filter(function (task) {
    return !task.completed;
  }).length;

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
}

function getCategoryLabel(category) {
    const categoryLabels = {
        study: "Study",
        work: "Work",
        personal: "Personal",
        other: "Other"
    };

    return categoryLabels[category] || "Other";
}
function renderTasks() {
  updateTaskStats();

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

    const categoryElement = document.createElement("small");
    categoryElement.textContent = getCategoryLabel(task.category);
    categoryElement.classList.add("task-category");

    if (task.completed) {
      taskTextElement.classList.add("completed");
    }

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';

    editButton.addEventListener("click", function () {
      const updateTask = prompt("Edit your task...", task.text);

      if (updateTask === null || updateTask.trim() === "") {
        return;
      }

      const updateCategory = prompt(
        "Enter category: study, work, personal, or other",
        task.category || "other",
      );

      task.text = updateTask.trim();

      if (updateCategory !== null && updateCategory.trim() !== "") {
        task.category = updateCategory.trim().toLowerCase();
      }

      saveTasks();
      renderTasks();
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
    taskItem.appendChild(categoryElement);
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
    completed: false,
    category: taskCategory.value,
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

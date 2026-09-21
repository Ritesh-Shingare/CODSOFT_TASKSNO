const taskForm = document.querySelector(".input-area");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    console.log(taskText);
    
    if (taskText === "") {
        return;
    }

    const taskItem = document.createElement("li");

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;

    const completeButton = document.createElement("button")
    completeButton.textContent = "✓";

    completeButton.addEventListener("click", function () {
        taskTextElement.classList.toggle("completed");
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑";

    deleteButton.addEventListener("click", function () {
        taskItem.remove();
    })

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    taskInput.value = "";
});
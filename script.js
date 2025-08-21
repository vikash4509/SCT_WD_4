let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text} <small>(${task.dateTime || "No Date"})</small></span>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
        <button class="edit-btn" onclick="editTask(${index})">✏</button>
        <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let dateTime = document.getElementById("taskDateTime");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    text: taskInput.value,
    dateTime: dateTime.value,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  dateTime.value = "";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  let newTask = prompt("Edit Task:", tasks[index].text);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index].text = newTask;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

renderTasks();

// Select elements
var taskInput = document.getElementById("taskInput");
var addTaskBtn = document.getElementById("addTaskBtn");
var taskList = document.getElementById("taskList");
// Add placeholder message for "no task yet"
var placeholder = document.createElement("li");
placeholder.textContent = "No task yet";
placeholder.style.textAlign = "center";
placeholder.style.color = "#8888";
placeholder.style.fontStyle = "italic";
placeholder.className = "no-task-placeholder";
taskList.appendChild(placeholder);
// Function to check and toggle placeholder
function togglePlaceholder() {
    if (taskList.children.length === 0) {
        taskList.appendChild(placeholder);
    }
    else if (taskList.contains(placeholder)) {
        taskList.removeChild(placeholder);
    }
}
// Add task function
function addTask() {
    if (!taskInput.value.trim())
        return; // Ignore empty input
    // Create task item
    var taskItem = document.createElement("li");
    taskItem.className = "task-item";
    // Add checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    // Add task text
    var taskText = document.createElement("span");
    taskText.textContent = taskInput.value;
    // Add delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    // Append children
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    // Clear input
    taskInput.value = "";
    // Add delete button functionality
    deleteBtn.addEventListener("click", function () {
        taskList.removeChild(taskItem);
        togglePlaceholder(); // Check placeholder visibility
    });
    // Toggle placeholder visibility
    togglePlaceholder();
}
// Event listeners
addTaskBtn.addEventListener("click", addTask);
// Swipe functionality
var startX = null;
var swipedItem = null;
// Start swipe
taskList.addEventListener("touchstart", function (e) {
    var target = e.target;
    if (target.closest(".task-item")) {
        startX = e.touches[0].clientX;
        swipedItem = target.closest(".task-item");
    }
});
// Detect swipe movement
taskList.addEventListener("touchmove", function (e) {
    if (!startX || !swipedItem)
        return;
    var diff = e.touches[0].clientX - startX;
    if (diff < -30) {
        // Swipe left
        swipedItem.classList.add("swiped");
    }
    else if (diff > 30) {
        // Swipe right
        swipedItem.classList.remove("swiped");
    }
});
// End swipe
taskList.addEventListener("touchend", function () {
    startX = null;
    swipedItem = null;
});

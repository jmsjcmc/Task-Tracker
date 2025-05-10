// Import built-in file system module to read/write JSON files
const fs = require("fs");
// Path to the JSON file that stores tasks
const path = "./tasks.json";

/**
 * Loads all tasks from JSON file
 * If file doesn't exist yet, create empty array and save it
 */
function loadTasks() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]");
  }
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

/**
 * Saves given tasks array into JSON file
 * @param {Array} tasks - Array of task objects to save
 */
function saveTasks(tasks) {
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}

/**
 * Add new task with description
 * Set default status to "todo", current time as createdAt
 * @param {string} description - Task description
 */
function addTask(description) {
  const tasks = loadTasks();
  const now = new Date().toISOString();
  const noData = "N/A";
  const newTask = {
    id: Date.now(), // Unique ID using current timestamp
    description,
    status: "todo",
    createdAt: now,
    updatedAt: noData,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log("Task added.");
}

/**
 * List tasks. Optionally filter by status: 'todo', 'in-progress', or 'done'
 * @param {string|null} filter - Optional status to filter task
 * @returns
 */
function listTasks(filter = null) {
  const tasks = loadTasks();
  const filtered = filter ? tasks.filter((t) => t.status === filter) : tasks;

  if (filtered.length === 0) return console.log("No task found.");

  filtered.forEach((task) => {
    console.log(`[${task.status}] (${task.id}) ${task.description}`);
  });
}

/**
 * Update description of task by ID
 * @param {number} id - Task ID to update
 * @param {string} newDesc - New Task description
 * @returns
 */
function updateTask(id, newDesc) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) return console.log("Task not found");

  task.description = newDesc;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log("Task updated");
}

/**
 * Change status of task by ID
 * Allowed status: 'todo', 'in-progress', 'done'
 * @param {number} id - Task ID to update
 * @param {string} status - New status
 * @returns
 */
function setStatus(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) return console.log("Task not found");
  if (!["todo", "in-progress", "done"].includes(status)) {
    return console.log("Invalid status.");
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Status set to ${status}`);
}

/**
 * Deletes task by id
 * @param {number} id - Id of task to delete
 * @returns
 */
function deleteTask(id) {
  let tasks = loadTasks();
  const task = tasks.filter((t) => t.id !== Number(id));
  if (task.length === tasks.length) {
    return console.log("Task not found.");
  }

  saveTasks(task);
  console.log("Task deleted.");
}

// Command line input parsing
const [, , command, ...args] = process.argv;

/**
 * Command line handler
 * Commands:
 *   add <description>          - Adds a new task
 *   list [status]              - Lists all tasks, or filtered by status
 *   update <id> <description>  - Updates the task description
 *   status <id> <status>       - Updates the task status
 *   delete <id>                - Deletes a task
 */
switch (command) {
  case "add":
    addTask(args.join(" "));
    break;
  case "list":
    listTasks(args[0]);
    break;
  case "update":
    updateTask(args[0], args.slice(1).join(" "));
    break;
  case "status":
    setStatus(args[0], args[1]);
    break;
  case "delete":
    deleteTask(args[0]);
    break;
  default:
    console.log(`Commands:
            add <description>
            list [status]
            update <id> <new description>
            status <id> <status>
            delete <id>`);
    return;
}

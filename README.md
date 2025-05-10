# 📝 Task Manager CLI

  

A lightweight Node.js-based command-line application to manage tasks locally using a JSON file. Supports adding, listing, updating, setting status, and deleting tasks.

  

---

  

## 📦 Requirements

  

- [Node.js](https://nodejs.org/) v12 or later

  

---

  

## 🚀 Setup

  

1. **Clone the repository** or download the files.

2. Make sure `tasks.json` is in the root directory (it will be created automatically on first run).

3. Run commands using:

```bash

node index.js <command> <arguments>

```

  

---

## 🛠️ Available Commands

➕ Add a Task

```bash

node index.js add "Your task description"

```

Adds a task with status `todo` and stores the creation time.

  

---

  

## 📋 List Tasks

```bash

node index.js list

node index.js list done

```

Lists all tasks. Optionally filter by status: `todo`,  `in-progress`, or `done`.

  

---

  

## ✏️ Update Task Description

```bash

node index.js update <task_id> "New description"

```

Updates the description of the task with the given `id`.

  

---

  

## 🔄 Set Task Status

```bash

node index.js status <task_id> <status>

```
Updates the status of the task. Valid statuses:

 - `todo`
 - `in-progress`
 - `done`
 
Example:
```bash
node index.js status 1683456172634 done
```

---

## ❌ Delete a Task
```bash
node index.js delete <task_id>
```
Removes the task with the specified `id`.

---

## 🗃️ Data Storage

All tasks are stored in a local JSON file: `tasks.json`. Each task has the following structure:
```json
{
  "id": 1683456172634,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": "2025-05-10T12:00:00.000Z",
  "updatedAt": "N/A"
}
```
---
## ℹ️ How It Works

 - **File System Module (`fs`):**
	The app uses Node.js's built-in `fs` module to read from and write to a local JSON file (`task.json`). This allows it to persist tasks between sessions without a database.
	
 - `process.argv`
 Node.js exposes command-line arguments via the `process.argv` array. The CLI reads the command (`add`, `list`, etc.) and arguments (e.g. task description or ID) from this array to determine what action to perform.

---

## 🧠 Notes

 - Tasks are identified by their unique `id` (generated using `Date.now()`).
 - Timestamps use ISO string format.
 - `updatedAt` is `"N/A"` until the task is updated or its status is changed.

---
## 📁 Project URL
https://roadmap.sh/projects/task-tracker

// DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const stickyContainer = document.getElementById("sticky-container");
const clock = document.getElementById("clock");
const greeting = document.getElementById("greeting");
const toggleThemeBtn = document.getElementById("toggleTheme");
const iconSun = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");

// Data storage
let todos = [
  { id: 1, text: "Ăn cơm tối", completed: true },
  { id: 2, text: "Code bài homework", completed: false },
  { id: 3, text: "Đi ngủ", completed: false },
];

let notes = [
  { id: 1, text: "Làm bài tập homework mai nộp" },
  { id: 2, text: "Đi học vào lúc 8h" },
];

let currentFilter = "all";

// Utility functions
function saveState() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
}

function loadState() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  const storedTheme = localStorage.getItem("theme");
  if (storedTodos) todos = storedTodos;
  if (storedNotes) notes = storedNotes;
  if (storedTheme === "dark") {
    document.documentElement.classList.add("dark");
    iconSun.classList.remove("hidden");
    iconMoon.classList.add("hidden");
  }
}

// Update Clock and Greeting
function updateClockAndGreeting() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  clock.textContent = timeString;

  const hour = now.getHours();
  if (hour < 12) {
    greeting.textContent = "Good morning";
  } else if (hour < 18) {
    greeting.textContent = "Good afternoon";
  } else {
    greeting.textContent = "Good evening";
  }
}
setInterval(updateClockAndGreeting, 1000);
updateClockAndGreeting();

// Theme toggle
toggleThemeBtn.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  if (isDark) {
    iconSun.classList.remove("hidden");
    iconMoon.classList.add("hidden");
  } else {
    iconSun.classList.add("hidden");
    iconMoon.classList.remove("hidden");
  }
  saveState();
});

// Render To-Do items based on filter
function renderTodos() {
  todoList.innerHTML = "";
  let filteredTodos = [];
  if (currentFilter === "all") filteredTodos = todos;
  else if (currentFilter === "completed")
    filteredTodos = todos.filter((todo) => todo.completed);
  else if (currentFilter === "incomplete")
    filteredTodos = todos.filter((todo) => !todo.completed);

  if (filteredTodos.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent = "No tasks found.";
    emptyMsg.className = "text-slate-500 italic px-3 py-2";
    todoList.appendChild(emptyMsg);
    return;
  }

  filteredTodos.forEach(({ id, text, completed }) => {
    const li = document.createElement("li");
    li.className = `
          flex justify-between items-center rounded-md px-4 py-2 transition-colors duration-300 
          ${
            completed
              ? "bg-emerald-200 line-through text-slate-600"
              : "bg-slate-100 text-slate-800"
          }
          hover:shadow-md
        `;
    li.setAttribute("data-id", id);

    const label = document.createElement("label");
    label.className =
      "flex items-center gap-3 cursor-pointer flex-grow select-text";
    label.setAttribute("for", "chk-" + id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.id = "chk-" + id;
    checkbox.className = "w-5 h-5";

    checkbox.addEventListener("change", () => {
      todos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: checkbox.checked } : todo
      );
      saveState();
      renderTodos();
    });

    const span = document.createElement("span");
    span.textContent = text;

    label.appendChild(checkbox);
    label.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "ml-3 px-3 py-1 bg-white border border-slate-400 rounded-md text-sm font-medium text-slate-700 shadow hover:bg-emerald-50 transition";
    deleteBtn.setAttribute("aria-label", "Delete task " + text);
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((todo) => todo.id !== id);
      saveState();
      renderTodos();
    });

    li.appendChild(label);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

// Render Sticky Notes
function renderNotes() {
  stickyContainer.innerHTML = "";
  if (notes.length === 0) {
    const noNotes = document.createElement("p");
    noNotes.className = "text-slate-500 italic";
    noNotes.textContent = "No sticky notes yet.";
    stickyContainer.appendChild(noNotes);
    return;
  }

  notes.forEach(({ id, text }) => {
    const note = document.createElement("div");
    note.className = `
          relative bg-emerald-200 text-slate-800 rounded-md p-4 w-40 min-h-[100px] shadow-lg
          flex items-start justify-between break-words overflow-wrap-anywhere
          animate-fadeInSlideDown
        `;
    note.setAttribute("data-id", id);

    const noteText = document.createElement("p");
    noteText.textContent = text;
    noteText.className = "whitespace-pre-line text-sm leading-relaxed pr-6";
    note.appendChild(noteText);

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&#x2715;";
    removeBtn.setAttribute("aria-label", "Delete note");
    removeBtn.className = `
          absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center 
          font-bold text-xl shadow-md hover:bg-red-700 transition duration-150
        `;
    removeBtn.addEventListener("click", () => {
      notes = notes.filter((note) => note.id !== id);
      saveState();
      renderNotes();
    });

    note.appendChild(removeBtn);
    stickyContainer.appendChild(note);
  });
}

// Add new To-Do task handler
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text === "") return;
  todos.push({ id: Date.now(), text, completed: false });
  todoInput.value = "";
  saveState();
  renderTodos();
});

// Filters functionality
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) =>
      b.classList.remove(
        "bg-emerald-200",
        "border-emerald-500",
        "text-emerald-700"
      )
    );
    btn.classList.add(
      "bg-emerald-200",
      "border-emerald-500",
      "text-emerald-700"
    );
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});
// Set default active filter to `All`
filterButtons[0].classList.add(
  "bg-emerald-200",
  "border-emerald-500",
  "text-emerald-700"
);

// Add new sticky note handler
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  if (text === "") return;
  notes.push({ id: Date.now(), text });
  noteInput.value = "";
  saveState();
  renderNotes();
});

// Initialize app
function init() {
  loadState();
  renderTodos();
  renderNotes();
}

init();

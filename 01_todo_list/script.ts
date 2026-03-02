import { TodoManager } from "./managers/TodoManager";

const manager = new TodoManager();
const input = document.querySelector(".todo-input") as HTMLInputElement;
const todosContainer = document.querySelector(".todos") as HTMLDivElement;

input.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    manager.addTodo(input.value.trim());
    input.value = "";
    renderTodos();
  }
});

function renderTodos(): void {
  todosContainer.innerHTML = "";
  const todos = manager.getAllTodos();

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.className = "todo-item";

    const title = document.createElement("span");
    title.className = "todo-title";
    title.innerText = todo.title;

    if (todo.isCompleted) {
      title.classList.add("completed");
    }

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "Mark Done";
    completeBtn.onclick = () => {
      manager.toggleTodo(todo.id);
      renderTodos();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Close";
    deleteBtn.onclick = () => {
      manager.deleteTodo(todo.id);
      renderTodos();
    };

    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);

    div.appendChild(title);
    div.appendChild(buttonContainer);

    todosContainer.appendChild(div);
  });
}

renderTodos();

export class TodoManager {
    constructor() {
        this.todos = [];
    }
    addTodo(title) {
        const newTodo = {
            id: Date.now(),
            title,
            isCompleted: false,
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    }
    getAllTodos() {
        return this.todos;
    }
}
//# sourceMappingURL=TodoManager.js.map
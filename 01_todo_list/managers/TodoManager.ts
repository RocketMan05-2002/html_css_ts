import {Todo} from "../models/Todo"

export class TodoManager {
    private todos:Todo[] = [];

    addTodo(title:string):Todo{
        
        const newTodo:Todo = {
            id: Date.now(),
            title,
            isCompleted: false,
        };

        this.todos.push(newTodo);
        return newTodo;
    }

    deleteTodo(id:number):void{
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    toggleTodo(id:number):void{
        const todo = this.todos.find(todo=>todo.id === id);
        if(todo){
            todo.isCompleted = !todo.isCompleted;
        }
    }

    getAllTodos():Todo[]{
        return this.todos;
    }
}
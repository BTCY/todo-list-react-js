// interface ITodo {
//     id: number,
//     content: string,
//     done: boolean,
// } 

export const createTodoStore = () => {
    return {
        todoList: JSON.parse(localStorage.getItem("todoList")) || [],
        addTodo(text) {
            const todo = {
                id: this.todoList.length + 1,
                content: text,
                done: false,
                date: +new Date()
            }
            this.todoList.push(todo)
        },
        complete(el) {
            this.todoList = this.todoList.map(e => e.id === el.id ? { ...e, done: e.done = true } : e)
        },
        incomplete(el) {
            this.todoList = this.todoList.map(e => e.id === el.id ? { ...e, done: e.done = false } : e)
        },
        delete(el) {
            this.todoList = this.todoList.filter(e => e.id !== el.id)
        },
        edit(el) {
            const index = this.todoList.findIndex(e => e.id === el.id);
            this.todoList[index] = el;
        }
    }
}

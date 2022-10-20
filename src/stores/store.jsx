// interface ITodo {
//     id: number,
//     content: string,
//     done: boolean,
// }

export const createTodoStore = () => {
    return {
        todoList: [],
        addTodo(text) {
            const todo = {
                id: this.todoList.length + 1,
                content: text,
                done: false
            }
            this.todoList.push(todo)
        },
        complete(el) {
            this.todoList = this.todoList.filter(e => {
                if (e.id === el.id) {
                    e.done = true
                    return e
                }
                else {
                    return e
                }
            })
        },
        incomplete(el) {
            this.todoList = this.todoList.filter(e => {
                if (e.id === el.id) {
                    e.done = false
                    return e
                }
                else {
                    return e
                }
            })
        },

    }
}
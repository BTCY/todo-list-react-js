/*
*  Store with TODO list data
*/

export interface ITodoStore {
    todoList: ITodoItem[],
    addTodo: (text: string) => void,
    complete: (item: ITodoItem) => void,
    incomplete: (item: ITodoItem) => void,
    delete: (item: ITodoItem) => void,
    edit: (item: ITodoItem) => void,
    updateTodoList: (newTodoList: ITodoItem[]) => void,
}

export interface ITodoItem {
    id: number,
    content: string,
    done: boolean,
    date: number,
}


export const KEY_TODO_LIST_IN_LOCALSTORAGE = "com_github_btcy_todoList";


export const createTodoStore = (): ITodoStore => {
    const todoListInLocalStorage: string | null = localStorage.getItem(KEY_TODO_LIST_IN_LOCALSTORAGE);
    return {
        todoList: !!todoListInLocalStorage ? JSON.parse(todoListInLocalStorage) : [],
        addTodo(text: string) {
            const todo: ITodoItem = {
                id: Date.now(),
                content: text,
                done: false,
                date: Date.now()
            }
            this.todoList.push(todo)
        },
        complete(item: ITodoItem) {
            this.todoList = this.todoList.map(it => it.id === item.id ? { ...it, done: it.done = true } : it)
        },
        incomplete(item: ITodoItem) {
            this.todoList = this.todoList.map(it => it.id === item.id ? { ...it, done: it.done = false } : it)
        },
        delete(item: ITodoItem) {
            this.todoList = this.todoList.filter(it => it.id !== item.id)
        },
        edit(item: ITodoItem) {
            const index = this.todoList.findIndex(it => it.id === item.id);
            this.todoList[index] = item;
        },
        updateTodoList(newTodoList: ITodoItem[]) {
            this.todoList = newTodoList;
        }
    }
}

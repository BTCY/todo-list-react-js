import React, { createContext, useContext, useEffect } from 'react';
import { createTodoStore, ITodoStore } from "../stores/store";
import { useLocalObservable } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { reaction, toJS } from 'mobx';

/*
*   Todo list provider
*/

interface ITodoProvider {
    children?: React.ReactNode;
}

const stub = (): never => {
    throw new Error('You forgot to wrap your component in <TodoProvider>.');
};

const initialContext: ITodoStore = {
    todoList: [],
    addTodo: stub,
    complete: stub,
    incomplete: stub,
    delete: stub,
    edit: stub,
};


const TodoContext = createContext<ITodoStore>(initialContext);


export const TodoProvider = observer(({ children }: ITodoProvider) => {
    const todoStore = useLocalObservable(createTodoStore);


    useEffect(() => {
        reaction(
            () => toJS(todoStore.todoList),
            (res) => {
                localStorage.setItem("todoList", JSON.stringify(res));
            }
        );
    }, [todoStore.todoList]);


    return (
        <TodoContext.Provider
            value={todoStore}
        >
            {children}
        </TodoContext.Provider>
    )
});

export const useTodoStore = () => useContext(TodoContext)
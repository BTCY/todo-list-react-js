import React, { createContext, useContext, useEffect } from "react";
import { createTodoStore, ITodoStore, KEY_TODO_LIST_IN_LOCALSTORAGE } from "../stores/store";
import { useLocalObservable } from "mobx-react";
import { observer } from "mobx-react-lite";
import { reaction, toJS } from "mobx";

/*
*   Todo list provider
*/

interface ITodoProvider {
    children?: React.ReactNode;
}

const stub = (): never => {
    throw new Error("You forgot to wrap your component in <TodoProvider>.");
};

const initialContext: ITodoStore = {
    todoList: [],
    addTodo: stub,
    complete: stub,
    incomplete: stub,
    delete: stub,
    edit: stub,
    updateTodoList: stub,
};


const TodoContext = createContext<ITodoStore>(initialContext);


export const TodoProvider = observer(({ children }: ITodoProvider) => {
    const todoStore = useLocalObservable(createTodoStore);


    useEffect(() => { 

        return () => {
            reaction(
                () => toJS(todoStore.todoList),
                (res) => {
                    localStorage.setItem(KEY_TODO_LIST_IN_LOCALSTORAGE, JSON.stringify(res));
                }
            );
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <TodoContext.Provider
            value={todoStore}
        >
            {children}
        </TodoContext.Provider>
    )
});

export const useTodoStore = () => useContext(TodoContext)
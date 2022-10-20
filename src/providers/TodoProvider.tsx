import React, { createContext, useContext } from 'react';
import { createTodoStore } from "../stores/store";
import { useLocalObservable } from 'mobx-react';


const TodoContext = createContext<any>(null)


export const TodoProvider = ({ children }: any) => {
    const todoStore = useLocalObservable(createTodoStore)

    return (
        <TodoContext.Provider
            value={todoStore}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodoStore = () => useContext(TodoContext)
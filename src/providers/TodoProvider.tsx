import React, { createContext, useContext, useEffect } from 'react';
import { createTodoStore } from "../stores/store";
import { useLocalObservable } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { reaction, toJS } from 'mobx';


const TodoContext = createContext<any>(null)


export const TodoProvider = observer(({ children }: any) => {
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
import React, { useEffect, useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ITodoItem } from "../../stores/store";
import List from "./List";
import AddTodoItem from "../add-todo-item/AddTodoItem";

/*
*   Root component for list of tasks
*/

const TodoList = observer(() => {
    const todoStore = useTodoStore();
    const [todoList, setTodoList] = useState<ITodoItem[]>([]);
    const [value, setValue] = useState<string>("");


    useEffect(() => {
        if (value !== "") {
            setTodoList(todoStore?.todoList?.filter(
                (item: ITodoItem) => item?.content?.startsWith(value)
            ));
        }
        else {
            setTodoList(todoStore?.todoList);
        }
    }, [todoStore.todoList, value])


    const handleSearchItemInputOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(e.target.value.trim());
    };


    return (
        <>
            {/* Add task */}
            <AddTodoItem />

            {/* Search task */}
            <TextField
                value={value}
                id="search-item-input"
                variant="outlined"
                size="small"
                onChange={handleSearchItemInputOnChange}
            />

            {/* List of tasks */}
            <List todoList={todoList} setTodoList={setTodoList} />
        </>
    );

});

export default TodoList;
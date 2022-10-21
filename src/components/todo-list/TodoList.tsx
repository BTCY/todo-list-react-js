import React, { useEffect, useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import List from "./List";


const TodoList = observer(() => {
    const todoStore = useTodoStore();
    const [todoList, setTodoList] = useState<any>();
    const [value, setValue] = useState<any>("");

    useEffect(() => {

        if (value !== "") {
            setTodoList(todoStore?.todoList?.filter((item: any) => item?.content?.startsWith(value)));
        }
        else {
            setTodoList(todoStore?.todoList);
        }

    }, [todoStore.todoList, value])

    return (
        <>
            <TextField
                value={value}
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={{ background: "#ffffff" }}
                onChange={(e) => setValue(e.target.value.trim())}
            />
            <List todoList={todoList} setTodoList={setTodoList} />
        </>
    )
});

export default TodoList;
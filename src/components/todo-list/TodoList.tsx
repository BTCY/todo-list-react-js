import React, { useEffect, useState } from "react";
import { useTodoStore } from "../../providers/TodoProvider";
import { Chip, Grid, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ITodoItem } from "../../stores/store";
import List from "./List";
import AddTodoItem from "../add-todo-item/AddTodoItem";
import theme from "../../theme/MainTheme";

/*
*   Root component for list of items
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
            {/* Add item */}
            <AddTodoItem />

            {/* Search item */}
            <Grid
                container
                justifyContent="space-between"
                alignItems="flex-end"
                sx={{
                    borderBottom: `1px solid ${theme.palette.grey[300]}`
                }}
            >
                <Grid item sx={{ mb: 1.8 }}>
                    <Chip label={`All: ${todoList?.length || 0}`} sx={{ mr: 1 }} />
                    <Chip label={`Done: ${todoList?.filter(i => i.done)?.length || 0}`} sx={{ mr: 1 }} />
                </Grid>
                <Grid item sx={{ mb: .8}}>
                    <TextField
                        value={value}
                        margin="normal"
                        label="Search..."
                        id="search-item-input"
                        variant="standard"
                        onChange={handleSearchItemInputOnChange}
                    />
                </Grid>
            </Grid>

            {/* List of items */}
            <List todoList={todoList} setTodoList={setTodoList} />
        </>
    );

});

export default TodoList;